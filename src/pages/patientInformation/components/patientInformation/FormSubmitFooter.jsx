import React, { useEffect } from 'react';
import { ReactComponent as FormSubmitLeftArrow } from "../../../../assets/images/svg/FormSubmit_Left_Arrow.svg";
import { ReactComponent as RightArrow } from "../../../../assets/images/svg/Component/Component/Library/icon/right arrow.svg";
import { useDispatch, useSelector } from 'react-redux';
import {
	ChangeNextStep,
	selectCurrentStep,
	setisFinalSubmit,
	selectIsProgramEnrollmentDataSubmited,
	setIsProgramEnrollmentDataSubmited,
	selectisProfileDetailsDataSubmited,
	selectisOccupationDetailsDataSubmited,
	selectisCaregiverDetailsData,
	selectisUploadDocumentsDataSubmited,
	selectisAuthorizationSubmited,
	selectProgramEnrollmentData,
	selectInitializeData,
	selectPatientDetails,
	selectCaregiverDetails,
	selectAuthorizationDetails,
	selectDocumentUploadDetails,
	setInitializeData,
	selectIsAddressProofFormValid,
	selectIsCurrAddressFormValid,
	selectIsIdProofFormSubmittted,
	selectIDType
} from '../../../slice';
// import { useNavigate } from "react-router-dom";
import { transformToPatientEnrollmentDetailsFormData } from '../../../../utils/forms';
import useApi from '../../../../hooks/useApi';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

const PERSONAL_DETAILS = 'patient_details';
const CAREGIVER_DETAILS = 'caregiver_details';
const UPLOAD_DOCUMENTS_DETAILS = 'document_upload';
const AUTHORIZATION_DETAILS_SUBMIT = 'authorization';

function FormSubmitFooter({ formik, setCurrentState }) {
	const dispatch = useDispatch();
	const { t } = useTranslation();
	// const navigate = useNavigate();
	const triggerApi = useApi();

	const currentStep = useSelector(selectCurrentStep);
	const ProgramEnrollmentDataSubmited = useSelector(
		selectIsProgramEnrollmentDataSubmited
	);

	const patient_details = useSelector(selectPatientDetails);
	const caregiver_details = useSelector(selectCaregiverDetails);
	const authorization_details = useSelector(selectAuthorizationDetails);
	const document_upload_details = useSelector(selectDocumentUploadDetails);

	const profileDetailsDataSubmited = useSelector(
		selectisProfileDetailsDataSubmited
	);
	const occupationDetailsDataSubmited = useSelector(
		selectisOccupationDetailsDataSubmited
	);
	const caregiverDetailsData = useSelector(selectisCaregiverDetailsData);
	const uploadDocumentsData = useSelector(selectisUploadDocumentsDataSubmited);
	const authorizationSubmited = useSelector(selectisAuthorizationSubmited);
	const programEnrollmentData = useSelector(selectProgramEnrollmentData);
	const initializeData = useSelector(selectInitializeData);

	const isCurrAddressFormValid = useSelector(selectIsCurrAddressFormValid); 
	const isAddressProofFormValid = useSelector(selectIsAddressProofFormValid);
	const isIDUploadFormValid = useSelector(selectIsIdProofFormSubmittted) 

	const idType = useSelector(selectIDType)

	useEffect(() => {
		if (ProgramEnrollmentDataSubmited) {
			console.log(
				'isProgramEnrollmentDataSubmited',
				ProgramEnrollmentDataSubmited
			);

			console.log('....initializeData', initializeData);
			// navigate('/platform/ProgramEnrollmentSucess');
		}
	}, [ProgramEnrollmentDataSubmited]);
	// const initializeData = useSelector(selectInitializeData);
	const OnSubmit = () => {
		if (currentStep === PERSONAL_DETAILS) {
			console.log('on submit patient_details', patient_details);

			let dynamicFormData = transformToPatientEnrollmentDetailsFormData({
				step_data: 'patient_details',
				...patient_details,
				date_of_birth: moment(patient_details.date_of_birth).format(
					'YYYY-MM-DD'
				),
			});
			const makeApiCall = async () => {
				try {
					const { response, success } = await triggerApi({
						url: `/patient/enrol/`,
						type: 'POST',
						loader: true,
						payload: dynamicFormData,
					});

					if (success && response) {
						dispatch(ChangeNextStep(CAREGIVER_DETAILS));
					}
				} catch (error) {
					console.error('Error during API call:', error);
				}
			};
			makeApiCall();
		} else if (currentStep === CAREGIVER_DETAILS) {
			let dynamicFormData = transformToPatientEnrollmentDetailsFormData({
				step_data: 'caregiver_details',
				...caregiver_details,
			});
			const makeApiCall = async () => {
				try {
					const { response, success } = await triggerApi({
						url: `/patient/enrol/`,
						type: 'POST',
						loader: true,
						payload: dynamicFormData,
					});

					if (success && response) {
						dispatch(ChangeNextStep(UPLOAD_DOCUMENTS_DETAILS));
					}
				} catch (error) {
					console.error('Error during API call:', error);
				}
			};
			makeApiCall();
		} else if (currentStep === UPLOAD_DOCUMENTS_DETAILS) {
			let dynamicFormData = transformToPatientEnrollmentDetailsFormData({
				step_data: 'document_upload',
				...document_upload_details,
			});
			const makeApiCall = async () => {
				try {
					const { response, success } = await triggerApi({
						url: `/patient/enrol/`,
						type: 'POST',
						loader: true,
						payload: dynamicFormData,
					});

					if (success && response) {
						dispatch(ChangeNextStep(AUTHORIZATION_DETAILS_SUBMIT));
					}
				} catch (error) {
					console.error('Error during API call:', error);
				}
			};
			makeApiCall();
		} else if (currentStep === AUTHORIZATION_DETAILS_SUBMIT) {
			console.log('Final submit form!!!!', authorization_details);

			let dynamicFormData = transformToPatientEnrollmentDetailsFormData({
				step_data: 'authorization',
				...authorization_details,
			});
			const makeApiCall = async () => {
				try {
					const { response, success } = await triggerApi({
						url: `/patient/enrol/`,
						type: 'POST',
						loader: true,
						payload: dynamicFormData,
					});

					if (success && response) {
						setCurrentState('document_esign');
					}
				} catch (error) {
					console.error('Error during API call:', error);
				}
			};
			makeApiCall();
		}
	};
	
	useEffect(() => {
		console.log('valid f ', isCurrAddressFormValid, isAddressProofFormValid);
	}, [isCurrAddressFormValid , isAddressProofFormValid]);
	

	const checkSubmitFlag = () => {
		switch (currentStep) {
			case PERSONAL_DETAILS:
				if (isCurrAddressFormValid && isAddressProofFormValid) {
					return profileDetailsDataSubmited && occupationDetailsDataSubmited;
				}
				else {
					return false
				}
			case CAREGIVER_DETAILS:
				return caregiverDetailsData;
			case UPLOAD_DOCUMENTS_DETAILS:
				console.log('check bools',uploadDocumentsData, isIDUploadFormValid)
				return uploadDocumentsData && isIDUploadFormValid;
			case AUTHORIZATION_DETAILS_SUBMIT:
				return authorizationSubmited;
			default:
				return false;
		}
	};

	const isDisabled = checkSubmitFlag() === false;

	// Back functionality: Determine the previous step
	const getPreviousStep = () => {

		const makeApiCall = async (step) => {
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
		

		switch (currentStep) {
			case CAREGIVER_DETAILS:
				makeApiCall(PERSONAL_DETAILS);
				break;
			case UPLOAD_DOCUMENTS_DETAILS:
				makeApiCall(CAREGIVER_DETAILS);
				break;
			case AUTHORIZATION_DETAILS_SUBMIT:
				makeApiCall(UPLOAD_DOCUMENTS_DETAILS);
				break;
			default:
				return null;
		}
	};

	const onsubmitReverse = () => {
		const previousStep = getPreviousStep();
		if (previousStep) {
			dispatch(ChangeNextStep(previousStep));
		}
	};

	return (
		<div className="fixed bottom-0 left-0 z-50 flex w-full justify-between border-t bg-white px-6 py-6">
			<button
				type="button"
				onClick={onsubmitReverse}
				disabled={currentStep === PERSONAL_DETAILS}
				className={`h-12 w-12 rounded-full bg-[#F2D5F1] p-4 text-white ${
					currentStep === PERSONAL_DETAILS ? 'opacity-30' : 'opacity-100'
				}`}
			>
				<FormSubmitLeftArrow />
			</button>

			<button
				type="button"
				onClick={OnSubmit}
				disabled={isDisabled}
				className={`${
					isDisabled ? 'opacity-30' : 'opacity-100'
				} flex h-12 items-center justify-center gap-2 rounded-md bg-primary p-4 text-white disabled:opacity-75`}
			>
				<span>{t('save_next')}</span>
				<RightArrow />
			</button>
		</div>
	);
}

export default FormSubmitFooter;
