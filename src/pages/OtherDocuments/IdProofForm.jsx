import React, { useEffect } from 'react';

import { get } from 'lodash';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import MultiFileUpload from '../../components/Form/MultiFileUpload';
import { ReactComponent as NextDownChevron } from '../../assets/images/svg/NextDownChevron.svg';
import { useDispatch, useSelector } from 'react-redux';

import Radio from '../../components/Form/Radio';
import {
	addIdProof,
	selectInitializeData,
	setDocumentUploadDetails,
	selectDocumentUploadDetails,
	setPatientDetails,
	selectPatientDetails,
	setInitializeData,
	isIdProofFormSubmittted,
	isUploadDocumentsDataSubmited,
	setIDType,
} from '../slice';
import { transformToPatientEnrollmentDetailsFormData } from '../../utils/forms';
import useApi from '../../hooks/useApi';
import { useTranslation } from 'react-i18next';

function IdProofForm({ setStep, closeAccordion }) {
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const initialData = useSelector(selectInitializeData);
	const document_upload_details = useSelector(selectDocumentUploadDetails);
	const patient_details = useSelector(selectPatientDetails);

	const triggerApi = useApi()
	const initialValues = {
		proof_type:
			initialData?.data?.enrollment_details?.step_data?.document_upload
				?.proof_type || 'aadhar card',
		IdProof: initialData?.data?.enrollment_details?.step_data?.document_upload
			?.file_link
			? [
					{
						name: initialData?.data?.enrollment_details?.step_data
							?.document_upload?.file_link,
					},
			  ]
			: [],
	};
	console.log('init vals', initialData)

	const validationSchema = Yup.object({
		proof_type: Yup.string().required(t('id_proof_form.validation.proof_type_required')),
		IdProof: Yup.array().min(1, t('id_proof_form.validation.file_required')).required(t('id_proof_form.validation.required')),
	});

	const onSubmit = (values) => {
		console.log('valz',values)
		dispatch(
			setDocumentUploadDetails({ ...document_upload_details, ...values })
		);
		dispatch(setPatientDetails({ ...patient_details, ...values }));
		dispatch(addIdProof({...initialData?.data?.enrollment_details?.step_data?.document_upload
			, proof_type:values.proof_type}));
		closeAccordion();
	};

	if (
		initialData?.data?.enrollment_details?.step_data?.document_upload?.file_link && 
		initialData?.data?.enrollment_details?.step_data?.document_upload?.proof_type
	) {
		addIdProof(initialValues);
		dispatch(isIdProofFormSubmittted(true))
	}

	const handleFileUpload = (files, formik) => {
		dispatch(isIdProofFormSubmittted(true))

		
		let dynamicFormData = transformToPatientEnrollmentDetailsFormData({
			file: files,
			file_name: 'document_upload',
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
					console.log(response?.data?.file_link)
					dispatch(addIdProof({...formik.values,
						 file_link: response?.data?.file_link}))
					formik.setFieldValue('IdProof', [{ name: response?.data?.file_link }]);
					// if (formik.isValid) {
					// 	dispatch(isIdProofFormSubmittted(true))
					// }
				}
			} catch (error) {
				console.error('Error during API call:', error);
			}
		};

		makeApiCall();
	};

	// const onSubmit = (values) => {
	// 	console.log('valz',values)
	// 	dispatch(
	// 		setDocumentUploadDetails({ ...document_upload_details, ...values })
	// 	);
	// 	dispatch(setPatientDetails({ ...patient_details, ...values }));
	// 	dispatch(addIdProof({...initialData?.data?.enrollment_details?.step_data?.document_upload
	// 		, proof_type:values.proof_type}));
	// 	handleCloseAccordion();
	// 	setStep(2);

		// let dynamicFormData = transformToPatientEnrollmentDetailsFormData({proof_type: values.proof_type, });
	 
		// const makeApiCall = async () => {
		// 	try {
		// 		const { response, success } = await triggerApi({
		// 			url: `/patient/enrol/`,
		// 			type: 'POST',
		// 			loader: true,
		// 			payload: dynamicFormData,
		// 		});
	 
		// 		if (success && response) {
		// 			// dispatch(addIdProof(values));
		// 			dispatch(addIdProof({...initialData?.data?.enrollment_details?.step_data?.document_upload
		// 				, proof_type:values.proof_type}))
		// 			handleCloseAccordion()
		// setStep(2);
		// 		}
		// 	} catch (error) {
		// 		console.error('Error during API call:', error);
		// 	}
		// };
	 
		// makeApiCall();
	// };

	const handleFileRemove = (file) => {
		// if (file.length === 0) {
		dispatch(isIdProofFormSubmittted(false));
		// }
	};

	useEffect(() => {
		console.log('patient_details.proof_type');
		if (!patient_details.proof_type) {
			dispatch(
				setDocumentUploadDetails({
					...document_upload_details,
					...initialValues,
				})
			);
			dispatch(setPatientDetails({ ...patient_details, ...initialValues }));
			dispatch(
				addIdProof({
					...initialData?.data?.enrollment_details?.step_data?.document_upload,
					...initialValues,
				})
			);
		}
	}, [])
	

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={onSubmit}
		>
			{(formik) => (
				<Form className="complete-hidden-scroll-style flex flex-grow flex-col gap-4 overflow-y-auto">
					{/* <div>
        <pre>{JSON.stringify(formik.values, null, 2)}</pre>
        <pre>{JSON.stringify(formik.errors, null, 2)}</pre>
        <pre>{JSON.stringify(formik.touched, null, 2)}</pre>
        <pre>{`isValid: ${formik.isValid}`}</pre>
        <pre>{`dirty: ${formik.dirty}`}</pre>
      </div> */}
					<p className="font-open-sans text-sm italic text-[#403939]">
						{t('id_proof_form.file_instructions')}
					</p>
					<Radio
						key="proof_type"
						name="proof_type"
						id="proof_type"
						radioData={[
							{
								id: 'aadhar card',
								value: 'aadhar card',
								label: t('id_proof_form.id_types.aadhar_card'),
							},
							{
								id: 'voter id',
								value: 'voter id',
								label: t('id_proof_form.id_types.voter_id'),
							},

							{
								id: 'pan card',
								value: 'pan card',
								label: t('id_proof_form.id_types.pan_card'),
							},
						]}
						value={get(formik.values, 'proof_type', 'voter id')}
						onChange={(e) => {
							// You may want to handle changes here if needed
							dispatch(
								addIdProof({
									...initialData?.data?.enrollment_details?.step_data
										?.document_upload,
									proof_type: e.target.value,
								})
							);
							dispatch(setIDType(e.target.value));
							dispatch(
								setDocumentUploadDetails({
									...document_upload_details,
									...formik.values,
									proof_type: e.target.value,
								})
							);
							dispatch(
								setPatientDetails({
									...patient_details,
									...formik.values,
									proof_type: e.target.value,
								})
							);
						}}
						formik={formik}
					/>

					{/* Uncomment and configure MultiFileUpload if needed */}
					<MultiFileUpload
						isMultiple={false}
						formik={formik}
						label={
							<>
								{t('id_proof_form.upload.label')}{' '}
								<span className="text-red-500">*</span>
							</>
						}
						id="IdProof"
						name="IdProof"
						onFileUpload={(files) => handleFileUpload(files, formik)}
						onFileRemove={handleFileRemove}
					/>

					<div className="sticky bottom-0 flex flex-col gap-[8px] bg-[#ffffff] pt-[24px] font-lato text-[#696969]">
						<div className="flex w-full items-center justify-end px-[16px] py-[14px] font-lato text-[14px] font-bold leading-[20px] text-white disabled:opacity-[0.38]">
							<button
								type="submit"
								disabled={!formik.isValid}
								className={`flex items-center justify-center gap-4 ${
									!formik.isValid
										? 'cursor-not-allowed text-primary opacity-50'
										: 'text-primary'
								}`}
							>
								<NextDownChevron />
								<span className="text-base font-bold">
									{t('id_proof_form.buttons.next')}
								</span>
							</button>
						</div>
					</div>
				</Form>
			)}
		</Formik>
	);
}

export default IdProofForm;
