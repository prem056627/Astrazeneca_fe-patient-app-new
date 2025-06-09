import { ReactComponent as BrandIcon } from '../../../../assets/images/svg/brand-logo.svg';
import { ReactComponent as DropDownIcon } from '../../../../assets/images/svg/Form-dropDown-icon.svg';
import { ReactComponent as DropDownTickIcon } from '../../../../assets/images/svg/Form-dropDownTick-icon.svg';
import { Disclosure } from '@headlessui/react';
import React, { useEffect, useState } from 'react';
import PersonlDetailsForm from './PersonlDetailsForm';
import AddressProofForm from './AddressProofForm';
import CurrentResidentialAddressForm from './CurrentResidentialAddressForm';
import ReimbursementInformationForm from './ReimbursementInformationForm';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectInitializeData,
	selectIsAddressproofsubmited,
	selectIsCurrentResidentialAddressSubmited,
	selectIsPersonalDetailsSubmited,
	selectIsReimbursementFormSubmited,
	selectIsOccupationFormSubmited,
	selectPatientDetails,
	selectProgramEnrollmentData,
	setInitializeData
} from '../../../slice';
import FormSubmitFooter from './FormSubmitFooter';
import OccupationDetailsForm from './OccupationDetailsForm';
import useApi from '../../../../hooks/useApi';
// import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ProfileDetails = () => {
	const { t, i18n } = useTranslation();
	const PersonalDetailsSubmited = useSelector(selectIsPersonalDetailsSubmited);
	const addressproofsubmited = useSelector(selectIsAddressproofsubmited);
	const currentResidentialAddressSubmited = useSelector(selectIsCurrentResidentialAddressSubmited);
	const reimbursementFormSubmited = useSelector(selectIsReimbursementFormSubmited);
	const occupationFormSubmited = useSelector(selectIsOccupationFormSubmited);
	const initialData = useSelector(selectInitializeData);
	// const [initData,setInitData] = useState(initialData)
	const patient_details = useSelector(selectPatientDetails);
	const PersonalDetailsData = useSelector(selectProgramEnrollmentData);
	const [alldataFilled,setAlldataFilled] = useState(false)
	const dispatch = useDispatch()

	const toggleLanguage = () => {
		const newLang = i18n.language === 'en' ? 'hi' : 'en';
		i18n.changeLanguage(newLang);
	};

	// const navigate = useNavigate();
	const triggerApi = useApi()
	const [step, setStep] = useState(1);
	const makeApiCall = async (step) => {
		console.log('test 123')
		try {
			const { response, success } = await triggerApi({
				url: `/patient-initialize/`,
				type: 'GET',
				loader: true,
			});

			if (success && response) {
				
				dispatch(
					setInitializeData({
						...response,
						data: {
							...response.data,
							enrollment_details: {
								...response.data.enrollment_details,
								current_step: step,
							},
						},
					})
				);
				return step;
			}
		} catch (error) {
			console.error('Error during API call:', error);
		}
	};
	useEffect(()=>{
		makeApiCall();
	},[])
	useEffect(() => {
		if (initialData?.data?.enrollment_details?.current_step) {
			console.log('step',initialData?.data?.current_state)
			switch (initialData?.data.enrollment_details.current_step) {
				case 'patient_details':
					setStep(1);
					break;
				case 'address_proof':
					setStep(2);
					break;
				case 'current_residential_address':
					setStep(3);
					break;
				case 'reimbursement_information':
					setStep(4);
					break;
				case 'occupational_info':
					setStep(5);
					break;
				default:
					setStep(1);
					break;
			}
		}
		if(initialData?.data?.current_state=='enrollment_pending'){
			setAlldataFilled(true)
		}
		console.log("initialData",initialData);

		
		// if (
		// 	initialData?.data?.enrollment_details.steps?.length ===
		// 	initialData?.data?.enrollment_details.steps?.completed_steps
		// ) {
		// 	navigate('/Dashboard/Home');
		// }
	}, [initialData]);

	

	return (
		<>
			<div className="w-full">
			{/* <button onClick={toggleLanguage}>
  {i18n.language === 'en' ? 'हिंदी' : 'English'}
</button> */}
				<div className="mx-auto w-full max-w-md rounded-2xl bg-white">
					<Disclosure
						as="div"
						defaultOpen={
							initialData?.data?.enrollment_details?.current_step ===
							'patient_details'
						}
						// open={step === 1}
						className={`${
							 'opacity-100'
						} mt-2 pt-10`}
					>
						{({ open, close }) => (
							<>
								<Disclosure.Button className="flex w-full items-center justify-between bg-white px-6 py-6 text-left text-sm font-medium text-black shadow-md hover:bg-white focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
									<div className="flex items-center justify-center gap-4">
										<span className="text-base font-bold text-[#283A46]">
											{t('personal_details_accordion_title')}
										</span>
										<DropDownTickIcon
											className={`${
												(PersonalDetailsSubmited )? 'block' : 'hidden'
											} h-6 w-6`}
										/>
									</div>
									<DropDownIcon
										className={`${open ? 'rotate-180 transform' : ''} h-8 w-8`}
									/>
								</Disclosure.Button>
								<Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
									<PersonlDetailsForm
										setStep={setStep}
										closeAccordion={close}
									/>
								</Disclosure.Panel>
							</>
						)}
					</Disclosure>

					<Disclosure
						as="div"
						defaultOpen={
							initialData?.data?.enrollment_details?.current_step ===
							'address_details'
						}
						// open={step === 2}
						className={`${
							 'opacity-100'
						} mt-2`}
					>
						{({ open, close }) => (
							<>
								<Disclosure.Button className="flex w-full justify-between bg-white px-6 py-6 text-left text-sm font-medium text-black shadow-md hover:bg-white focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
									<div className="flex items-center justify-center gap-4">
										<span className="text-base font-bold text-[#283A46]">
										{t('address_proof_accordion_title')}
										</span>
										<DropDownTickIcon
											className={`${
												(addressproofsubmited) ? 'block' : 'hidden'
											} h-6 w-6`}
										/>
									</div>
									<DropDownIcon
										className={`${open ? 'rotate-180 transform' : ''} h-8 w-8`}
									/>
								</Disclosure.Button>
								<Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
									<AddressProofForm setStep={setStep} closeAccordion={close} />
								</Disclosure.Panel>
							</>
						)}
					</Disclosure>

					<Disclosure
						as="div"
						defaultOpen={
							initialData?.data?.enrollment_details?.current_step ===
							'current_residence'
						}
						// open={step === 3}
						className={`${
							 'opacity-100'
						} mt-2`}
					>
						{({ open, close }) => (
							<>
								<Disclosure.Button className="flex w-full justify-between bg-white px-6 py-6 text-left text-sm font-medium text-black shadow-md hover:bg-white focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
									<div className="flex items-center justify-center gap-4">
										<span className="text-base font-bold text-[#283A46]">
										{t('current_residence_accordion_title')}
										</span>
										<DropDownTickIcon
											className={`${
												(currentResidentialAddressSubmited) ? 'block' : 'hidden'
											} h-6 w-6`}
										/>
									</div>
									<DropDownIcon
										className={`${open ? 'rotate-180 transform' : ''} h-8 w-8`}
									/>
								</Disclosure.Button>
								<Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
									<CurrentResidentialAddressForm
										setStep={setStep}
										closeAccordion={close}
									/>
								</Disclosure.Panel>
							</>
						)}
					</Disclosure>

					<Disclosure
						as="div"
						defaultOpen={
							initialData?.data?.enrollment_details?.current_step ===
							'reimbursement_info'
						}
						// open={step === 4}
						className={`
							 'opacity-100'} 
							mt-2`}
					>
						{({ open, close }) => (
							<>
								<Disclosure.Button className="flex w-full justify-between bg-white px-6 py-6 text-left text-sm font-medium text-black shadow-md hover:bg-white focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
									<div className="flex items-center justify-center gap-4">
										<span className="text-base font-bold text-[#283A46]">
										{t('reimbursement_accordion_title')}
										</span>
										<DropDownTickIcon
											className={`${
												(reimbursementFormSubmited) ? 'block' : 'hidden'
											} h-6 w-6`}
										/>
									</div>
									<DropDownIcon
										className={`${open ? 'rotate-180 transform' : ''} h-8 w-8`}
									/>
								</Disclosure.Button>
								<Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
									<ReimbursementInformationForm
										setStep={setStep}
										closeAccordion={close}
									/>
								</Disclosure.Panel>
							</>
						)}
					</Disclosure>
					<Disclosure
						as="div"
						// open={step === 4}
						className={`
							${'opacity-100'} 
							mt-2 pb-36`}
					>
						{({ open, close }) => (
							<>
								<Disclosure.Button className="flex w-full justify-between bg-white px-6 py-6 text-left text-sm font-medium text-black shadow-md hover:bg-white focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
									<div className="flex items-center justify-center gap-4">
										<span className="text-base font-bold text-[#283A46]">
										{t('occupational_accordion_title')}
										</span>
										<DropDownTickIcon
											className={`${
												(occupationFormSubmited) ? 'block' : 'hidden'
											} h-6 w-6`}
										/>
									</div>
									<DropDownIcon
										className={`${open ? 'rotate-180 transform' : ''} h-8 w-8`}
									/>
								</Disclosure.Button>
								<Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
									<OccupationDetailsForm
										setStep={setStep}
										closeAccordion={close}
									/>
								</Disclosure.Panel>
							</>
						)}
					</Disclosure>
				</div>
			</div>

			<FormSubmitFooter step={step}  />
		</>
	);
};

export default ProfileDetails;
