import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
	ActivityIndicator,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackgroundSvg from '../assets/HCP-Landing.svg'; // You'll update this path
import { getApiUrl, getUserRoleId } from '../utils/helper';
import {
	useDashboard,
	useDashboardDispatch,
} from '../context/DashboardContextProvider';
import { useTranslation } from 'react-i18next';

export default function CommonLoginPage({ route, navigation }) {
	const { t } = useTranslation();
	const [loading, setLoading] = useState(false);
	const { patientLoginData } = useDashboard();
	const API_URL = getApiUrl();
	const dashboardDispatch = useDashboardDispatch();

	useEffect(() => {
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
		<SafeAreaView style={{ flex: 1, backgroundColor: '#7C084B' }}>
			{/* SVG Background */}
			<View style={styles.svgBackground}>
				<BackgroundSvg 
					width="100%" 
					height="100%" 
					preserveAspectRatio="xMidYMid slice"
				/>
			</View>

			<View style={styles.container}>
				<View style={styles.main}>
					<View style={styles.loginButtons}>
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
					</View>
				</View>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	svgBackground: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		zIndex: -1,
	},
	container: {
		flex: 1,
		alignItems: 'center',
		padding: 0,
	},
	main: {
		flexDirection: 'column-reverse',
		alignItems: 'center',
		justifyContent: 'end',
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
		marginHorizontal: 18,
		backgroundColor: 'white',
		padding: 14,
		borderRadius: 6,
	},
	primaryButtonLabel: {
		fontSize: 16,
		color: '#7C084B',
		fontWeight: '700',
		textAlign: 'center',
	},
});