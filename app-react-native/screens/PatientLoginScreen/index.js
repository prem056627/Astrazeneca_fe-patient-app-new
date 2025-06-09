import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BrandLogo from '../../assets/bms_brand_logo.svg';
import {
	useDashboard,
	useDashboardDispatch,
} from '../../context/DashboardContextProvider';
import { styles } from './styles';
import VerifyOtpForm from './VerifyOtpForm';
import VerifyUserForm from './VerifyUserForm';

const PatientLoginScreen = ({ route, navigation }) => {
	const { page } = route.params || {}; // Safeguard for route.params
	const { patientLoginData } = useDashboard();
	const dashboardDispatch = useDashboardDispatch();
	const [isUserExist, setIsUserExist] = useState(false);
	const [mobileNumber, setMobileNumber] = useState('');

  const isFocused = useIsFocused();

	useEffect(() => {
		const checkLoginStatus = async () => {
			const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
			if (isLoggedIn === 'true') {
				navigation.navigate('WebviewScreen');
			} else {
				console.log('isLoggedIn', 'false');
			}
		};

		if (isFocused) {
			checkLoginStatus(); // AsyncStorage check wrapped in an async function
		}

		if (isFocused && page === 'verify_username') {
			dashboardDispatch({
				type: 'SET_PATIENT_LOGIN_DATA',
				payload: {
					...patientLoginData,
					currentStep: 'verify_username',
				},
			});
		}
	}, [isFocused, page]); // Ensure page is included in dependencies


	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: '#F6F6F6' }}>
			<View style={styles.container}>
				{patientLoginData?.currentStep !== 'consent' ? (
					<View style={styles.nav}>
						<TouchableOpacity
							onPress={() => navigation.navigate('CommonLoginPage', {})}
						>
							<BrandLogo />
						</TouchableOpacity>
					</View>
				) : null}

				<View style={styles.main}>
					{
						{
							verify_username: (
								<VerifyUserForm
									mobileNumber={mobileNumber}
									setMobileNumber={setMobileNumber}
									isUserExist={isUserExist}
									setIsUserExist={setIsUserExist}
									navigation={navigation}
								/>
							),
							verify_otp: (
								<VerifyOtpForm
									mobileNumber={mobileNumber}
									setMobileNumber={setMobileNumber}
									isUserExist={isUserExist}
									setIsUserExist={setIsUserExist}
									navigation={navigation}
								/>
							),
						}[patientLoginData?.currentStep]
					}
				</View>
			</View>
		</SafeAreaView>
	);
};

export default PatientLoginScreen;
