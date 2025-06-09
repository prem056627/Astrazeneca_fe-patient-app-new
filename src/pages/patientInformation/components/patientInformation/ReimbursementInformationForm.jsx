import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { get } from 'lodash';
import Radio from '../../../../components/Form/Radio';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as Warning } from '../../../../assets/images/svg/Warning.svg';
import { ReactComponent as NextDownChevron } from '../../../../assets/images/svg/NextDownChevron.svg';
import {
	isProfileDetailsDataSubmited,
	IsReimbursementFormSubmited,
	selectPatientDetails,
	setPatientDetails,
	selectInitializeData,
	addReimbursementForm,
} from '../../../slice';
import InputField from '../../../../components/Form/InputField';
import { useTranslation } from 'react-i18next';

function ReimbursementInformationForm({ setStep, closeAccordion }) {
	const dispatch = useDispatch();
	const [formValue, setFormValue] = useState({})
	const patient_details = useSelector(selectPatientDetails);
	const initialData = useSelector(selectInitializeData);
	const { t } = useTranslation();

	// Set initial form values from redux or set defaults
	const initialValues = {
		has_reimbursement:
			initialData?.data?.enrollment_details?.step_data?.reimbursement_info
				?.has_reimbursement || '',
		reimbursement_limits:
			initialData?.data?.enrollment_details?.step_data?.reimbursement_info
				?.reimbursement_limits || '',
		reimbursement_type:
			initialData?.data?.enrollment_details?.step_data?.reimbursement_info
				?.reimbursement_type || '',
		// reimbursement_mount: '',
		is_opdyta:
			initialData?.data?.enrollment_details?.step_data?.reimbursement_info
				?.is_opdyta || '',
	};

	const validationSchema = Yup.object().shape({
		has_reimbursement: Yup.string().required('Please select an option'),
		reimbursement_limits: Yup.string().when('has_reimbursement', {
			is: 'yes',
			then: Yup.string().required(
				'Please answer the question about reimbursement limits'
			),
			otherwise: Yup.string().nullable(),
		}),
		reimbursement_type: Yup.string().when('reimbursement_limits', {
			is: 'yes',
			then: Yup.string().required('Please select your reimbursement type'),
			otherwise: Yup.string().nullable(),
		}),
		// reimbursement_mount: Yup.string().when('reimbursement_limits', {
		// 	is: 'yes',
		// 	then: Yup.string().required('Please specify details'),
		// 	otherwise: Yup.string().nullable(),
		// }),
		// is_opdyta: Yup.string().when('reimbursement_limits', {
		// 	is: 'yes',
		// 	then: Yup.string().required('Please select'),
		// 	otherwise: Yup.string().nullable(),
		// }),
	});

	const handleCloseAccordion = () => {
		closeAccordion();
	};

	const handleSaveNext = (data) => {

		if (data.has_reimbursement == 'no') {
			dispatch(isProfileDetailsDataSubmited(true));
			setFormValue({has_reimbursement: data.has_reimbursement})
			dispatch(
				setPatientDetails({
					...patient_details,
					has_reimbursement: data.has_reimbursement,
				})
			);
		} else if (data.has_reimbursement == 'yes' && data.reimbursement_limits == 'no') {
			dispatch(isProfileDetailsDataSubmited(true));
			setFormValue({
				has_reimbursement: data.has_reimbursement,
				reimbursement_limits: data.reimbursement_limits,
			});
			dispatch(
				setPatientDetails({
					...patient_details,
					has_reimbursement: data.has_reimbursement,
					reimbursement_limits: data.reimbursement_limits,
				})
			);
		} else if (data.has_reimbursement == 'yes' && data.reimbursement_limits == 'yes') {
			if (
				// data.reimbursement_mount && 
				data.reimbursement_type) {
				dispatch(isProfileDetailsDataSubmited(true));
				dispatch(
					setPatientDetails({
						...patient_details,
						...data,
					})
				);
			} else {
				dispatch(isProfileDetailsDataSubmited(false));
			}
		} else {
			dispatch(isProfileDetailsDataSubmited(false));
		}
			// Dispatch the form validity to the redux store
	};

	const onSubmit = (values) => {
		console.log('Final Form Values on Submit:', formValue);

		dispatch(IsReimbursementFormSubmited(true));
		handleFormSubmit(formValue);
	};

	const handleFormSubmit = (values) => {
		dispatch(setPatientDetails({ ...patient_details, ...values }));
		dispatch(addReimbursementForm(values));
		setStep(5);
		handleCloseAccordion();
	};

	useEffect(() => {
		handleSaveNext(formValue);
		console.log('formValue', formValue);
	}, [JSON.stringify(formValue)]);
	
	

	return (
		<>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={onSubmit}
				validateOnChange={true}
				enableReinitialize={true}
			>
				{(formik) => (
					<Form className="complete-hidden-scroll-style flex flex-grow flex-col overflow-y-auto">
						{/* Reimbursement Question */}
						<Radio
							key="has_reimbursement"
							label={<>{t('reimbursement_information_form.has_reimbursement_label')} <span className='text-red-500'>*</span></>}
							name="has_reimbursement"
							id="has_reimbursement"
							radioData={[
								{ id: 'yes', value: 'yes', label: t('yes') },
								{ id: 'no', value: 'no', label: t('no') },
							]}
							value={formik.values.has_reimbursement}
							onChange={(e) => {
								formik.handleChange(e);
								if (e.target.value == 'no') {
									formik.setFieldValue('reimbursement_limits', '');
									// formik.setFieldValue('reimbursement_mount', '');
									formik.setFieldValue('reimbursement_type', '');
								}
								setFormValue({
									...formValue,
									has_reimbursement: e.target.value,
								});
							}}
							formik={formik}
						/>
						<ErrorMessage
							name="has_reimbursement"
							component="div"
							className="text-red-500"
						/>

						{formik.values.has_reimbursement === 'yes' && (
							<div>
								{/* Reimbursement Limits Question */}
								<Radio
									key="reimbursement_limits"
									label={<>{t('reimbursement_information_form.reimbursement_limits_label')} <span className='text-red-500'>*</span></>}
									name="reimbursement_limits"
									id="reimbursement_limits"
									radioData={[
										{ id: 'aware_yes', value: 'yes', label: t('yes') },
										{ id: 'aware_no', value: 'no', label: t('no') },
									]}
									value={formik.values.reimbursement_limits}
									onChange={(e) => {
										formik.handleChange(e);
										if (e.target.value == 'no') {
											// formik.setFieldValue('reimbursement_mount', '');
											formik.setFieldValue('reimbursement_type', '');
										}
										setFormValue({
											...formValue,
											reimbursement_limits: e.target.value,
										});
									}}
									formik={formik}
								/>
								<ErrorMessage
									name="reimbursement_limits"
									component="div"
									className="text-red-500"
								/>

								{formik.values.reimbursement_limits === 'yes' && (
									<>
										<div className="flex flex-col gap-2">
											{/* <label
												className="pb-2 font-open-sans text-form-md text-[#283A46]"
												htmlFor="reimbursement_mount"
											>
												Limit of Reimbursement
											</label>

											<InputField
												key="reimbursement_mount"
												name="reimbursement_mount"
												id="reimbursement_mount"
												placeholder="Enter"
												type="number"
												value={formik.values.reimbursement_mount}
												onChange={(e) => {
													formik.handleChange(e);
													setFormValue({
														...formValue,
														reimbursement_mount: e.target.value,
													});
												}}
												onBlur={formik.handleBlur}
											/>
											<ErrorMessage
												name="reimbursement_mount"
												component="div"
												className="text-red-500"
											/> */}

											<Radio
												key="reimbursement_type"
												label={<>{t('reimbursement_information_form.reimbursement_type_label')} <span className='text-red-500'>*</span></>}
												name="reimbursement_type"
												id="reimbursement_type"
												radioData={[
													{
														id: 'government',
														value: 'Government',
														label: `${t('reimbursement_information_form.government')}`,
													},
													{ id: 'private', value: 'Private', label: `${t('reimbursement_information_form.private')}` },
													{ id: 'others', value: 'Others', label: `${t('reimbursement_information_form.others')}` },
												]}
												value={formik.values.reimbursement_type}
												onChange={(e) => {
													formik.handleChange(e);
													setFormValue({
														...formValue,
														reimbursement_type: e.target.value,
													});
												}}
												formik={formik}
											/>
											<ErrorMessage
												name="reimbursement_type"
												component="div"
												className="text-red-500"
											/>
											<Radio
												key="is_opdyta"
												label={<>{initialData?.data?.program_name == 'Opdyta' ? t('reimbursement_information_form.is_opdyta_label'):t('reimbursement_information_form.is_rojuzda_label')} <span className='text-red-500'>*</span></>}
												name="is_opdyta"
												id="is_opdyta"
												radioData={[
													{ id: 'OPDYTA_yes', value: 'yes', label: t('yes') },
													{ id: 'OPDYTA_no', value: 'no', label: t('no') },
												]}
												value={formik.values.is_opdyta}
												onChange={(e) => {
													formik.handleChange(e);

													setFormValue({
														...formValue,
														is_opdyta: e.target.value,
													});
												}}
												formik={formik}
											/>
											<ErrorMessage
												name="is_opdyta"
												component="div"
												className="text-red-500"
											/>
											<p className="text-xs">
												{t('reimbursement_information_form.opdyta_note')}
												{/* If not covered for reimbursement a letter or an email
												from the governing authority would be required along
												with Policy copy that has exclusions listed */}
											</p>
										</div>
									</>
								)}

								{formik.values.reimbursement_limits === 'no' && (
									<div className="flex items-center justify-start gap-4 rounded bg-[#FFEFD4] p-4">
										<Warning className="h-7 w-7" />
										<p className="text-[#BD7701]">
										{t('reimbursement_information_form.oasis_help')}
											{/* Kindly Contact oasis help center */}
										</p>
									</div>
								)}
							</div>
						)}
						<div className="sticky bottom-0 flex flex-col gap-[8px] bg-[#ffffff] pt-[24px] font-lato text-[#696969]">
							<button
								type="submit"
								className="flex w-full items-center justify-end  px-[16px] py-[14px] font-lato text-[14px] font-bold leading-[20px] text-white disabled:opacity-[0.38]"
								disabled={!formik.isValid || !formik.values.has_reimbursement || (formik.values.has_reimbursement === 'yes' && !formik.values.reimbursement_limits) || (formik.values.has_reimbursement === 'yes' && formik.values.reimbursement_limits === 'yes' && !formik.values.reimbursement_type)}
							>
								<div className="flex items-center justify-center gap-4 text-primary">
									<NextDownChevron />
									<span className="text-base font-bold">{t('reimbursement_information_form.buttons.next')}</span>
								</div>
							</button>
						</div>
					</Form>
				)}
			</Formik>
		</>
	);
}

export default ReimbursementInformationForm;
