import { get } from 'lodash';
import React, { useEffect, useState } from 'react';
import CheckboxField from '../../components/Form/CheckBok';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import Radio from '../../components/Form/Radio';
import {
	isAuthorizationSubmited,
	updateAuthorization,
	setAuthorisationDetails,
	selectInitializeData,
} from '../slice/index';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

function AuthorizationConsent() {
	const dispatch = useDispatch();
	const initialData = useSelector(selectInitializeData);

	const { t } = useTranslation();

	const [formValues, setFormValues] = useState({
		program_explained: '',
		consent_to_OASIS_Center: '',
	});

	const initialValues = {
		hereby_authorize_OASIS_Centre: false,
		program_explained: '',
		oasiss_consent: '',
	};

	const validationSchema = Yup.object({
		hereby_authorize_OASIS_Centre: Yup.boolean()
			.oneOf([true], initialData?.data?.program_name == 'Opdyta' ? t('authorization_form.validation.consent_required'):t('authorization_form_rojuzda.validation.consent_required'))
			.required(initialData?.data?.program_name == 'Opdyta' ? t('authorization_form.validation.required'):t('authorization_form_rojuzda.validation.required')),
		program_explained: Yup.string()
			.oneOf(['yes'], initialData?.data?.program_name == 'Opdyta' ? t('authorization_form.validation.yes_required'):t('authorization_form_rojuzda.validation.yes_required'))
			.required(initialData?.data?.program_name == 'Opdyta' ? t('authorization_form.validation.required'):t('authorization_form_rojuzda.validation.required')),
		oasiss_consent: Yup.string()
			.oneOf(['yes'], initialData?.data?.program_name == 'Opdyta' ? t('authorization_form.validation.yes_required'): t('authorization_form_rojuzda.validation.yes_required'))
			.required(initialData?.data?.program_name == 'Opdyta' ? t('authorization_form.validation.required'):t('authorization_form_rojuzda.validation.required')),
	});

	const onSubmit = (values) => {
		
		// dispatch(setAuthorisationDetails({ ...values }));
		console.log("setAuthorisationDetails", values);
		
	};

	// Effect to dispatch changes based on monitored fields
	useEffect(() => {
		const { program_explained, oasiss_consent, hereby_authorize_OASIS_Centre } =
			formValues;
		console.log(
			'program_explained-oasiss_consent',
			program_explained,
			oasiss_consent,
			hereby_authorize_OASIS_Centre
		);

		if (program_explained == 'yes' && oasiss_consent == 'yes' && hereby_authorize_OASIS_Centre) {
			console.log('in auth submut');

			dispatch(updateAuthorization(formValues));
			dispatch(isAuthorizationSubmited(true));

			console.log('formValues', formValues);
		} else {
			dispatch(isAuthorizationSubmited(false));
		}
	}, [formValues, dispatch]);

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			validateOnChange
			onSubmit={onSubmit}
		>
			{(formik) => (
				<Form className="complete-hidden-scroll-style flex flex-grow flex-col gap-2 overflow-y-auto px-5 pb-60">
					<h1 className="pt-4">{initialData?.data?.program_name == 'Opdyta' ? t('authorization_form.title'):t('authorization_form_rojuzda.title')}</h1>

					<CheckboxField
						key={`is_consent_given`}
						label={
							<div>
								<p className="font-open-sans text-[14px] leading-5 text-[#283A46]">
									{initialData?.data?.program_name == 'Opdyta' ? t('authorization_form.oasis_consent.label'):t('authorization_form_rojuzda.oasis_consent.label')}
								</p>
								<ul className="list-decimal flex gap-2 flex-col mt-4">
									<li className="text-[#283A46]">
										{initialData?.data?.program_name == 'Opdyta' ? t('authorization_form.oasis_consent.points.point1'):t('authorization_form_rojuzda.oasis_consent.points.point1')}
									</li>
									<li className="text-[#283A46]">
										{initialData?.data?.program_name == 'Opdyta' ? t('authorization_form.oasis_consent.points.point2'):t('authorization_form_rojuzda.oasis_consent.points.point2')}
									</li>
									<li className="text-[#283A46]">
										{initialData?.data?.program_name == 'Opdyta' ? t('authorization_form.oasis_consent.points.point3'):t('authorization_form_rojuzda.oasis_consent.points.point3')}
									</li>
									<li className="text-[#283A46]">
										{initialData?.data?.program_name == 'Opdyta' ? t('authorization_form.oasis_consent.points.point4'):t('authorization_form_rojuzda.oasis_consent.points.point4')}
									</li>
									{/* Additional text here */}
								</ul>
							</div>
						}
						name={`hereby_authorize_OASIS_Centre`}
						id={`hereby_authorize_OASIS_Centre`}
						value={get(formik.values, `hereby_authorize_OASIS_Centre`, '')}
						formik={formik}
						disabled={false}
						onChange={(e) => {
							formik.handleChange(e);
							setFormValues({
								...formValues,
								hereby_authorize_OASIS_Centre: e.target.checked,
							});
							dispatch(
								setAuthorisationDetails({
									...formik.values,
									agree_consent: e.target.checked,
								})
							);
						}}
					/>

					<Radio
						key="program_explained"
						name="program_explained"
						id="program_explained"
						label={initialData?.data?.program_name == 'Opdyta' ? t('authorization_form.program_consent.label'):t('authorization_form_rojuzda.program_consent.label')}
						radioData={[
							{
								id: 'yes',
								value: 'yes',
								label: initialData?.data?.program_name == 'Opdyta' ? t('authorization_form.program_consent.options.yes'):t('authorization_form_rojuzda.program_consent.options.yes'),
							},
							{
								id: 'no',
								value: 'no',
								label: initialData?.data?.program_name == 'Opdyta' ? t('authorization_form.program_consent.options.no'):t('authorization_form_rojuzda.program_consent.options.no'),
							},
						]}
						value={get(formik.values, 'program_explained', '')}
						onChange={(e) => {
							formik.handleChange(e);
							setFormValues({
								...formValues,
								program_explained: e.target.value,
							});
							console.log('program_explained', e.target.value);

							dispatch(
								setAuthorisationDetails({
									...formik.values,
									program_explained: e.target.value,
								})
							);
						}}
						formik={formik}
					/>

					<Radio
						key="oasiss_consent"
						name="oasiss_consent"
						id="oasiss_consent"
						label={initialData?.data?.program_name == 'Opdyta' ? t('authorization_form.data_consent.label'):t('authorization_form_rojuzda.data_consent.label')}
						radioData={[
							{
								id: 'yes1',
								value: 'yes',
								label: initialData?.data?.program_name == 'Opdyta' ? t('authorization_form.data_consent.options.yes'):t('authorization_form_rojuzda.data_consent.options.yes'),
							},
							{
								id: 'no1',
								value: 'no',
								label: initialData?.data?.program_name == 'Opdyta' ? t('authorization_form.data_consent.options.no'):t('authorization_form_rojuzda.data_consent.options.no'),
							},
						]}
						value={get(formik.values, 'oasiss_consent', '')}
						onChange={(e) => {
							formik.handleChange(e);
							setFormValues({
								...formValues,
								oasiss_consent: e.target.value,
							});
							console.log('oasiss_consent', e.target.value);

							dispatch(
								setAuthorisationDetails({
									...formik.values,
									oasiss_consent: e.target.value,
								})
							);
						}}
						formik={formik}
					/>
				</Form>
			)}
		</Formik>
	);
}

export default AuthorizationConsent;
