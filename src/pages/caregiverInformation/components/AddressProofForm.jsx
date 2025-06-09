import React, { useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import SelectField from '../../../components/Form/SelectField';
import { ReactComponent as NextDownChevron } from '../../../assets/images/svg/NextDownChevron.svg';
import InputField from '../../../components/Form/InputField';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
	addCareGiverAddressProof,
	selectInitializeData,
	selectCaregiverDetails,
	setCaregiverDetails,
} from '../../slice/index';
import { transformToPatientEnrollmentDetailsFormData } from '../../../utils/forms';
import useApi from '../../../hooks/useApi';

const AddressProofForm = ({
	setAddressproofsubmited,
	setStep,
	closeAccordion,
}) => {
	const { t } = useTranslation();
	const initialData = useSelector(selectInitializeData);
	const caregiver_details = useSelector(selectCaregiverDetails);
	const dispatch = useDispatch();
	const triggerApi = useApi();

	const initialValues = {
		address_line_1:
			initialData?.data?.enrollment_details?.step_data
				?.caregiver_address_proof?.address_line_1 || '',
		address_line_2:
			initialData?.data?.enrollment_details?.step_data
				?.caregiver_address_proof?.address_line_2 || '',
		city:
			initialData?.data?.enrollment_details?.step_data
				?.caregiver_address_proof?.city || '',
		state:
			Number(initialData?.data?.enrollment_details?.step_data
				?.caregiver_address_proof?.state) || '',
		pin_code:
			initialData?.data?.enrollment_details?.step_data
				?.caregiver_address_proof?.pin_code || '',
	};

	const handleCloseAccordion = () => {
		closeAccordion();
	};

	const validationSchema = Yup.object({
		pin_code: Yup.string()
			.min(6, t('caregiver_address_proof_form.validation.pin_code.min'))
			.max(6, t('caregiver_address_proof_form.validation.pin_code.max'))
	});

	useEffect(()=>{
		dispatch(addCareGiverAddressProof(initialValues));
	},[])

	const onSubmit = (values) => {
		dispatch(setCaregiverDetails({ ...caregiver_details, ...values }));
		dispatch(addCareGiverAddressProof(values));
		setStep(3);
		handleCloseAccordion();
	};

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={onSubmit}
		>
			{(formik) => (
				<Form className="complete-hidden-scroll-style flex flex-grow flex-col gap-4 overflow-y-auto">
					<InputField
						key="address_line_1"
						label={t('caregiver_address_proof_form.address_line_1')}
						name="address_line_1"
						id="address_line_1"
						placeholder={t('caregiver_address_proof_form.placeholders.address_line_1')}
					/>
					<InputField
						key="address_line_2"
						label={t('caregiver_address_proof_form.address_line_2')}
						name="address_line_2"
						id="address_line_2"
						placeholder={t('caregiver_address_proof_form.placeholders.address_line_2')}
					/>

					<InputField
						key="city"
						label={t('caregiver_address_proof_form.city')}
						name="city"
						id="city"
						placeholder={t('caregiver_address_proof_form.placeholders.city')}
					/>

					<SelectField
						key="state"
						label={t('caregiver_address_proof_form.state')}
						name="state"
						id="state"
						formik={formik}
						placeholder={t('caregiver_address_proof_form.placeholders.state')}
						value={formik.values.state}
						optionsDataName="state"
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
						label={t('caregiver_address_proof_form.pin_code')}
						name="pin_code"
						id="pin_code"
						type='number'
						placeholder={t('caregiver_address_proof_form.placeholders.pin_code')}
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
								<span className="text-base font-bold">{t('caregiver_address_proof_form.buttons.next')}</span>
							</button>
						</div>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default AddressProofForm;
