// import React from 'react';
// import { Formik } from 'formik';
// import { useDispatch } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import * as Yup from 'yup';
import { ChangeNextStep, selectInitializeData, setCurrentPageState } from '../../slice';
// // import SubmitButton from '../../../../../../components/Form/SubmitButton';
import useApi from '../../../hooks/useApi';
import { transformToFormDataOrder } from '../../../utils/forms';

import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ReactComponent as BrandIcon } from '../../../assets/images/svg/brand-logo.svg';
// import { useNavigate } from 'react-router-dom';

// import { toggleRerenderInitialize } from '../../slice';

function ConcentForm({ setIsOpen, setCurrentState }) {
	const { t } = useTranslation();
	const triggerApi = useApi();
	const dispatch = useDispatch();
	const initialData = useSelector(selectInitializeData);

	// const navigate = useNavigate();

	// Dispatch action to toggle rerender after successful form submission

	// Initial form values
	const initialValues = {
		is_Concent_Submitted: true,
	};

	// Form validation schema
	const validationSchema = Yup.object().shape({
		is_Concent_Submitted: Yup.boolean().required(
			t('consent_form.validation.consent_required')
		),
	});

	// Form submission handler
	const onSubmit = async (values) => {
		console.log('Submitted values:', values);

		let tempValues = {
			step_data: 'terms_and_conditions',
			terms_and_conditions: values.is_Concent_Submitted ? 'yes' : 'no',
		};
		let dynamicFormData = transformToFormDataOrder(tempValues);

		const { response, success } = await triggerApi({
			url: `/patient/enrol/`,
			type: 'POST',
			loader: true,
			payload: dynamicFormData,
		});

		if (success && response) {
			setIsOpen(false);
			setCurrentState('enrollment_pending');
			console.log('ConcentForm response', response);
			// navigate('/platform');
			dispatch(ChangeNextStep(response?.next_step));
			dispatch(setCurrentPageState('enrollment_pending'));
			
		}
	};

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={onSubmit}
		>
			{(formik) => (
				<form
					className="complete-hidden-scroll-style relative m-4 flex grow flex-col gap-4 overflow-y-auto"
					onSubmit={formik.handleSubmit}
				>
					<div className="overflow-y-auto pr-2 pb-[100px]">
						<div className="fixed top-0 left-0 z-20 flex w-full items-center justify-center bg-white p-6 pt-11">
							<BrandIcon className="h-[32px] min-h-[32px]" />
						</div>
						<h3 className={`mt-24 text-center font-open-sans text-xl font-bold text-[#403939]`}>
							<p className="text-start text-[20px] font-bold text-black">
								{t('consent_form.title')}
							</p>
						</h3>
						{initialData?.data?.program_name == 'Opdyta' ? (
							<ol className="mt-4 list-inside list-decimal space-y-4 text-gray-700">
							<li>{t('consent_form.terms.program_eligibility')}</li>
							<li>{t('consent_form.terms.nationality')}</li>
							<li>{t('consent_form.terms.non_transferable')}</li>
							<li>{t('consent_form.terms.enrollment_discretion')}</li>
							<li>{t('consent_form.terms.services')}</li>
							<li>{t('consent_form.terms.voluntary_participation')}</li>
							<li>{t('consent_form.terms.liability')}</li>
							<li>{t('consent_form.terms.rights_reserved')}</li>
							<li>{t('consent_form.terms.patient_rights')}</li>
							<li>{t('consent_form.terms.reimbursement')}</li>
							<li>{t('consent_form.terms.misrepresentation')}</li>
							<li>{t('consent_form.terms.free_doses')}</li>
						</ol>
						):(
							<ol className="mt-4 list-inside list-decimal space-y-4 text-gray-700">
							<li>{t('consent_form.terms_rojuzda.program_eligibility')}</li>
							<li>{t('consent_form.terms_rojuzda.nationality')}</li>
							<li>{t('consent_form.terms_rojuzda.non_transferable')}</li>
							<li>{t('consent_form.terms_rojuzda.enrollment_discretion')}</li>
							<li>{t('consent_form.terms_rojuzda.services')}</li>
							<li>{t('consent_form.terms_rojuzda.voluntary_participation')}</li>
							<li>{t('consent_form.terms_rojuzda.liability')}</li>
							<li>{t('consent_form.terms_rojuzda.rights_reserved')}</li>
							<li>{t('consent_form.terms_rojuzda.patient_rights')}</li>
							<li>{t('consent_form.terms_rojuzda.reimbursement')}</li>
							<li>{t('consent_form.terms_rojuzda.misrepresentation')}</li>
							<li>{t('consent_form.terms_rojuzda.free_doses')}</li>
						</ol>
						)}

						
					</div>
					<div className="absolute bottom-0 right-0 w-full bg-[#ffffff] pt-[14px] font-lato text-[#696969] md:items-end">
						{/* Submit Button */}
						<button
							type="submit"
							className={`flex w-full items-center justify-center rounded bg-primary
                 px-[16px] py-[14px] font-lato text-[14px] font-bold
                 leading-[20px] text-white disabled:bg-[#696969] disabled:opacity-[0.38] md:w-fit`}
							disabled={formik.isValid && formik.dirty}
						>
							<span>{t('consent_form.buttons.agree')}</span>
						</button>
					</div>
				</form>
			)}
		</Formik>
	);
}

export default ConcentForm;
