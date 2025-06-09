import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputField from '../../../../components/Form/InputField';
import SelectField from '../../../../components/Form/SelectField';
import { ReactComponent as NextDownChevron } from '../../../../assets/images/svg/NextDownChevron.svg';
import CheckboxField from '../../../../components/Form/CheckBok';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
	addCurrentResidentialAddress,
	selectInitializeData,
	selectPatientDetails,
	setPatientDetails,
	setAddressInputDisabled,
	selectIsAddressInputDisabled,
	setCurrAddressFormValid,
} from '../../../slice';

function CurrentResidentialAddressForm({ setStep, closeAccordion }) {
	const initialData = useSelector(selectInitializeData);
	const patient_details = useSelector(selectPatientDetails);
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const isAddressDisabled = useSelector(selectIsAddressInputDisabled);

	const initialValues = initialData?.data?.enrollment_details?.step_data?.current_residence
				?.isAddressSameAsAboveAddress ? {
			current_address_line_1: patient_details?.address_line_1 || '',
			current_address_line_2: patient_details?.address_line_2 || '',
			current_city: patient_details?.city || '',
			current_state: patient_details?.state || '',
			current_pin_code: patient_details?.pin_code || '',
			isAddressSameAsAboveAddress: true,
		} : {
		current_address_line_1:
			initialData?.data?.enrollment_details?.step_data?.current_residence
				?.address_line_1 || '',
		current_address_line_2:
			initialData?.data?.enrollment_details?.step_data?.current_residence
				?.address_line_2 || '',
		current_city:
			initialData?.data?.enrollment_details?.step_data?.current_residence
				?.city || '',
		current_state:
			Number(
				initialData?.data?.enrollment_details?.step_data?.current_residence
					?.state
			) || '',
		current_pin_code:
			initialData?.data?.enrollment_details?.step_data?.current_residence
				?.pin_code || '',
		isAddressSameAsAboveAddress:
			initialData?.data?.enrollment_details?.step_data?.current_residence
				?.isAddressSameAsAboveAddress || false,
	};

	const validationSchema = Yup.object({
		current_address_line_1: Yup.string().required(t('current_residential_address_form.validation.required')),
		current_city: Yup.string().required(t('current_residential_address_form.validation.required')),
		current_state: Yup.string().required(t('current_residential_address_form.validation.required')),
		current_pin_code: Yup.string()
			.min(6, t('current_residential_address_form.validation.pin_code.min'))
			.max(6, t('current_residential_address_form.validation.pin_code.max'))
			.required(t('current_residential_address_form.validation.required')),
	});

	const handleCloseAccordion = () => {
		closeAccordion();
	};

	const onSubmit = (values) => {
		console.log('values', values);
		dispatch(setPatientDetails({ ...patient_details, ...values }));
		dispatch(addCurrentResidentialAddress(values));
		dispatch(setCurrAddressFormValid(true));
		setStep(4); // Move to next step
		handleCloseAccordion();
	};

	const handleAddressCheckboxChange = (checked, formik) => {
		console.log('if checkeddd', checked);
		dispatch(setAddressInputDisabled(checked));
		dispatch(
			addCurrentResidentialAddress({
				current_address_line_1: patient_details?.address_line_1 || '',
				current_address_line_2: patient_details?.address_line_2 || '',
				current_city: patient_details?.city || '',
				current_state: patient_details?.state || '',
				current_pin_code: patient_details?.pin_code || '',
				isAddressSameAsAboveAddress: true,
			})
		);
		
		if (checked) {
			formik.setValues({
				current_address_line_1: patient_details?.address_line_1 || '',
				current_address_line_2: patient_details?.address_line_2 || '',
				current_city: patient_details?.city || '',
				current_state: patient_details?.state || '',
				current_pin_code: patient_details?.pin_code || '',
				isAddressSameAsAboveAddress:  true,
			});
			// setDisableInput(true)
			// console.log('haha', isAddressDisabled)
			// dispatch(setAddressInputDisabled(true));

		} else {
			// Reset the form values when the checkbox is unchecked
			formik.setValues({
				current_address_line_1:  '',
				current_address_line_2: '',
				current_city:  '',
				current_state: '',
				current_pin_code:  '',
				isAddressSameAsAboveAddress: false,
			});
			// formik.resetForm();
			// setDisableInput(false)
			// console.log('hah', isAddressDisabled)
			// dispatch(setAddressInputDisabled(false));
		}
	};

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={onSubmit}
		>
			{(formik) => {
				!formik.isValid && dispatch(setCurrAddressFormValid(false));
				return (
				<Form className="complete-hidden-scroll-style mx-6 flex flex-grow flex-col gap-4 overflow-y-auto">
					<CheckboxField
						key="isAddressSameAsAboveAddress"
						label={
							<p className="font-open-sans font-bold leading-5 text-[#3B3B3B]">
								{t('current_residential_address_form.same_as_above_address')}
							</p>
						}
						name="isAddressSameAsAboveAddress"
						id="isAddressSameAsAadhar"
						value={formik.values.isAddressSameAsAboveAddress}
						onChange={(e) => {
							const checked = e.target.checked;
							
							formik.setFieldValue('isAddressSameAsAboveAddress', checked);
							handleAddressCheckboxChange(checked, formik);
						}}
						formik={formik}
					/>

					<InputField
						key="current_address_line_1"
						label={<>{t('current_residential_address_form.address_line_1')} <span className='text-red-500'>*</span></>}
						name="current_address_line_1"
						id="current_address_line_1"
						placeholder={t('current_residential_address_form.placeholders.address_line_1')}
						value={formik.values.current_address_line_1}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						disabled={isAddressDisabled}
					/>

					<InputField
						key="current_address_line_2"
						label={t('current_residential_address_form.address_line_2')}
						name="current_address_line_2"
						id="current_address_line_2"
						placeholder={t('current_residential_address_form.placeholders.address_line_2')}
						value={formik.values.current_address_line_2}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						disabled={isAddressDisabled}
					/>

					<InputField
						key="current_city"
						label={<>{t('current_residential_address_form.city')} <span className='text-red-500'>*</span></>}
						name="current_city"
						id="current_city"
						placeholder={t('current_residential_address_form.placeholders.city')}
						value={formik.values.current_city}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						disabled={isAddressDisabled}
					/>

					<SelectField
						key="current_state"
						label={<>{t('current_residential_address_form.state')} <span className='text-red-500'>*</span></>}
						name="current_state"
						id="current_state"
						formik={formik}
						placeholder={t('current_residential_address_form.placeholders.state')}
						value={formik.values.current_state}
						optionsDataName="State"
						optionsData={
							'enrollment_details' in initialData?.data
								? initialData?.data?.dropdown_options?.states
								: initialData?.data?.states
						}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						disabled={isAddressDisabled}
					/>

					<InputField
						key="current_pin_code"
						label={<>{t('current_residential_address_form.pin_code')} <span className='text-red-500'>*</span></>}
						name="current_pin_code"
						id="current_pin_code"
						type='number'
						placeholder={t('current_residential_address_form.placeholders.pin_code')}
						value={formik.values.current_pin_code}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						disabled={isAddressDisabled}
					/>

					<div className="sticky bottom-0 flex flex-col gap-[8px] bg-[#ffffff] pt-[24px] font-lato text-[#696969]">
						<button
							type="submit"
							className="flex w-full items-center justify-end px-[16px] py-[14px] font-lato text-[14px] font-bold leading-[20px] text-white disabled:opacity-[0.38]"
							disabled={!formik.isValid}
						>
							<div className="flex items-center justify-center gap-4 text-primary">
								<NextDownChevron />
								<span className="text-base font-bold">{t('current_residential_address_form.buttons.next')}</span>
							</div>
						</button>
					</div>
				</Form>
			)}}
		</Formik>
	);
}

export default CurrentResidentialAddressForm;
