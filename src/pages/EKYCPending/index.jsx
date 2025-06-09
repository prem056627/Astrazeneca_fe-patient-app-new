import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ReactComponent as DropDownTickIcon } from '../../assets/images/svg/Form-dropDownTick-icon.svg';
import { ReactComponent as BrandIcon } from '../../assets/images/svg/brand-logo.svg';
import { ReactComponent as VerificationPending } from '../../assets/images/svg/verification_pending.svg';
import { ReactComponent as VerifyWait } from '../../assets/images/svg/verify_wait.svg';
import { ReactComponent as EKYCMobileLinked } from '../../assets/images/svg/ekyc_mobile_linked.svg';
import { ReactComponent as EKYCMobileNotLinked } from '../../assets/images/svg/ekyc_mobile_not_linked.svg';
import { ReactComponent as EKYCMobileLinkedHindi } from '../../assets/images/svg/ekyc_mobile_linked_hindi.svg';
import { ReactComponent as EKYCMobileNotLinkedHindi } from '../../assets/images/svg/ekyc_mobile_not_linked_hindi.svg';

import useApi from '../../hooks/useApi';

const current_lang = localStorage.getItem('i18nextLng');

function EKYCPending() {
	const { t } = useTranslation();
	const triggerApi = useApi();
	const [isLinked, setIsLinked] = useState(true);
	const redirectToKYCUrl = async () => {
		try {
			const { response, success } = await triggerApi({
				url: `/patient/verification_workflow/?action=send_ekyc_link`,
				type: 'GET',
				loader: true,
			});
			if (success && response) {
				window.location = response?.data?.verification_link;
				let message = {
					label: 'ESIGN-redirect',
					data: {
						redirect: true,
					},
				};

				let stringifiedMessage = JSON.stringify(message);

				// Comment it in desktop !!!!
				if (window.ReactNativeWebView) {
					window.ReactNativeWebView.postMessage(stringifiedMessage);
				} else {
					console.log(t('ekyc_pending.error.device_compatibility'));
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

	return (
		<div className="w-screen">
			<header className="left-0 z-20 flex w-full items-center justify-center bg-white p-6 pt-11">
				<BrandIcon className="h-[32px] min-h-[32px]" />
			</header>
			<div className="mx-5 rounded-xl bg-[#BE2BBB] ">
				<div className=" rounded-lg border border-[#DBDBDB] bg-white ">
					<div className="px-4">
						<div className="flex flex-row gap-2 py-8">
							<DropDownTickIcon className="h-6 w-6" />
							<p className="w-full font-open-sans text-sm">
								{t('ekyc_pending.notification.message')}
								<span className="text-[#BE2BBB]">
									{t('ekyc_pending.notification.highlight')}
								</span>
								{t('ekyc_pending.notification.continuation')}
							</p>
						</div>
						<div>
							<h1 className="flex gap-4 py-2 font-open-sans text-[22px] text-[#595454]">
								<VerificationPending className="text-center" />
								{t('ekyc_pending.verification.title')}
							</h1>

							<div className="flex items-center justify-center">
								<VerifyWait className="text-center" />
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="mt-8 px-4 text-white">
				<button
					onClick={redirectToKYCUrl}
					className="w-full cursor-pointer rounded-md bg-[#BE2BBB] py-3 font-open-sans text-base font-semibold"
				>
					{t('ekyc_pending.button.start')}
				</button>
			</div>

			<div className="mx-5 pb-8">
				<h1 className="py-5 font-open-sans text-2xl font-semibold text-[#283A46]">
					<div className="flex items-center justify-center space-x-1 rounded-full border border-[#9C9C9C] p-1 leading-5">
						{/* Linked Tab */}
						<button
							onClick={() => setIsLinked(true)}
							className={`rounded-full px-4 py-1 text-[12px] font-semibold ${
								isLinked
									? 'bg-primary text-white'
									: 'bg-transparent text-gray-600'
							}`}
						>
							{t('ekyc_pending.mobile_status.linked')}
						</button>

						{/* Not Linked Tab */}
						<button
							onClick={() => setIsLinked(false)}
							className={`rounded-full px-4 py-1 text-[12px] font-semibold ${
								!isLinked
									? 'bg-primary text-white'
									: 'bg-transparent text-gray-600'
							}`}
						>
							{t('ekyc_pending.mobile_status.not_linked')}
						</button>
					</div>
				</h1>
				<p className="font-open-sans text-base font-normal text-[#283A46]">
					{current_lang === 'en' ? (
						isLinked ? (
							<EKYCMobileLinked />
						) : (
							<EKYCMobileNotLinked />
						)
					) : isLinked ? (
						<EKYCMobileLinkedHindi />
					) : (
						<EKYCMobileNotLinkedHindi />
					)}
				</p>
			</div>
		</div>
	);
}

export default EKYCPending;
