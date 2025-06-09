import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import Radio from '../../../../components/Form/Radio';
import InputField from '../../../../components/Form/InputField';
import { ReactComponent as Warning } from '../../../../assets/images/svg/Warning.svg';
import {
	isProfileDetailsDataSubmited,
	isOccupationDetailsDataSubmited,
	selectPatientDetails,
	setPatientDetails,
	selectInitializeData,
	addOccupationForm,
} from '../../../slice';
import { useTranslation } from 'react-i18next';

function OccupationDetailsForm({ setStep, closeAccordion }) {
	const {t} = useTranslation()
	const dispatch = useDispatch();
	const [formValue, setFormValue] = useState({});
	const patient_details = useSelector(selectPatientDetails);
	const initialData = useSelector(selectInitializeData);

	console.log('test',initialData)

	// Set initial form values from redux or set defaults
	console.log('test 2',initialData?.data?.enrollment_details?.step_data?.occupational_details)
	const initialValues = {
		self_employed:
			initialData?.data?.enrollment_details?.step_data?.occupational_details
				?.self_employed || '',
		employment_status: initialData?.data?.enrollment_details?.step_data?.occupational_details
		?.employment_status || '',
		semi_government:
			initialData?.data?.enrollment_details?.step_data?.occupational_details
				?.semi_government || '',
		private:
			initialData?.data?.enrollment_details?.step_data?.occupational_details
				?.private || '',
		service_government:
			initialData?.data?.enrollment_details?.step_data?.occupational_details
				?.service_government || '',
		name_of_the_last_organization_with_address:
			initialData?.data?.enrollment_details?.step_data?.occupational_details
				?.name_of_the_last_organization_with_address || '',
		not_working:
			initialData?.data?.enrollment_details?.step_data?.occupational_details
				?.not_working || '',
		name_of_the_current_organization:
			initialData?.data?.enrollment_details?.step_data?.occupational_details
				?.name_of_the_current_organization || '',
		self_employed: initialData?.data?.enrollment_details?.step_data?.occupational_details
					?.self_employed || '',
		not_working: initialData?.data?.enrollment_details?.step_data?.occupational_details
					?.not_working || '',
	};
	console.log('initial', initialValues)
	// Dynamic validation schema
	const getValidationSchema = (employment_status, notWorking) => {
		let schema = {
			// name_of_the_current_organization: Yup.string().required(
			// 	'Please enter the current organization details'
			// ),
			employment_status: Yup.mixed()
			.oneOf(['self_employed', 'salaried', 'not_working'])
			.required('Please select an employment status'),
		};

		// Add validation only if self_employed is 'yes'
		// if (employment_status === 'salaried') {
		// 	schema = {
		// 		...schema,
		// 		// self_employed: Yup.string().required('Please select an option'),
		// 		semi_government: Yup.string().required('Please select an option'),
		// 		private: Yup.string().required('Please select an option'),
		// 		service_government: Yup.string().required('Please select an option'),
		// 		name_of_the_last_organization_with_address: Yup.string()
		// 	};
		// }
		switch (employment_status) {
			case 'salaried':
			  schema = {
				...schema,
				semi_government: Yup.string().required('Please select an option'),
				private: Yup.string().required('Please select an option'),
				service_government: Yup.string().required('Please select an option'),
				name_of_the_last_organization_with_address: Yup.string(),
			  };
			  break;
		  
			case 'self_employed':
			  schema = {
				...schema,
				name_of_the_current_organization: Yup.string(),
			  };
			  break;
		  
			case 'not_working':
			  schema = {
				...schema,
				// name_of_the_last_organization_with_address: Yup.string(),
			  };
			  break;
		  
			default:
			  break;
		  }
		  

		// Only add name_of_the_current_organization validation if not_working is 'no'
		if (notWorking === 'no') {
			schema.name_of_the_current_organization = Yup.string().required(
				'Please enter the current organization details'
			);
		}

		return Yup.object().shape(schema);
	};

	const handleSaveNext = (data) => {
		setFormValue(data);
		console.log('validation logic', data);
		dispatch(addOccupationForm(data));

		// Determine current state of employment based on form data
		const isSelfEmployedNo = data.self_employed === 'yes' 
		const isNotWorkingNo = data.not_working === 'yes'
		const isEmploymentStatus = ['salaried', 'self_employed', 'not_working'].includes(initialValues.employment_status) || ['salaried', 'self_employed', 'not_working'].includes(data.employment_status);
		
		let checkForSalaried = true
		if(data.employment_status=='salaried'){
			checkForSalaried = false
		}
		if(data.employment_status=='salaried' || initialValues.employment_status=='salaried'){
			if((data.private || initialValues.private) || (data.semi_government || initialValues.semi_government) || (data.service_government || initialValues.service_government)){
				checkForSalaried = true
			}else{
				checkForSalaried = false
			}
		}
		// const isSelfEmployedNo = data.self_employed === 'yes';
		// const isNotWorkingNo = data.not_working === 'yes';
		const nameOfCurrentOrg = data.name_of_the_current_organization;

		// Validation Logic
		console.log('check',isEmploymentStatus, data)
		if (
			isEmploymentStatus &&
			checkForSalaried &&
			patient_details?.has_reimbursement
		) {
			dispatch(isOccupationDetailsDataSubmited(true));
			dispatch(isProfileDetailsDataSubmited(true));
			dispatch(setPatientDetails({ ...patient_details, ...data }));
		} else {
			dispatch(isProfileDetailsDataSubmited(false));
		}
		// if (isEmploymentStatus) {
		// 	// If self_employed is 'no' and not_working is 'no', set valid to true
		// 	dispatch(isProfileDetailsDataSubmited(true));
		// 	dispatch(setPatientDetails({ ...patient_details, ...data }));
		// } else if (isSelfEmployedNo) {
		// 	// If self_employed is 'no', only validate name_of_the_current_organization
		// 	if (nameOfCurrentOrg) {
		// 		dispatch(isProfileDetailsDataSubmited(true));
		// 		dispatch(setPatientDetails({ ...patient_details, ...data }));
		// 	} else {
		// 		dispatch(isProfileDetailsDataSubmited(false));
		// 	}
		// } else if (isNotWorkingNo) {
		// 	// If not_working is 'no', ensure name_of_the_current_organization is hidden
		// 	if (nameOfCurrentOrg) {
		// 		dispatch(isProfileDetailsDataSubmited(true));
		// 		dispatch(setPatientDetails({ ...patient_details, ...data }));
		// 	} else {
		// 		dispatch(isProfileDetailsDataSubmited(false));
		// 	}
		// } else {
		// 	if (
		// 		(data.self_employed === 'yes' || data.self_employed === 'no') &&
		// 		data.not_working === 'yes'
		// 	) {
		// 		dispatch(isProfileDetailsDataSubmited(true));
		// 		dispatch(setPatientDetails({ ...patient_details, ...data }));
		// 	} else {
		// 		dispatch(isProfileDetailsDataSubmited(false));
		// 	}
		// }
	};



	useEffect(() => {
		console.log('in 1')
		if(initialData?.data?.enrollment_details!=undefined){
			console.log('in 2')
			handleSaveNext(formValue);
		}

		setFormValue(formValue)
	}, [JSON.stringify(formValue)]);

	return (
		<>
			<Formik
				initialValues={initialValues}
				validationSchema={getValidationSchema(
					formValue.employment_status,
					formValue.not_working
				)}
				validateOnChange={true}
				enableReinitialize={true}

			>
				{(formik) => (
					<Form className="complete-hidden-scroll-style flex flex-grow flex-col overflow-y-auto">
						{/* Self Employed */}
						<Radio
							key="employment_status"
							label={<>{t('occupation_details_form.employment_status_label')} <span className='text-red-500'>*</span></>}
							name="employment_status"
							id="employment_status"
							radioData={[
								{ id: 'self_employed', value: 'self_employed', label: t('occupation_details_form.employment_types.self_employed') },
								{ id: 'salaried', value: 'salaried', label: t('occupation_details_form.employment_types.salaried') },
								{ id: 'not_working', value: 'not_working', label: t('occupation_details_form.employment_types.not_working') },
							]}
							value={formik.values.employment_status}
							onChange={(e) => {
								formik.handleChange(e);
								setFormValue({ ...formValue, employment_status: e.target.value });
							}}
							formik={formik}
						/>
						<ErrorMessage
							name="employment_status"
							component="div"
							className="text-red-500"
						/>
						{
							formik.values.employment_status === 'self_employed' && (<>
							<InputField
									key="name_of_the_current_organization"
									label={`${t('occupation_details_form.organization_details.current')}`}
									name="name_of_the_current_organization"
									id="name_of_the_current_organization"
									placeholder="Enter"
									value={
										formik.values.name_of_the_current_organization
									}
									onChange={(e) => {
										formik.handleChange(e);
										setFormValue({
											...formValue,
											name_of_the_current_organization:
												e.target.value,
										});
									}}
									onBlur={formik.handleBlur}
								/>
							</>)
						}
						{/* {
							formik.values.employment_status === 'not_working' && (<>
							<InputField
									key="name_of_the_last_organization_with_address"
									label="Name of the Last Organization with Address"
									name="name_of_the_last_organization_with_address"
									id="name_of_the_last_organization_with_address"
									placeholder="Enter"
									value={
										formik.values.name_of_the_last_organization_with_address
									}
									onChange={(e) => {
										formik.handleChange(e);
										setFormValue({
											...formValue,
											name_of_the_last_organization_with_address:
												e.target.value,
										});
									}}
									onBlur={formik.handleBlur}
								/>
							</>)
						} */}

						{formik.values.employment_status === 'salaried' && (
							<>
								<Radio
									key="semi_government"
									label={<>{t('occupation_details_form.employment_sector.semi_government')} <span className='text-red-500'>*</span></>}
									name="semi_government"
									id="semi_government"
									radioData={[
										{ id: 'yes1', value: 'yes', label: t('yes') },
										{ id: 'no1', value: 'no', label: t('no') },
									]}
									value={formik.values.semi_government}
									onChange={(e) => {
										formik.handleChange(e);
										// setFormValue({
										// 	...formValue,
										// 	semi_government: e.target.value,
										// });
										if (e.target.value === 'yes') {
											// Automatically set the other options to 'no'
											formik.setFieldValue("private", "no");
											formik.setFieldValue("service_government", "no");
											setFormValue({
												...formValue,
												service_government: 'no',
												semi_government: 'yes',
												private: 'no',
											});
										}else{
											if(formik.values.private==='no' && formik.values.service_government==='no'){
												formik.setFieldValue("service_government", "yes");
											}
											setFormValue({
												...formValue,
												service_government: 'yes',
												semi_government: 'no',
												private: 'no',
											});
										}
										
									}}
									formik={formik}
								/>
								<ErrorMessage
									name="semi_government"
									component="div"
									className="text-red-500"
								/>

								<Radio
									key="private"
									label={<>{t('occupation_details_form.employment_sector.private')} <span className='text-red-500'>*</span></>}
									name="private"
									id="private"
									radioData={[
										{ id: 'yes2', value: 'yes', label: t('yes') },
										{ id: 'no2', value: 'no', label: t('no') },
									]}
									value={formik.values.private}
									onChange={(e) => {
										formik.handleChange(e);
										// setFormValue({ ...formValue, private: e.target.value });
										if (e.target.value === 'yes') {
											// Automatically set the other options to 'no'
											formik.setFieldValue("semi_government", "no");
											formik.setFieldValue("service_government", "no");
											setFormValue({
												...formValue,
												service_government: 'no',
												semi_government: 'no',
												private: 'yes',
											});
										}else{
											if(formik.values.semi_government==='no' && formik.values.service_government==='no'){
												formik.setFieldValue("semi_government", "yes");
											}
											setFormValue({
												...formValue,
												service_government: 'no',
												semi_government: 'yes',
												private: 'no',
											});
										}
										// setFormValue({
										// 	...formValue,
										// 	service_government: formik.values.service_government,
										// 	semi_government: formik.values.semi_government,
										// 	private: formik.values.private,
										// });
									}}
									formik={formik}
								/>
								<ErrorMessage
									name="private"
									component="div"
									className="text-red-500"
								/>

								<Radio
									key="service_government"
									label={<>{t('occupation_details_form.employment_sector.service_government')} <span className='text-red-500'>*</span></>}
									name="service_government"
									id="service_government"
									radioData={[
										{ id: 'yes3', value: 'yes', label: t('yes') },
										{ id: 'no3', value: 'no', label: t('no') },
									]}
									value={formik.values.service_government}
									onChange={(e) => {
										formik.handleChange(e);
										// setFormValue({
										// 	...formValue,
										// 	service_government: e.target.value,
										// });
										if (e.target.value === 'yes') {
											// Automatically set the other options to 'no'
											formik.setFieldValue("semi_government", "no");
											formik.setFieldValue("private", "no");
											setFormValue({
												...formValue,
												service_government: 'yes',
												semi_government: 'no',
												private: 'no',
											});
										}else{
											if(formik.values.semi_government==='no' && formik.values.private==='no'){
												formik.setFieldValue("semi_government", "yes");
											}
											setFormValue({
												...formValue,
												service_government: 'no',
												semi_government: 'yes',
												private: 'no',
											});
										}
										// setFormValue({
										// 	...formValue,
										// 	service_government: formik.values.service_government,
										// 	semi_government: formik.values.semi_government,
										// 	private: formik.values.private,
										// });
									}}
									formik={formik}
								/>
								<ErrorMessage
									name="service_government"
									component="div"
									className="text-red-500"
								/>

								<InputField
									key="name_of_the_last_organization_with_address"
									label={`${t('occupation_details_form.organization_details.last')}`}
									name="name_of_the_last_organization_with_address"
									id="name_of_the_last_organization_with_address"
									placeholder="Enter"
									value={
										formik.values.name_of_the_last_organization_with_address
									}
									onChange={(e) => {
										formik.handleChange(e);
										setFormValue({
											...formValue,
											name_of_the_last_organization_with_address:
												e.target.value,
										});
									}}
									onBlur={formik.handleBlur}
								/>
								<ErrorMessage
									name="name_of_the_last_organization_with_address"
									component="div"
									className="text-red-500"
								/>
							</>
						)}
					</Form>
				)}
			</Formik>
		</>
	);
}

export default OccupationDetailsForm;
