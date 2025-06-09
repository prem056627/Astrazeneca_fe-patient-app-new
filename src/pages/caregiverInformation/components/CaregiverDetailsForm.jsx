import React, { useEffect } from 'react';
import InputField from '../../../components/Form/InputField';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import SelectField from '../../../components/Form/SelectField';
import { ReactComponent as NextDownChevron } from '../../../assets/images/svg/NextDownChevron.svg';
import { useDispatch, useSelector } from 'react-redux';
import {
	addCareGiverDetails,
	selectInitializeData,
	selectCaregiverDetails,
	setCaregiverDetails,
} from '../../slice/index';
import { transformToPatientEnrollmentDetailsFormData } from '../../../utils/forms';
import useApi from '../../../hooks/useApi';
import { useTranslation } from 'react-i18next';

function CaregiverDetailsForm({ setStep, closeAccordion }) {
	const { t } = useTranslation();
	const triggerApi = useApi();
	const dispatch = useDispatch();
	const initialData = useSelector(selectInitializeData);
	const caregiver_details = useSelector(selectCaregiverDetails);

	const genderOptions = [
		{ id: 'male', label: t('personal_details_form.gender_options.male') },
		{ id: 'female', label: t('personal_details_form.gender_options.female') },
		{ id: 'other', label: t('personal_details_form.gender_options.other') },
	];

	const initialValues = {
		full_name:
			initialData?.data?.enrollment_details?.step_data?.caregiver_details
				?.full_name || '',
		gender:
			initialData?.data?.enrollment_details?.step_data?.caregiver_details?.gender?.toLowerCase() ||
			'',
		mobile_number:
			initialData?.data?.enrollment_details?.step_data?.caregiver_details
				?.mobile_number || '',
		email:
			initialData?.data?.enrollment_details?.step_data?.caregiver_details
				?.email || '',
	};

	useEffect(() => {
		dispatch(addCareGiverDetails(initialValues));
	}, []);

	const validationSchema = Yup.object({
		full_name: Yup.string(),
		gender: Yup.string(),
		mobile_number: Yup.string()
			.min(10, t('caregiver_details_form.validation.mobile_min'))
			.max(10, t('caregiver_details_form.validation.mobile_max')),
		email: Yup.string().email(t('caregiver_details_form.validation.email_invalid'))
	});

	const handleCloseAccordion = () => {
		closeAccordion();
	};

	const onSubmit = (values) => {
		dispatch(setCaregiverDetails({ ...caregiver_details, ...values }));
		dispatch(addCareGiverDetails(values));
		handleCloseAccordion();
		setStep(2);
	};

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={onSubmit}
		>
			{(formik) => (
				<Form
					className="complete-hidden-scroll-style flex grow flex-col gap-4 overflow-y-auto"
					onSubmit={formik.handleSubmit}
				>
					<div className="flex grow flex-col gap-[16px] ">
						<InputField
							key="full_name"
							label={t('caregiver_details_form.full_name')}
							name="full_name"
							id="full_name"
							placeholder={t('caregiver_details_form.placeholder.full_name')}
							value={formik.values.full_name}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>

						<SelectField
							key="gender"
							label={t('caregiver_details_form.gender')}
							name="gender"
							id="gender"
							formik={formik}
							placeholder={t('caregiver_details_form.placeholder.gender')}
							value={formik.values.gender}
							optionsDataName="gender"
							optionsData={genderOptions}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>

						<div className="flex flex-col gap-[4px] ">
							<label
								htmlFor="mobile_number"
								className="font-open-sans text-form-xs font-semibold text-[#595454]"
							>
								{t('caregiver_details_form.mobile_number')}
							</label>
							<div className="flex gap-[12px] rounded-md border border-[#ACA9A9] pl-[12px] pr-[2px]">
								<span className="py-[14px] font-open-sans text-[#6C747D]">
									{t('caregiver_details_form.country_code')}
								</span>
								<input
									id="mobile_number"
									name="mobile_number"
									type="number"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.mobile_number}
									className="h-full w-full py-[14px] font-open-sans rounded placeholder:text-[#9A9A9A] hover:outline-0 focus:outline-0"
									placeholder={t('caregiver_details_form.placeholder.mobile_number')}
								/>
							</div>
							{formik.touched.mobile_number && formik.errors.mobile_number ? (
								<div className="font-open-sans text-form-xs text-[#cc3300]">
									{formik.errors.mobile_number}
								</div>
							) : null}
						</div>

						<InputField
							key="email"
							label={t('caregiver_details_form.email')}
							name="email"
							id="email"
							placeholder={t('caregiver_details_form.placeholder.email')}
							value={formik.values.email}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
					</div>

					<div className="sticky bottom-0 flex flex-col gap-[8px] bg-[#ffffff] pt-[24px] font-lato text-[#696969]">
						<button
							type="submit"
							className="flex w-full items-center justify-end px-[16px] py-[14px] font-lato text-[14px] font-bold leading-[20px] text-white disabled:opacity-[0.38]"
							disabled={!formik.isValid}
						>
							<div className="flex items-center justify-center gap-4 text-primary">
								<NextDownChevron />
								<span className="text-base font-bold ">{t('caregiver_details_form.next')}</span>
							</div>
						</button>
					</div>
				</Form>
			)}
		</Formik>
	);
}

export default CaregiverDetailsForm;
