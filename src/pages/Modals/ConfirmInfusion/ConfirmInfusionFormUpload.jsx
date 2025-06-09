import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MultiFileUpload from '../../../components/Form/MultiFileUpload';
import { useDispatch, useSelector } from 'react-redux';
import { isConfirmInfusion, isUploadInfusionCardClose, selectInitializeData, setCurrentPageState, setInitializeData } from '../../slice';
import { transformToDynamicFormData, transformToFormData } from '../../../utils/forms';
import { ReactComponent as DropDownTickIcon } from '../../../assets/images/svg/Form-dropDownTick-icon.svg';
import useApi from '../../../hooks/useApi';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

function ConfirmInfusionFormUpload({ setStep, fetchProgramDetails }) {
	const dispatch = useDispatch();
	const triggerApi = useApi();
	const initialData = useSelector(selectInitializeData);
	console.log('form init', initialData?.data);
	const { t } = useTranslation();

	const initialValues = {
		BrowseFiles: [],
	};

	const validationSchema = Yup.object({
		BrowseFiles: Yup.array()
			.min(1, 'Please upload at least one file')
			.required('File upload is required'),
	});

	const makePatientInitializeApiCall = async () => {
		console.log('in form infus')
		const { response, success } = await triggerApi({
			url: `/patient-initialize/`,
			type: 'GET',
			loader: true,
		});
		if (success && response) {
			dispatch(setInitializeData(response));
			// dispatch(setCurrentPageState('signup_success'));
			dispatch(setCurrentPageState(response.data.current_state));
		}
	};

	const onSubmit = async (values) => {
		console.log('Form values:', values);

		let dynamicFormData = transformToFormData({
			file: values?.BrowseFiles[0],
			order_id: initialData?.data?.recent_order?.order_id,
		});
		try {
			const { response, success } = await triggerApi({
				url: `/patient/order-workflow/?action=confirm_infusion`,
				type: 'POST',
				loader: true,
				payload: dynamicFormData,
			});
			if (success && response) {
				// makePatientInitializeApiCall();
				fetchProgramDetails()
				toast('Confirmed infusion successfully.', {
					// duration: 1000000,
					position: 'top-right',
					style: {
						borderBottom: '3px solid #1EA41D',
						fontFamily: 'open sans',
						fontSize: '14px',

						paddingTop: '20px',
						paddingBottom: '20px',
						fontWeight: '800',
						color: '#1EA41D ',
						background: '#E8F6E8',
						// width: '100%',
					},
					className: 'custom-toast',

					icon: <DropDownTickIcon className="h-7 w-7" />,
					ariaProps: {
						role: 'status',
						'aria-live': 'polite',
					},
				});
				dispatch(isUploadInfusionCardClose());
				console.log('infusion form post', response);
			}
		} catch (error) {
			console.error('Error during API call:', error);
		}
		// Dispatch or handle form submission logic here
		// dispatch(yourActionHere(values));
		// setStep(nextStep); // Example of moving to the next step
	};

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={onSubmit}
		>
			{(formik) => (
				<Form className="complete-hidden-scroll-style flex flex-grow flex-col gap-4 overflow-y-auto px-5 ">
					<div className="pt-5">
						<MultiFileUpload
							isMultiple={false}
							formik={formik}
							// label="The file must be in jpg/pdf/png format. Maximum size of the document should be 2mb."
							id="BrowseFiles"
							name="BrowseFiles"
						/>
					</div>
					<div className=" flex flex-col gap-5 ">
						<div>
							<p className="pb-5 font-open-sans text-sm italic text-[#403939]">
								{t('other_documents_form.file_instructions')}
							</p>
						</div>
						<button
							type="submit"
							className=" flex w-full items-center justify-center rounded-lg  bg-primary  py-[14px] font-lato text-[14px] font-bold leading-[20px] text-white disabled:opacity-[0.38]"
							// onClick={closeModal}
						>
							<span>{t('upload_infusion_card.submit')}</span>
						</button>
					</div>
				</Form>
			)}
		</Formik>
	);
}

export default ConfirmInfusionFormUpload;
