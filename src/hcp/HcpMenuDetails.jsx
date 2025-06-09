import { useDispatch } from 'react-redux';
import { ReactComponent as ProfileChevoron } from '../assets/images/svg/ProfileChevron.svg';
import { setHcpProfileDetailsModal } from '../pages/slice';
import { useTranslation } from 'react-i18next';
function HcpMenuDetails() {
	const dispatch = useDispatch();

	const { t } = useTranslation();

	const handleLogout = () => {
		localStorage.clear();
		// eslint-disable-next-line no-undef
		// const isAppOnWeb = view;
		// if (isAppOnWeb == 'web') {
		// 	window.location.href = '/logout'
		// }

		let message = {
			label: 'LOGOUT',
		};

		let stringifiedMessage = JSON.stringify(message);

		// Comment it in desktop !!!!
		if (window.ReactNativeWebView) {
			window.ReactNativeWebView.postMessage(stringifiedMessage);
		} else {
			console.log(t('profile_modal.compatibility_error'));
		}
	};

	function ShowHcpProfile() {
		dispatch(setHcpProfileDetailsModal(true));
	}
	return (
		<div className="flex flex-col">
			<div className="mx-auto w-full max-w-md rounded-2xl bg-white pt-12 ">
				<button
					onClick={ShowHcpProfile}
					className="flex w-full flex-row items-center justify-between py-6 px-4 shadow-md   "
				>
					<p className="text-base font-bold text-[#283A46]">My Profile</p>
					<ProfileChevoron className={` h-8 w-8 `} />
				</button>
				<button
					onClick={handleLogout}
					className="flex w-full flex-row items-center justify-between py-6 px-4 shadow-md   "
				>
					<p className="text-base font-bold text-[#283A46]">Logout</p>
					<ProfileChevoron className={` h-8 w-8 `} />
				</button>
			</div>
		</div>
	);
}

export default HcpMenuDetails;
