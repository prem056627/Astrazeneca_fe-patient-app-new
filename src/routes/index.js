// import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import DashBoardRoutes from '../pages/DashBoard/DashBoardRoutes';
import { useDispatch, useSelector } from 'react-redux';
import useApi from '../hooks/useApi';
import {
	selectInitializeData,
	setInitializeData,
	selectCurrentPageState,
	setCurrentPageState,
} from '../pages/slice';
import { useEffect, useState } from 'react';
import Consent from '../pages/Modals/Concent/Concent';
import PersonalDeatilSubmitedSucess from '../pages/ProgramEnrollmentSuccess';
import ProgramEnrollmentForm from '../pages/Index';
import { ReactComponent as BrandIcon } from '../assets/images/svg/brand-logo.svg';
import Home from '../pages/DashBoard/Home/Home';
import ProfileModal from '../pages/DashBoard/Profile/Index';
import MyProfileModal from '../pages/DashBoard/Profile/MyProfileDetails/Index';
import OrderHistoryModal from '../pages/DashBoard/Profile/OrderHistoryDetails/Index';
import EKYCPending from '../pages/EKYCPending';
import PhyscialKYC from '../pages/PhyscialKYC';
import HcpMenuModal from '../hcp/HcpMenuModal';
import HcpProfileModal from '../hcp/HcpProfile/HcpProfileModal';
import HcpDashboard from '../hcp/HcpDashboard';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';

const current_role = localStorage.getItem('role');
export const AppRoutes = () => {
	const dispatch = useDispatch();
	const triggerApi = useApi();
	const [currentState, setCurrentState] = useState('signup_success');
	const initialData = useSelector(selectInitializeData);
	const current_page_state = useSelector(selectCurrentPageState);

	const TOKEN_CHECK_INTERVAL = 10; // ms
	const TOKEN_KEY = 'accessToken';

	const logToReactNative = (message, data) => {
		if (window.ReactNativeWebView) {
			window.ReactNativeWebView.postMessage(
				JSON.stringify({
					message,
					data,
					timestamp: new Date().toISOString(),
				})
			);
		}
	};

	function checkToken() {
		try {
			const accessToken = localStorage.getItem(TOKEN_KEY);
			const language = localStorage.getItem('i18nextLng');

			if (!accessToken || !language) {
				return false;
			}

			logToReactNative('language detected', { language });

			logToReactNative('Token detected, making API call', { accessToken });
			return true;
		} catch (error) {
			logToReactNative('Error checking token', { error: error.message });
			return false;
		}
	}

	const makeApiCall = async () => {
		const { response, success } = await triggerApi({
			url: `/patient-initialize/`,
			type: 'GET',
			loader: true,
		});
		if (success && response) {
			dispatch(setInitializeData(response));
			// dispatch(setCurrentPageState('signup_success'));
			dispatch(setCurrentPageState(response.data.current_state));

			if (window.ReactNativeWebView) {
				window.ReactNativeWebView.postMessage(JSON.stringify(response?.data));
			}
		}
	};

	useEffect(() => {
		let intervalId;
		let isMounted = true;

		const initializeApp = async () => {
			if (checkToken()) {
				clearInterval(intervalId);
				if (current_role !== 'hcp') {
					await makeApiCall();
				}
			}
		};

		intervalId = setInterval(initializeApp, TOKEN_CHECK_INTERVAL);

		return () => {
			isMounted = false;
			clearInterval(intervalId);
		};
	}, []);

	return (
		<>
			<Suspense fallback={<div>Loading...</div>}>
				<Routes>
					<Route
						path="/"
						element={
							current_role === 'hcp' ? (
								<HcpDashboard />
							) : (
								<>
									{initialData.data ? (
										current_page_state === 'signup_success' ? (
											<Consent
												setCurrentState={setCurrentState}
												currentState={currentState}
											/>
										) : current_page_state === 'enrollment_pending' ||
										  current_page_state === 'document_esign' ? (
											<ProgramEnrollmentForm />
										) : current_page_state === 'enrollment_complete' ||
										  current_page_state === 'program_applied' ||
										  current_page_state === 'program_shortfall' ? (
											<PersonalDeatilSubmitedSucess />
										) : current_page_state === 'program_active' ? (
											<Home />
										) : current_page_state === 'remote_verification_pending' ? (
											<EKYCPending />
										) : current_page_state ===
										  'physical_verification_pending' ? (
											<PhyscialKYC />
										) : null
									) : (
										<div className="flex h-full w-full items-center justify-center bg-white p-6 pt-11">
											<div className="flex-col justify-center">
												<BrandIcon className="h-[32px] min-h-[32px]" />
												<div className="text-center text-[20px] font-bold text-black">
													Loading...
												</div>
											</div>
										</div>
									)}
									<ProfileModal />
									<MyProfileModal />
									<OrderHistoryModal />
									<HcpMenuModal />
									<HcpProfileModal />
								</>
							)
						}
					/>

					{/* <Route path="/hcp_profile" element={<HcpDashboard />}></Route> */}
					<Route path="*" element={<Navigate to="/" />} />
				</Routes>
			</Suspense>
		</>
	);
};
