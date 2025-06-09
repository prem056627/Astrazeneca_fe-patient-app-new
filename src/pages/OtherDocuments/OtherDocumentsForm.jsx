import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import MultiFileUpload from '../../components/Form/MultiFileUpload';
import {
	addUploadOtherDocuments,
	isUploadDocumentsDataSubmited,
	selectInitializeData,
} from '../slice/index';
import { transformToPatientEnrollmentDetailsFormData } from '../../utils/forms';
import useApi from '../../hooks/useApi';

function OtherDocumentsForm({ closeAccordion }) {
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const initialData = useSelector(selectInitializeData);
	const triggerApi = useApi();
	const initialValues = {
		// Enrollment_Form: [],
		prescription_file_link: initialData?.data?.enrollment_details?.step_data
			?.other_documents?.prescription_file_link
			? [
					{
						name: initialData?.data?.enrollment_details?.step_data
							?.other_documents?.prescription_file_link,
					},
			  ]
			: [],
		diagonosis_details_file_link: initialData?.data?.enrollment_details
			?.step_data?.other_documents?.diagonosis_details_file_link
			? [
					{
						name: initialData?.data?.enrollment_details?.step_data
							?.other_documents?.diagonosis_details_file_link,
					},
			  ]
			: [],
	};

	console.log('init!', initialData?.data?.enrollment_details?.step_data?.other_documents)

	const validationSchema = Yup.object({
		prescription_file_link: Yup.array()
			.min(1, t('other_documents_form.validation.file_required'))
			.required(t('other_documents_form.validation.required')),
		diagonosis_details_file_link: Yup.array()
			.min(1, t('other_documents_form.validation.file_required'))
			.required(t('other_documents_form.validation.required')),
	});

	if (
		initialData?.data?.enrollment_details?.step_data?.other_documents
			?.diagonosis_details_file_link &&
		initialData?.data?.enrollment_details?.step_data?.other_documents
			?.prescription_file_link
	) {
		dispatch(isUploadDocumentsDataSubmited(true));
	}


	const handleFileUpload = (files, formik, name) => {
		// Update formik values for the field
		// formik.setFieldValue(name, files).then(() => {
			// Mark the field as touched
			// formik.setFieldTouched(name, true);

			// Call the API after setting the formik value and touching the field
			let dynamicFormData = transformToPatientEnrollmentDetailsFormData({
				file_name: name,
				file: files,
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
						// Make sure the form is valid and dispatch the state change
						console.log('formik', formik, response, name);
						formik.setFieldValue(`${name}_link`, [{ name: response?.data?.file_link }]);

						const bothFilesUploaded =
						(formik.values.prescription_file_link.length > 0 && name=='diagonosis_details_file' ) ||
						(formik.values.diagonosis_details_file_link.length > 0 && name=='prescription_file');


						if(bothFilesUploaded){
							dispatch(isUploadDocumentsDataSubmited(bothFilesUploaded));
							dispatch(addUploadOtherDocuments(formik.values));
						}
						
						if (formik.isValid) {
							// dispatch(addUploadOtherDocuments(formik.values));
						}
					}
				} catch (error) {
					console.error('Error during API call:', error);
				}
			};

			// Make the API call after the formik value has been updated
			makeApiCall();
		// });
	};

const handleFileRemove = (file) => {
	if (file.length === 0) {
		dispatch(isUploadDocumentsDataSubmited(false));
	}
};
	

	return (
		<Formik initialValues={initialValues} validationSchema={validationSchema}>
			{(formik) => (
				<Form className="complete-hidden-scroll-style flex flex-grow flex-col gap-4 overflow-y-auto pb-30">
					{/* <MultiFileUpload
						isMultiple={false}
						formik={formik}
						label="Enrollment Form"
						id="Enrollment_Form"
						name="Enrollment_Form"
						onFileUpload={(files) =>
							handleFileUpload(files, formik, 'Enrollment_Form')
						} */}
					{/* /> */}
					<p className="font-open-sans text-sm italic text-[#403939]">
						{t('other_documents_form.file_instructions')}
					</p>
					<MultiFileUpload
						isMultiple={false}
						formik={formik}
						label={<>{t('other_documents_form.prescription.label')} <span className='text-red-500'>*</span></>}
						id="prescription_file_link"
						name="prescription_file_link"
						onFileRemove={handleFileRemove}
						onFileUpload={(files) =>
							handleFileUpload(files, formik, 'prescription_file')
						}
					/>
					<MultiFileUpload
						isMultiple={false}
						formik={formik}
						label={<>{t('other_documents_form.diagnosis.label')} <span className='text-red-500'>*</span></>}
						id="diagonosis_details_file_link"
						name="diagonosis_details_file_link"
						onFileRemove={handleFileRemove}
						onFileUpload={(files) =>
							handleFileUpload(files, formik, 'diagonosis_details_file')
						}
					/>
				</Form>
			)}
		</Formik>
	);
}

export default OtherDocumentsForm;
