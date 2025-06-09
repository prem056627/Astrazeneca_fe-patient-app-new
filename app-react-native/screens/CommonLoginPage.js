import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
	ActivityIndicator,
	ImageBackground,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getApiUrl, getUserRoleId } from '../utils/helper';
import {
	useDashboard,
	useDashboardDispatch,
} from '../context/DashboardContextProvider';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../src/components/LanguageSwitcher';

export default function CommonLoginPage({ route, navigation }) {
	const { t } = useTranslation();
	const [loading, setLoading] = useState(false);
	const { patientLoginData } = useDashboard();

  const API_URL = getApiUrl();
  

	const dashboardDispatch = useDashboardDispatch();

	useEffect(() => {
		// AsyncStorage.clear();
		if (AsyncStorage.getItem('access_token')) {
			AsyncStorage.getItem('access_token').then((access_token) => {
				console.log('access_token', access_token);

				if (access_token) {
					navigation.navigate('WebviewScreen');
				}
			});
		}
	}, []);

  const onLogin = async (usr_type) => {
    setLoading(true);
	const ROLE_ID = getUserRoleId(usr_type);
	AsyncStorage.setItem('curr_role_id', ROLE_ID);
	dashboardDispatch({
		type: 'SET_CURRENT_ROLE',
		payload: {
			...patientLoginData,
			curr_role_id: ROLE_ID,
		},
	});
    console.log("onLogin", `${API_URL}/v2/login/${ROLE_ID}/`);

		await fetch(`${API_URL}/v2/login/${ROLE_ID}/`)
			.then((response) => {
				console.log('response', response);
				return response.json();
			})
			.then((data) => {
				console.log('data', data);
				if (data.request_id) {
					dashboardDispatch({
						type: 'SET_PATIENT_LOGIN_DATA',
						payload: {
							...patientLoginData,
							request_id: data.request_id,
							currentStep: 'verify_username',
						},
					});
					navigation.navigate('PatientLoginScreen');
				}

				if (data.next === 'verify_login_otp') {
					dashboardDispatch({
						type: 'SET_PATIENT_LOGIN_DATA',
						payload: {
							...patientLoginData,
							currentStep: 'verify_otp',
						},
					});
				}
				setLoading(false);
			})
			.catch((error) => {
				setLoading(false);
				console.error('Error:', error);
			});

		console.log('onLogin end');
	};

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: '#F6F6F6' }}>
			<ImageBackground
				source={require('../assets/common_login.png')}
				resizeMode="fill"
				style={{ flex: 1 }}
				imageStyle={{ width: '100%' }}
			>
				{/* <View
					style={{
						position: 'absolute',
						top: 276,
						zIndex: 100,
						width: '100%',
						alignItems: 'center',
					}}
				> */}

				{/* </View> */}

				<View style={styles.container}>
					<View style={styles.main}>
						<View style={styles.loginButtons}>
							<LanguageSwitcher />

							<TouchableOpacity
								style={styles.primaryButton}
								onPress={() => onLogin('patient')}
							>
								{loading ? (
									<ActivityIndicator size={'small'} color="#BE2BBB" />
								) : (
									<View style={{ position: 'relative', width: '100%' }}>
										<Text style={styles.primaryButtonLabel}>
											{t('auth.loginAsPatient')}
										</Text>
									</View>
								)}
							</TouchableOpacity>

							<TouchableOpacity
								style={styles.primaryButton}
								onPress={() => onLogin('hcp')}
							>
								{loading ? (
									<ActivityIndicator size={'small'} color="#BE2BBB" />
								) : (
									<View style={{ position: 'relative', width: '100%' }}>
										<Text style={styles.primaryButtonLabel}>
											{t('auth.loginAsHcp')}
										</Text>
									</View>
								)}
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</ImageBackground>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		padding: 0,
	},
	nav: {
		flex: 1,
		gap: 16,
		alignItems: 'center',
		padding: 16,
		paddingTop: 52,
		paddingBottom: 16,
		alignItems: 'center',
		justifyContent: 'center',
	},
	brandIntroMessage: {
		fontSize: 16,
		color: '#fff',
		fontWeight: '700',
		textAlign: 'center',
		lineHeight: 28,
	},
	brandLogo: {
		// flex: 1,
		// width: 100,
		// height: 100,
		// backgroundColor: "#FF00FF",
	},
	main: {
		flexDirection: 'column-reverse',
		alignItems: 'center',
		justifyContent: 'end',
		gap: 24,
		// paddingHorizontal: 18,
		// paddingVertical: 48,
		width: '100%',
		height: '100%',
	},
	loginButtons: {
		gap: 14,
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		
	},
	primaryButton: {
		// alignItems: 'center',
		// justifyContent: 'center',
		marginHorizontal: 18,
		backgroundColor: '#BE2BBB',
		// gap: 16,
		padding: 14,
		borderRadius: 6,
	},
	primaryButtonLabel: {
		fontSize: 16,
		color: '#fff',
		fontWeight: '700',
		textAlign: 'center',
	},
	secondaryButton: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#BE2BBB',
		gap: 16,
		padding: 16,
		borderWidth: 1,
		borderColor: '#FFFFFF',
	},
	secondaryButtonLabel: {
		fontSize: 16,
		color: '#FFFFFF',
		fontWeight: '700',
	},
});
