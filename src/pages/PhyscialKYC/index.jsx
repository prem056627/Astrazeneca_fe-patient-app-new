import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ReactComponent as DropDownTickIcon } from '../../assets/images/svg/Form-dropDownTick-icon.svg';
import { ReactComponent as BrandIcon } from '../../assets/images/svg/brand-logo.svg';
import { ReactComponent as VerificationPending } from '../../assets/images/svg/verification_pending.svg';
import { ReactComponent as VerifyWait } from '../../assets/images/svg/verify_wait.svg';
import { ReactComponent as PhysicalWait } from '../../assets/images/svg/physical_wait.svg';
import { ReactComponent as PhysicalVerifyDetail } from '../../assets/images/svg/physicial_verify_detail.svg';
import { ReactComponent as PhysicalVerifyDetailHindi } from '../../assets/images/svg/physicial_verify_detail_hindi.svg';
import { useSelector } from 'react-redux';
import { selectInitializeData } from '../slice';
import useApi from '../../hooks/useApi';


const current_lang = localStorage.getItem('i18nextLng');

function PhyscialKYC() {
	const { t } = useTranslation();
	const initializeData = useSelector(selectInitializeData);
	const [showBtn, setShowBtn] = React.useState(false);
	const [verificationLink, setVerificationLink] = React.useState('');
	const triggerApi = useApi();
	const physicalVerification = async () => {
		try {
			const { response, success } = await triggerApi({
				url: `/patient/verification_workflow/?action=get_verification_link`,
				type: 'GET',
				loader: true,
			});
			if (success && response) {
				if(response?.data?.verification_link){
					setShowBtn(true);
					setVerificationLink(response?.data?.verification_link)
				}
				
				// dispatch(setIsProgramEnrollmentDataSubmited());
				// dispatch(setCurrentPageState('enrollment_complete'));
				console.log('response', response);
			}
		} catch (error) {
			console.error('Error during API call:', error);
		}
	};

	// const onVideoCall = async () => {
	// 	let message = {
	// 		label: 'EXTERNAL_BROWSER',
	// 		data: {
	// 			url: verificationLink
	// 		},
	// 	};

	// 	let stringifiedMessage = JSON.stringify(message);

	// 	if (window.ReactNativeWebView) {
	// 		// Send message to React Native to open URL in external browser
	// 		window.ReactNativeWebView.postMessage(stringifiedMessage);
	// 	} else {
	// 		// Fallback for web browser
	// 		window.open(verificationLink, '_blank');
	// 	}
	// }

	useEffect(()=>{
		physicalVerification();
	},[])

	return (
		<div className="w-screen">
			<header className="left-0 z-20 flex w-full items-center justify-center bg-white p-6 pt-11">
				<BrandIcon className="h-[32px] min-h-[32px]" />
			</header>
			<div className="mx-5 rounded-xl bg-[#BE2BBB] ">
				<div className=" rounded-lg border border-[#DBDBDB] bg-white ">
					<div className="px-4">
						{initializeData?.data?.current_state ==
							'physical_verification_pending' &&
						initializeData?.data?.rv_type_for_next_order ==
							'manual-rv' ? null : (
							<div className="flex flex-row gap-2 py-8">
								<DropDownTickIcon className="h-6 w-6" />
								<p className="w-full font-open-sans text-sm">
									You have{' '}
									<span className="text-[#BE2BBB]">
										completed your first infusion, please complete your physical
										verification
									</span>{' '}
									to process the next order.
								</p>
							</div>
						)}
						{/* <div className="flex flex-row gap-2 py-8">
							<DropDownTickIcon className="h-6 w-6" />
							<p className="w-full font-open-sans text-sm">
								{t('physical_kyc.notification.message')}
								<span className="text-[#BE2BBB]">
									{t('physical_kyc.notification.highlight')}
								</span>
								{t('physical_kyc.notification.continuation')}
							</p>
						</div> */}
						<div>
							<h1 className="flex gap-4 py-2 font-open-sans text-3xl text-[#595454]">
								<VerificationPending className="text-center" />
								{t('physical_kyc.verification.title')}
							</h1>

							<div className="flex items-center justify-center">
								<VerifyWait className="text-center" />
							</div>
						</div>
					</div>
				</div>
				<div className="flex gap-4 px-4 py-4 text-white">
					<PhysicalWait />
					<div>{t('physical_kyc.verification.status')}</div>
				</div>
			</div>
			{showBtn && (
				<div className="mt-8 flex justify-center px-4 text-white">
					<a
						href={verificationLink}
						target="_blank"
						// onClick={onVideoCall}
						rel="noreferrer"
						className="w-fit cursor-pointer rounded-md bg-[#BE2BBB] py-3 px-5 font-open-sans text-base font-semibold"
					>
						Start Video Call
					</a>
				</div>
			)}
			<div className="mx-5">
				<h1 className="py-5 font-open-sans text-2xl font-semibold text-[#283A46]">
					{t('physical_kyc.process.title')}
				</h1>
				<p className="pb-8 font-open-sans text-base font-normal text-[#283A46]">
					{current_lang === 'en' ? (
						<PhysicalVerifyDetail />
					) : (
						<PhysicalVerifyDetailHindi />
					)}
				</p>
			</div>
		</div>
	);
}

export default PhyscialKYC;
