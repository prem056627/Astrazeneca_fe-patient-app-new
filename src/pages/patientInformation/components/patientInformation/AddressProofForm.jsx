import React, { useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputField from '../../../../components/Form/InputField';
import SelectField from '../../../../components/Form/SelectField';
import { ReactComponent as NextDownChevron } from '../../../../assets/images/svg/NextDownChevron.svg';
import { useDispatch, useSelector } from 'react-redux';
import {
	addAddressProof,
	selectInitializeData,
	selectPatientDetails,
	setPatientDetails,
	setAddressProofFormValid,
} from '../../../slice';
import useApi from '../../../../hooks/useApi';
import { transformToPatientEnrollmentDetailsFormData } from '../../../../utils/forms';
import { useTranslation } from 'react-i18next';

const AddressProofForm = ({ setStep, closeAccordion }) => {
	const dispatch = useDispatch();
	const triggerApi = useApi();
	const { t } = useTranslation();
	const patient_details = useSelector(selectPatientDetails);
	const initialData = useSelector(selectInitializeData);
	const initialValues = {
		address_line_1:
			initialData?.data?.enrollment_details?.step_data?.address_details
				?.address_line_1 || '',
		address_line_2:
			initialData?.data?.enrollment_details?.step_data?.address_details
				?.address_line_2 || '',
		city:
			initialData?.data?.enrollment_details?.step_data?.address_details?.city ||
			'',
		state:
			Number(initialData?.data?.enrollment_details?.step_data?.address_details
				?.state) || '',
		pin_code:
			initialData?.data?.enrollment_details?.step_data?.address_details
				?.pin_code || '',
	};

	const validationSchema = Yup.object({
		address_line_1: Yup.string().required(t('address_proof_form.validation.required')),
		city: Yup.string().required(t('address_proof_form.validation.required')),
		state: Yup.string().required(t('address_proof_form.validation.required')),
		pin_code: Yup.string()
			.min(6, t('address_proof_form.validation.pin_code.min'))
			.max(6, t('address_proof_form.validation.pin_code.max'))
			.required(t('address_proof_form.validation.required')),
	});

	const handleCloseAccordion = () => {
		closeAccordion();
	};

	const onSubmit = (values) => {
		dispatch(setPatientDetails({ ...patient_details, ...values }));
		setStep(3);
		dispatch(addAddressProof(values));
		dispatch(setAddressProofFormValid(true));
		handleCloseAccordion();
	};

	console.log('yes', initialData);

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={onSubmit}
		>
			{(formik) => {
				!formik.isValid && dispatch(setAddressProofFormValid(false));
				return (
				<Form className="complete-hidden-scroll-style flex flex-grow flex-col gap-4 overflow-y-auto">
					<InputField
						key="address_line_1"
						label={<>{t('address_proof_form.address_line_1')} <span className='text-red-500'>*</span></>}
						name="address_line_1"
						id="address_line_1"
						placeholder={t('address_proof_form.placeholders.address_line_1')}
					/>

					<InputField
						key="address_line_2"
						label={t('address_proof_form.address_line_2')}
						name="address_line_2"
						id="address_line_2"
						placeholder={t('address_proof_form.placeholders.address_line_2')}
					/>

					<InputField
						key="city"
						label={<>{t('address_proof_form.city')} <span className='text-red-500'>*</span></>}
						name="city"
						id="city"
						placeholder={t('address_proof_form.placeholders.city')}
					/>

					<SelectField
						key="state"
						label={<>{t('address_proof_form.state')} <span className='text-red-500'>*</span></>}
						name="state"
						id="state"
						formik={formik}
						placeholder={t('address_proof_form.placeholders.state')}
						value={formik.values.state}
						optionsDataName="State"
						optionsData={
							'enrollment_details' in initialData?.data
								? initialData?.data?.dropdown_options?.states
								: initialData?.data?.states
						}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>

					<InputField
						key="pin_code"
						label={<>{t('address_proof_form.pin_code')} <span className='text-red-500'>*</span></>}
						name="pin_code"
						id="pin_code"
						type='number'
						placeholder={t('address_proof_form.placeholders.pin_code')}
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
								<span className="text-base font-bold">{t('address_proof_form.buttons.next')}</span>
							</button>
						</div>
					</div>
				</Form>
			)}}
		</Formik>
	);
};

export default AddressProofForm;
