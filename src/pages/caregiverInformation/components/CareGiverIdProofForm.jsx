import React, { useEffect } from 'react';
import Radio from '../../../components/Form/Radio';
import { get } from 'lodash';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import MultiFileUpload from '../../../components/Form/MultiFileUpload';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
	addCareGiverIdProof,
	isCaregiverDetailsData,
	selectProgramEnrollmentData,
	selectInitializeData,
	selectCaregiverDetails,
	setCaregiverDetails,
} from '../../slice/index';
import { transformToPatientEnrollmentDetailsFormData } from '../../../utils/forms';
import useApi from '../../../hooks/useApi';

function CareGiverIdProofForm({ setStep, closeAccordion }) {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const triggerApi = useApi();
	const PersonalDetailsData = useSelector(selectProgramEnrollmentData);
	const initialData = useSelector(selectInitializeData);
	const caregiver_details = useSelector(selectCaregiverDetails);

	useEffect(()=>{
		console.log('component mounted')
	},[])
  

	const initialValues = {
		Caregiver_ID_Proof_Info:
			initialData?.data?.enrollment_details?.step_data?.caregiver_id_proof?.proof_type?.toLowerCase() ||
			'',
		CareGiverIdProof: initialData?.data?.enrollment_details?.step_data?.caregiver_id_proof?.file_link ?
			[
				{
					name: initialData?.data?.enrollment_details?.step_data?.caregiver_id_proof?.file_link?.toLowerCase(),
				},
			] : [],
	};

	const validationSchema = Yup.object({
		Caregiver_ID_Proof_Info: Yup.string()
			.required(t('caregiver_id_proof_form.validation.required')),
	});

	useEffect(()=>{
	
		dispatch(
			addCareGiverIdProof({
				proof_type:
					initialData?.data?.enrollment_details?.step_data?.caregiver_id_proof
						?.proof_type,
				file_link:
					initialData?.data?.enrollment_details?.step_data?.caregiver_id_proof
						?.file_link,
			})
		);
		dispatch(isCaregiverDetailsData(true));
	},[])

	const handleCloseAccordion = () => {
		closeAccordion();
	};

	const handleFileUpload = (files, formik) => {


		// dispatch(setCaregiverDetails({ ...caregiver_details, ...values }));
		// dispatch(isCaregiverDetailsData(formik.isValid));
		// handleCloseAccordion();
		// // Submit the form
		// formik.submitForm();

		// // Update the step
		// setStep(4);

		console.log('formik.isValid', formik.values, formik.isValid);
		

		let dynamicFormData = transformToPatientEnrollmentDetailsFormData({
			file: files,
			file_name: 'caregiver_id_proof',
		});

		const makeApiCall = async () => {
			try {
				const { response, success } = await triggerApi({
					url: `/save-file/`,
					type: 'POST',
					loader: true,
					payload: dynamicFormData,
				});

				if (success && response) {
					
					console.log('formik values on file upload', formik.values);
					
					dispatch(
						addCareGiverIdProof({
							proof_type: formik.value['Caregiver_ID_Proof_Info'],
							file_link: response?.data?.file_link,
						})
					);
					formik.setFieldValue('IdProof', [
						{ name: response?.data?.file_link },
					]);
					// Update caregiver details status
					
					dispatch(isCaregiverDetailsData(formik.isValid));
					// handleCloseAccordion();
					// Submit the form
					// formik.submitForm();

					// Update the step
					setStep(4);
				}
			} catch (error) {
				console.error('Error during API call:', error);
			}
		};

		makeApiCall();
	};

	const handleFileRemove = (file) => {
		if (file.length === 0) {
			dispatch(isCaregiverDetailsData(false));
		}
	}

	if (
		initialData?.data?.enrollment_details?.step_data?.caregiver_id_proof
			?.file_link
	) {
	console.log(
		'inside if condition',
		initialData?.data?.enrollment_details?.step_data?.caregiver_id_proof
			?.file_link
	);
	
			

		dispatch(isCaregiverDetailsData(true));
	}
	

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={(values) => {
				dispatch(addCareGiverIdProof(values));
				setStep(4);
			}}
		>
			{(formik) => (
				<Form className="complete-hidden-scroll-style flex flex-grow flex-col gap-4 overflow-y-auto">
					<p className="font-open-sans text-sm italic text-[#403939]">
						{t('caregiver_id_proof_form.file_instructions')}
					</p>
					<Radio
						key="Caregiver_ID_Proof_Info"
						name="Caregiver_ID_Proof_Info"
						id="Caregiver_ID_Proof_Info"
						radioData={[
							{ 
								id: 'voter id', 
								value: 'voter id', 
								label: t('caregiver_id_proof_form.id_types.voter_id')
							},
							{ 
								id: 'aadhar card', 
								value: 'aadhar card', 
								label: t('caregiver_id_proof_form.id_types.aadhar_card')
							},
							{ 
								id: 'pan card', 
								value: 'pan card', 
								label: t('caregiver_id_proof_form.id_types.pan_card')
							},
						]}
						value={get(formik.values, 'Caregiver_ID_Proof_Info', '')}
						formik={formik}
						onChange={(e) => {
							console.log('radio value', e.target.value);
							dispatch(
								addCareGiverIdProof({
									...initialData?.data?.enrollment_details?.step_data
										?.caregiver_id_proof,
									proof_type: e.target.value,
								})
							);
							dispatch(
								setCaregiverDetails({
									...caregiver_details,
									proof_type: e.target.value,
								})
							);
						}}
					/>

					<MultiFileUpload
						isMultiple={false}
						formik={formik}
						label={t('caregiver_id_proof_form.upload.label')}
						id="CareGiverIdProof"
						onFileRemove={handleFileRemove}
						onFileUpload={(files) => handleFileUpload(files, formik)}
					/>
				</Form>
			)}
		</Formik>
	);
}

export default CareGiverIdProofForm;

