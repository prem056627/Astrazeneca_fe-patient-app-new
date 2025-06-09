import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputField from '../../../../components/Form/InputField';
import SelectField from '../../../../components/Form/SelectField';
import FormDatePicker from '../../../../components/Form/FormDatePicker';
import { get } from 'lodash';
import moment from 'moment';
import { ReactComponent as NextDownChevron } from '../../../../assets/images/svg/NextDownChevron.svg';
import { useDispatch, useSelector } from 'react-redux';
import {
	addPersonalDetails,
	selectInitializeData,
	selectPatientDetails,
	setPatientDetails,
} from '../../../slice';
import { useTranslation } from 'react-i18next';

const genderOptions = [
	{ id: 'male', label: 'Male' },
	{ id: 'female', label: 'Female' },
	{ id: 'other', label: 'Other' },
];

export default function PersonalDetailsForm({ setStep, closeAccordion }) {
	const initialData = useSelector(selectInitializeData);
	const { t } = useTranslation()
	const patient_details = useSelector(selectPatientDetails);

	const initialValues =
		'enrollment_details' in initialData?.data
			? {
					full_name:
						initialData?.data?.enrollment_details?.step_data?.patient_details
							?.full_name || '',
					gender:
						initialData?.data?.enrollment_details?.step_data?.patient_details?.gender?.toLowerCase() ||
						'',
					email:
						initialData?.data?.enrollment_details?.step_data?.patient_details
							?.email || '',
					date_of_birth:
						moment(
							initialData?.data?.enrollment_details?.step_data?.patient_details
								?.date_of_birth,
							'DD-MM-YYYY'
						).format('DD/MM/YYYY') || '',
					mobile_number:
						Number(
							initialData?.data?.enrollment_details?.step_data?.patient_details?.mobile_number.slice(
								3
							)
						) || '',
					alter_mobile: '',
					nationality:
						initialData?.data?.enrollment_details?.step_data?.patient_details
							?.nationality || '',
			  }
			: {
					full_name: initialData?.data?.patient_name || '',
					gender: initialData?.data?.patient_gender?.toLowerCase() || '',
					email: initialData?.data?.patient_email || '',
					date_of_birth:
						moment(initialData?.data?.patient_dob, 'DD-MM-YYYY').format(
							'DD/MM/YYYY'
						) || '',
					mobile_number:
						Number(initialData?.data?.patient_primary_phone?.slice(3)) || '',
					alter_mobile: '',
					nationality: initialData?.data?.patient_nationality || '',
			  };

	const dispatch = useDispatch();

	const validationSchema = Yup.object({
		full_name: Yup.string().required('Required'),
		mobile_number: Yup.string()
			.required('Required')
			.matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits'),
		alter_mobile: Yup.string()
			.min(10, 'The field must contain a minimum of 10 digits')
			.max(10, 'The field must contain a maximum of 10 digits')
			.matches(
				/^[0-9]{10}$/,
				'Alternate mobile number must be exactly 10 digits'
			),
		email: Yup.string().email('Invalid email format').required('Required'),
		gender: Yup.string().required('Required'),
		nationality: Yup.string().required('Required'),
	});

	const handleCloseAccordion = () => {
		closeAccordion();
	};

	const onSubmit = (values) => {
		console.log('{ ...patient_details, ...values }', {
			...patient_details,
			...values,
		});
		
		dispatch(setPatientDetails({ ...patient_details, ...values }));
		dispatch(addPersonalDetails(values));
		setStep(2);
		handleCloseAccordion();
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
							label={<>{t('personal_details_form.full_name')} <span className='text-red-500'>*</span></>}
							name="full_name"
							id="full_name"
							placeholder="Enter"
							disabled
							value={formik.values.full_name}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>

						<SelectField
							key="gender"
							label={<>{t('personal_details_form.gender')} <span className='text-red-500'>*</span></>}
							name="gender"
							id="gender"
							formik={formik}
							placeholder="Select"
							value={formik.values.gender}
							optionsDataName="gender"
							optionsData={genderOptions}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							disabled={true}
						/>

						<FormDatePicker
							key="date_of_birth"
							label={<>{t('personal_details_form.date_of_birth')} <span className='text-red-500'>*</span></>}
							name="date_of_birth"
							id="date_of_birth"
							placeholder="DD/MM/YYYY"
							value={get(formik.values, 'date_of_birth', '')}
							onChange={formik.handleChange}
							formik={formik}
							min={moment().subtract(200, 'years')}
							max={moment()}
							disabled={true}
							className="flex grow rounded-md border border-[#D5D5D5] bg-black px-[16px] py-[14px] font-lato placeholder:text-[#9A9A9A] hover:outline-0 focus:outline-0"
						/>

						<div className="flex flex-col gap-[4px] ">
							<label
								htmlFor="mobile_number"
								className="font-open-sans text-form-xs font-semibold text-[#595454]"
							>
								{t('personal_details_form.mobile_number')} <span className='text-red-500'>*</span>
							</label>
							<div className="flex gap-[12px] rounded-md border border-[#ACA9A9] bg-[#f2f2f2] px-[12px] py-[14px]">
								<span className="font-open-sans text-[#6C747D]">+91</span>
								<input
									id="mobile_number"
									name="mobile_number"
									type="number"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.mobile_number}
									disabled
									className="h-full w-full font-open-sans font-semibold text-[#283A46] placeholder:text-[#9A9A9A] hover:outline-0 focus:outline-0 disabled:bg-[#f2f2f2]"
									placeholder="0000000000"
								/>
							</div>
							{formik.touched.mobile_number && formik.errors.mobile_number ? (
								<div className="font-open-sans text-form-xs text-[#cc3300]">
									{formik.errors.mobile_number}
								</div>
							) : null}
						</div>

						<div className="flex flex-col gap-[4px] ">
							<label
								htmlFor="alter_mobile"
								className="font-open-sans text-form-xs font-semibold text-[#595454]"
							>
								{t('personal_details_form.alternate_mobile_number')}
							</label>
							<div className="flex gap-[12px] rounded-md border border-[#ACA9A9] pl-[12px] pr-[2px] ">
								<span className="py-[14px] font-open-sans text-[#6C747D]">
									+91
								</span>
								<input
									id="alter_mobile"
									name="alter_mobile"
									type="tel"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.alter_mobile}
									className="h-full w-full py-[14px] font-open-sans font-semibold text-[#283A46] placeholder:text-[#9A9A9A]  hover:outline-0 focus:outline-0"
									placeholder="0000000000"
								/>
							</div>
							{formik.touched.alter_mobile && formik.errors.alter_mobile ? (
								<div className="font-open-sans text-form-xs text-[#cc3300]">
									{formik.errors.alter_mobile}
								</div>
							) : null}
						</div>

						<InputField
							key="email"
							label={<>{t('personal_details_form.email')} <span className='text-red-500'>*</span></>}
							name="email"
							id="email"
							placeholder="john.doe@xyz.com"
							disabled={true}
							value={formik.values.email}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>

						<SelectField
							formik={formik}
							key="nationality"
							label={<>{t('personal_details_form.nationality')} <span className='text-red-500'>*</span></>}
							name="nationality"
							id="nationality"
							placeholder="Select"
							value={formik.values.nationality}
							optionsDataName="nationality"
							optionsData={
								'enrollment_details' in initialData?.data
									? initialData?.data?.dropdown_options?.countries
									: initialData?.data?.countries || []
							}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							disabled={true}
						/>
						{console.log('data', initialData?.data?.countries)}
					</div>
					<div className="sticky bottom-0 flex flex-col gap-[8px] bg-[#ffffff] pt-[24px] font-lato text-[#696969]">
						<button
							type="submit"
							className="flex w-full items-center justify-end  px-[16px] py-[14px] font-lato text-[14px] font-bold leading-[20px] text-white disabled:opacity-[0.38]"
							disabled={!formik.isValid}
						>
							<div className="flex items-center justify-center gap-4 text-primary">
								<NextDownChevron />
								<span className="text-base font-bold">{t('address_proof_form.buttons.next')}</span>
							</div>
						</button>
					</div>
				</Form>
			)}
		</Formik>
	);
}
