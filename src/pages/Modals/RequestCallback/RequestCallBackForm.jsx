import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputField from '../../../components/Form/InputField';
import SelectField from '../../../components/Form/SelectField';
import { useDispatch, useSelector } from 'react-redux';
import {
	isRequestCallBackClose,
	selectProgramEnrollmentData,
} from '../../slice';
import { get } from 'lodash';
import { transformToFormData } from '../../../utils/forms';
import toast from 'react-hot-toast';
import { ReactComponent as DropDownTickIcon } from '../../../assets/images/svg/Form-dropDownTick-icon.svg';
import FormDatePicker from '../../../components/Form/FormDatePicker';
import useApi from '../../../hooks/useApi';

function RequestCallBackForm() {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const ProgramEnrollmentData = useSelector(selectProgramEnrollmentData);
	const triggerApi = useApi()

	const initialValues = {
		date: '',
		time_slot: '',
		note: '',
	};

	const dummyData = {
		time_slot: [
			{ id: '9 AM - 10 AM', label: '9 AM - 10 AM' },
			{ id: '10 AM - 11 AM', label: '10 AM - 11 AM' },
			{ id: '11 AM - 12 PM', label: '11 AM - 12 PM' },
			{ id: '12 PM - 1 PM', label: '12 PM - 1 PM' },
			{ id: '3 PM - 4 PM', label: '3 PM - 4 PM' },
			{ id: '4 PM - 5 PM', label: '4 PM - 5 PM' },
			{ id: '5 PM - 6 PM', label: '5 PM - 6 PM' }
		]
	};

	const validationSchema = Yup.object({
		date: Yup.string().required(t('request_callback.form.date.error')),
		time_slot: Yup.string().required(t('request_callback.form.time_slot.error')),
		note: Yup.string().required(t('request_callback.form.note.error')),
	});

	const [hasToastBeenShown, setHasToastBeenShown] = useState(false);

	const onSubmit = async (values, { resetForm }) => {
		const dynamicFormData = transformToFormData(values);
		console.log(dynamicFormData);
		try {
			const { response, success } = await triggerApi({
				url: `/patient/order-workflow/?action=request_callback`,
				type: 'POST',
				loader: true,
				payload: dynamicFormData,
			});
			if (success && response) {
				console.log('req order form post',response)
				if (!hasToastBeenShown) {
					toast(t('request_callback.notifications.success'), {
						position: 'top-right',
						style: {
							borderBottom: '3px solid #1EA41D',
							fontFamily: 'open sans',
							fontSize: '14px',
							paddingTop: '20px',
							paddingBottom: '20px',
							fontWeight: '800',
							color: '#1EA41D',
							background: '#E8F6E8',
						},
						className: 'custom-toast',
						icon: <DropDownTickIcon className="h-7 w-7" />,
						ariaProps: {
							role: 'status',
							'aria-live': 'polite',
						},
						}
					);
					setHasToastBeenShown(true);
				}
			}
		} catch (error) {
			console.error('Error during API call:', error);
		}
		dispatch(isRequestCallBackClose());
		resetForm(); 
	}

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={onSubmit}
		>
			{(formik) => (
				<Form className="complete-hidden-scroll-style flex flex-grow flex-col gap-4 overflow-y-auto">
					{/* <FormDatePicker
                        label="Date"
                        name="Date"
                        placeholder="DD/MM/YYYY"
                        value={get(formik.values, 'Date', '')}
                        onChange={formik.handleChange}
                        formik={formik}
                        className="flex grow rounded-md border border-[#D5D5D5] bg-black px-[16px] py-[14px] font-lato placeholder:text-[#9A9A9A] hover:outline-0 focus:outline-0"
                    /> */}

					<FormDatePicker
						key="date"
						label={t('request_callback.form.date.label')}
						name="date"
						id="date"
						placeholder="DD/MM/YYYY"
						value={get(formik.values, 'date', '')}
						onChange={formik.handleChange}
						formik={formik}
						min={new Date(new Date().setHours(0, 0, 0, 0))} // Set minimum date to start of today
						max={new Date(2030, 0, 1)}
						className="flex grow z-10 rounded-md border border-[#D5D5D5] bg-black px-[16px] py-[14px] font-lato placeholder:text-[#9A9A9A] hover:outline-0 focus:outline-0"
					/>

					<SelectField
						label={t('request_callback.form.time_slot.label')}
						name="time_slot"
						id="time_slot"
						formik={formik}
						placeholder={t('request_callback.form.time_slot.placeholder')}
						value={formik.values.time_slot}
						optionsData={dummyData.time_slot}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>

					<InputField
						label={t('request_callback.form.note.label')}
						name="note"
						id="note"
						type="textarea"
						placeholder={t('request_callback.form.note.placeholder')}
						value={formik.values.note}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						className="flex h-36 grow rounded-md border border-[#D5D5D5] px-[16px] py-[14px] font-lato placeholder:text-[#9A9A9A] hover:outline-0 focus:outline-0"
					/>

					<div className="flex flex-col gap-[8px] bg-[#ffffff] pt-[24px] font-lato text-[#696969]">
						<div className="flex w-full flex-row items-center justify-center rounded-md bg-primary py-4 text-center leading-[20px]">
							<button
								type="submit"
								disabled={!(formik.isValid && formik.dirty)}
								className="flex items-center justify-center gap-4 bg-primary font-open-sans font-semibold text-white rounded-md"
							>
								{t('request_callback.form.submit')}
							</button>
						</div>
					</div>
				</Form>
			)}
		</Formik>
	);
}

export default RequestCallBackForm;
