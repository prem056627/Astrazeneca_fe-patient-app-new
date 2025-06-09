// import { useParams } from 'react-router-dom';
// import Modal from '../../../../../components/Modal';
// import AccentrixConsentForm from './AccentrixConsentForm';
// import ConsentForm from './ConsentForm';
// import TransplantConsentForm from './TransplantConsentForm';
// import UmaangConsentForm from './UmaangConsentForm';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectInitializeData,
	setCurrentPageState,
	setIsProgramEnrollmentDataSubmited,
} from '../../slice';

import { useEffect, useState } from 'react';
import Modal from '../../../components/Modal/Modal';
import useApi from '../../../hooks/useApi';
import { ReactComponent as BrandIcon } from '../../../assets/images/svg/brand-logo.svg';

// import ConcentForm from "./ConcentForm";
import { useTranslation } from 'react-i18next';
function DocESign({ setCurrentState, currentState }) {
	const [isOpen, setIsOpen] = useState(
		currentState === 'document_esign' ? true : false
	);
	const triggerApi = useApi();
	const dispatch = useDispatch();
	const { t } = useTranslation();

	const esignDoc = () => {
		const geteKYCURL = async () => {
			try {
				const { response, success } = await triggerApi({
					url: `/patient-enrolment-pdf/?language=${localStorage.getItem(
						'i18nextLng'
					)}`,
					type: 'GET',
					loader: true,
				});
				if (success && response) {
					window.location = response?.data?.link;
					let message = {
						label: 'ESIGN-redirect',
						data: {
							redirect: true
						},
					};

					let stringifiedMessage = JSON.stringify(message);

					// Comment it in desktop !!!!
					if (window.ReactNativeWebView) {
						window.ReactNativeWebView.postMessage(stringifiedMessage);
					} else {
						console.log(t('doc_esign.compatibility_error'));
					}
					// window.open(response?.data?.link, '_blank').focus();
					// dispatch(setIsProgramEnrollmentDataSubmited());
					// dispatch(setCurrentPageState('enrollment_complete'));
					console.log('esign response', response);
				}
			} catch (error) {
				console.error('Error during API call:', error);
			}
		};
		geteKYCURL();
	};

	useEffect(() => {
		if (currentState) {
			setIsOpen(currentState === 'document_esign' ? true : false);
		}
	}, [currentState]);

	return (
		<>
			{currentState && (
				<Modal
					label={
						<>
							<div className=" z-20 flex w-full items-center justify-center bg-white p-6 pt-11">
								<BrandIcon className="h-[32px] min-h-[32px]" />
							</div>
							<p className=" text-start text-[20px] font-bold text-black ">
								{t('doc_esign.title')}
							</p>
						</>
					}
					show={isOpen}
					closeModal={() => {}}
					isCloseVisible={false}
					ModalBody={
						// {
						// 	onemgnvst004: <TransplantConsentForm />,
						// 	onemgnvscommon: <UmaangConsentForm />,
						// 	onemgnvst003: <AccentrixConsentForm />,
						// }[tenantCode]
						// <ConcentForm
						// 	setIsOpen={setIsOpen}
						// 	setCurrentState={setCurrentState}
						// 	currentState={currentState}
						// />
						<>
							<div className="relative h-full">
								<div className="font-open-sans text-[14px] leading-5 text-[#283A46]">
									<span className="font-bold text-black">
										{t('doc_esign.aadhar_esign.title')}{' '}
									</span>
									{t('doc_esign.aadhar_esign.description')}
								</div>

								<div className="mt-4">
									<p className="text-[14px] font-semibold text-[#283A46]">
										{t('doc_esign.steps.title')}
									</p>
									<div className="pl-5">
										<ol className="list-decimal text-[14px]">
											<li>{t('doc_esign.steps.list.step1')}</li>
											<li>{t('doc_esign.steps.list.step2')}</li>
											<li>{t('doc_esign.steps.list.step3')}</li>
											<li>{t('doc_esign.steps.list.step4')}</li>
										</ol>
									</div>
								</div>

								<div className="fixed bottom-0 left-0 mb-4 w-full px-6">
									<div className="text-danger-red mt-8 text-[12px] italic">
										<span className="font-semibold">{t('doc_esign.note.prefix')}</span>{' '}
										{t('doc_esign.note.text')}
									</div>
									<button
										onClick={esignDoc}
										className=" flex w-full cursor-pointer items-center justify-center rounded-md bg-primary px-[16px] py-[20px] font-open-sans text-[14px] font-bold leading-[20px] text-white focus:outline-none disabled:opacity-[0.38]"
									>
										{t('doc_esign.button')}
									</button>
								</div>
							</div>
						</>
					}
					type="large"
				/>
			)}
		</>
	);
}

export default DocESign;
