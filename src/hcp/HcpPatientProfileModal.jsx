import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../components/Modal/Modal';
import useApi from '../hooks/useApi';
import {
	isHcpPatientProfileDetailsModalOpen,
	selectHcpPatientProfileData,
	selectIsHcpPatientProfileDetailsModalOpen,
} from '../pages/slice';
import HcpPatientProfileDetails from './HcpPatientProfileDetails';

function HcpProfile({ name }) {
	return (
		<div className="flex flex-row items-center justify-between">
			<div>
				<h1 className="pb-1 font-inter text-lg font-semibold text-black">
					{name}'s Profile
				</h1>
				<div className="h-1 w-11 rounded-full bg-primary"></div>
			</div>
		</div>
	);
}
function HcpPatientProfileModal() {
	const [patientProfile, setpatientProfile] = useState();

	const IsHcpPatientProfileOpen = useSelector(
		selectIsHcpPatientProfileDetailsModalOpen
	);
	const hcpPatientProfileData = useSelector(selectHcpPatientProfileData);

	const dispatch = useDispatch();
	const triggerApi = useApi();

	function closeModal() {
		dispatch(isHcpPatientProfileDetailsModalOpen(false));
	}

	const getPatientDetails = async (patient_id) => {
		try {
			const { response, success } = await triggerApi({
				url: `/doctor/patients/${patient_id}/`,
				type: 'GET',
				loader: true,
			});

			if (success && response) {
				setpatientProfile(response.data);
			}
		} catch (error) {
			console.error('Error during API call:', error);
		}
	};

	useEffect(() => {
		hcpPatientProfileData.patient_id &&
			getPatientDetails(hcpPatientProfileData.patient_id);
	}, [hcpPatientProfileData]);

	return (
		<Modal
			backBtnLabel={<HcpProfile name={hcpPatientProfileData.name} />}
			labelType="center"
			show={IsHcpPatientProfileOpen}
			closeModal={closeModal}
			ModalBody={<HcpPatientProfileDetails patientProfile={patientProfile} />}
			type="center"
			isCloseVisible={false}
			isBackVisible={true}
		/>
	);
}

export default HcpPatientProfileModal;
