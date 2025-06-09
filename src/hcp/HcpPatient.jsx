import React, { useEffect, useState } from 'react';
import HcpViewPatientProfileModal from './HcpViewPatientProfileModal';
import { ReactComponent as NoPatient } from '../assets/images/svg/menu/np_patient.svg';
import useApi from '../hooks/useApi';
import debounce from 'just-debounce-it';
import { getBirthYearFromAge } from '../utils/formats';
import { TOAST_ERROR_CONFIG, TOAST_SUCCESS_CONFIG } from '../utils/constants';
import toast from 'react-hot-toast';
import { transformToPatientEnrollmentDetailsFormData } from '../utils/forms';


const HcpPatient = () => {
	const [filter, setFilter] = useState('Pending');
	const [searchQuery, setSearchQuery] = useState('');
	const [patients, setPatients] = useState();
	const triggerApi = useApi();

	// Filter patients based on status and search query
	const filteredPatients = patients?.filter((patient) => {
		const matchesFilter = filter === 'All' || patient.status === filter;
		const matchesSearch =
			patient.patient_id.toString().includes(searchQuery) ||
			patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			(patient.mobile && patient.mobile.includes(searchQuery));
		return matchesFilter && matchesSearch;
	});

	const getFilteredPatients = async (searchTerm) => {
		try {
			const { response, success } = await triggerApi({
				url: `/doctor/patients/?search_term=${searchTerm}`,
				type: 'GET',
				loader: true,
			});

			if (success && response) {
				setPatients(response.data);
			}
		} catch (error) {
			toast(error.message, TOAST_ERROR_CONFIG);
			console.error('Error during API call:', error);
		}
	};

	const handleSearch = (searchTerm) => {
		setSearchQuery(searchTerm);
		debounce(getFilteredPatients(searchTerm), 500);	
	};

	const handleApprovePatient = async (patientId) => {
		try {

			let dynamicFormData = transformToPatientEnrollmentDetailsFormData({
				patient_id: patientId,
				action: 'approve_patient',
			});

			const { response, success } = await triggerApi({
				url: `/doctor/patient-workflow/`,
				type: 'POST',
				loader: true,
				payload: dynamicFormData,
			});

			if (success && response) {
				toast('Patient approved successfully', TOAST_SUCCESS_CONFIG);
				getPatients();
			}
		} catch (error) {
			toast(error.message, TOAST_ERROR_CONFIG);
			console.error('Error during API call:', error);
		}
	};

	const handleViewPrescription = async (url) => {
		let message = {
			label: 'hcp-prescription',
			data: {
				url: url,
			},
		};

		let stringifiedMessage = JSON.stringify(message);

		// Comment it in desktop !!!!
		if (window.ReactNativeWebView) {
			window.ReactNativeWebView.postMessage(stringifiedMessage);
		} else {
			console.log('error');
		}
	};

	const getPatients = async () => {
		try {
			const { response, success } = await triggerApi({
				url: `/doctor/patients/`,
				type: 'GET',
				loader: true,
			});

			if (success && response) {
				setPatients(response.data);
			}
		} catch (error) {
			toast(error.message, TOAST_ERROR_CONFIG);
			console.error('Error during API call:', error);
		}
	};

	useEffect(() => {
		getPatients();
	}, []);
	

	return (
		<div className="p-4 w-full">
			{/* Header */}
			<header className="mb-6 text-center">
				<div className="flex flex-row items-center justify-between">
					<div>
						<h1 className="pb-2 font-inter text-lg font-bold text-[#403939]">
							Patients
						</h1>
						<div className="h-[5px] w-[35px] rounded-full bg-primary"></div>
					</div>
				</div>
			</header>

			{/* Search Bar */}
			<div className="mb-6">
				<input
					type="text"
					placeholder="Search by patient ID/name/mobile number"
					value={searchQuery}
					onChange={(e) => handleSearch(e.target.value)}
					className="placeholder-italic w-full border border-[#D4D4D4] px-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#BE2BBB]"
				/>
			</div>

			{patients?.length > 0 ? (
				<>
					{/* Filters */}
					<div className="mb-6 flex justify-start space-x-2 overflow-auto">
						{['All', 'Active', 'Discontinued', 'Pending'].map((status) => (
							<button
								key={status}
								onClick={() => setFilter(status)}
								className={`rounded-full border px-4 py-2 ${
									filter === status
										? 'bg-[#BE2BBB] text-white'
										: 'border-gray-300 text-gray-600'
								}`}
							>
								{status}
							</button>
						))}
					</div>

					{/* Patient Cards */}
					<div className="mb-20 space-y-4">
						{filteredPatients.length > 0 ? (
							filteredPatients.map((patient) => (
								<div
									key={patient.id}
									className="space-y-2 bg-[#F7F7F7] p-4 py-8"
								>
									<div className="mb-4 flex items-start justify-between">
										<div>
											<p className="font-inter text-[16px] text-black">
												Patient ID: {patient.patient_id}
											</p>
											<div className="flex flex-row items-center gap-6">
												<h2 className="font-inter text-lg font-bold">
													{patient.name}
												</h2>
												{patient.status === 'Active' && (
													<p className="rounded-full bg-[#BE2BBB] px-2 font-inter text-[14px] text-[#FFFFFF]">
														Active
													</p>
												)}
											</div>
											{patient.mobile && <p>{patient.mobile}</p>}
											<p className="font-inter text-[16px] text-black">
												{patient.gender} | {getBirthYearFromAge(patient.age)}
											</p>
										</div>
										{patient.status === 'Pending' && (
											<button onClick={() => handleViewPrescription(patient.prescription)} className="font-inter text-[12px] text-sm font-semibold text-[#BE2BBB]">
												VIEW PRESCRIPTION
											</button>
										)}
										{patient.status === 'Active' && (
											<button className="font-inter text-[12px] text-sm font-semibold text-[#BE2BBB]">
												<HcpViewPatientProfileModal data={patient} />
											</button>
										)}
									</div>

									{patient.can_approve ? (
										<button
											onClick={() => handleApprovePatient(patient.patient_id)}
											className="w-full bg-[#BE2BBB] py-3 font-inter text-white"
										>
											Approve Patient
										</button>
									) : (
										<div className="font-inter text-[16px] text-gray-700">
											<div className="mt-2 flex flex-row justify-between">
												{patient.indication && (
													<div className="flex flex-col">
														<p className="font-inter font-semibold text-black">
															Indication:
														</p>
														<p className="text-black">{patient.indication}</p>
													</div>
												)}

												{patient.dosage && (
													<div className="flex flex-col">
														<p className="font-inter font-semibold text-black">
															Dosing:
														</p>
														<p className="text-black">{patient.dosage}</p>
													</div>
												)}
											</div>
										</div>
									)}
								</div>
							))
						) : (
							<p className="text-center text-gray-500">
								No patients found matching your search.
							</p>
						)}
					</div>
				</>
			) : (
				<div className="flex min-h-[60vh] w-full flex-col  items-center justify-center gap-4 font-inter text-[16px]  text-gray-700">
					<NoPatient />
					<p className="font-inter font-light text-[#696969]">
						No Patients Found
					</p>
				</div>
			)}
		</div>
	);
};

export default HcpPatient;
