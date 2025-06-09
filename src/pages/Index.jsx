import React, { useEffect, useState } from 'react';
import Stepper from '../components/Form/Stepper';
import FormSubmitFooter from './patientInformation/components/patientInformation/FormSubmitFooter';
import { ReactComponent as BrandIcon } from '../../src/assets/images/svg/brand-logo.svg';
import ProfileDetails from './patientInformation/components/patientInformation';
import CareGiverDetailsForm from './caregiverInformation/components';
import AuthorizationConsent from './Authorization/AuthorizationConsent';
import UploadDocumentsForm from './OtherDocuments';
import { useDispatch, useSelector } from 'react-redux';

import {
	selectCurrentStep,
	ChangeNextStep,
	selectInitializeData,
	setInitializeData,
} from './slice';
import useApi from '../hooks/useApi';
// import { useNavigate } from 'react-router-dom';
import Consent from '../../src/pages/Modals/Concent/Concent';
import DocESign from './Modals/DocumentESign/DocESign';
import { useTranslation } from 'react-i18next';

function ProgramEnrollmentForm() {
	const { t } = useTranslation()
	const CurrentStep = useSelector(selectCurrentStep);
	const initialData = useSelector(selectInitializeData);
	const dispatch = useDispatch();
	const [currentState, setCurrentState] = useState(initialData?.data?.current_state);

	const stepContent = {
		patient_details: <ProfileDetails />,
		caregiver_details: <CareGiverDetailsForm />,
		document_upload: <UploadDocumentsForm />,
		authorization: <AuthorizationConsent />,
	};

	const stepTitles = {
		patient_details: `1.${t('profile_details_title')}`,
		caregiver_details: `2.${t('caregiver_title')}`,
		document_upload: `3.${t('document_upload_title')}`,
		authorization: `4.${t('authorization_title')}`,
	};

	const [step, setStep] = useState(5);

	useEffect(() => {
		
		dispatch(
			ChangeNextStep(
				initialData.data?.enrollment_details?.current_step
					? initialData.data?.enrollment_details?.current_step
					: 'patient_details'
			)
		);
	}, [initialData]);

	// useEffect(() => {
	// 	const makeApiCall = async () => {
	// 		const { response, success } = await triggerApi({
	// 			url: `/patient-initialize/`,
	// 			type: 'GET',
	// 			loader: true,
	// 		});
	// 		if (success && response) {
	// 			dispatch(setInitializeData(response));
	// 			setCurrentState(response?.data?.current_state);

	// 			if (window.ReactNativeWebView) {
	// 				window.ReactNativeWebView.postMessage(JSON.stringify(response?.data));
	// 			}

	// 			if (
	// 				response?.data?.current_state == 'enrollment_complete' ||
	// 				response?.data?.current_state == 'program_applied'
	// 			) {
	// 				navigate('/platform/ProgramEnrollmentSucess');
	// 			} else if (
	// 				response?.data?.current_state !== 'enrollment_pending' &&
	// 				response?.data?.current_state !== 'document_esign'
	// 			) {
	// 				navigate('/Dashboard/home');
	// 			}

	// 			if (response?.data?.current_state == 'signup_success') {
	// 				navigate('/tnc');
	// 			}

	// 			dispatch(
	// 				ChangeNextStep(
	// 					response.data?.enrollment_details?.current_step
	// 						? response.data?.enrollment_details?.current_step
	// 						: 'patient_details'
	// 				)
	// 			);

	// 		}
	// 	};

	// 	makeApiCall();
	// }, []);

	// useEffect(() => {
	// 	setCurrentState(initialData?.data?.current_state);
	// }, [JSON.stringify(initialData)]);
	

		

	// if (currentState === 'signup_success') {
	// 	return (
	// 		<Consent setCurrentState={setCurrentState} currentState={currentState} />
	// 	);
	// }

	// if (currentState === 'document_esign') {
	// 	return (
	// 		<DocESign setCurrentState={setCurrentState} currentState={currentState} />
	// 	);
	// }

	return (
		<>
			{/* <Consent /> */}
			{/* <Consent setCurrentState={setCurrentState} currentState={currentState} /> */}
			<DocESign setCurrentState={setCurrentState} currentState={currentState} />
			<div className="fixed top-0 left-0 z-20 flex w-full items-center justify-center bg-white p-6 pt-11">
				<BrandIcon className="h-[32px] min-h-[32px]" />
			</div>

			<div className="pt-30">
				<div className="w-full rounded-2xl bg-white">
					<div className="w-full px-5 pt-10">
						<div className="border-b border-[#DBDBDB] py-6">
							<h1 className="text-xl font-semibold text-black">
								{t('program_enrollment_title')}
							</h1>
						</div>
						<h1 className="py-4 pt-6 text-sm font-bold text-primary">
							{console.log('CurrentStep', CurrentStep)}
							{stepTitles[CurrentStep] || ''}
						</h1>
						<Stepper />
					</div>
					{stepContent[CurrentStep]}
				</div>

				{/* {<ProgramEnrollmentSucess/>} */}
			</div>
			<FormSubmitFooter setCurrentState={setCurrentState} step={step} />

			{/* <Concent/> */}
		</>
	);
}

export default ProgramEnrollmentForm;
