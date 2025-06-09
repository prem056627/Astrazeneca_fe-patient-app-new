import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useRef, useState, useEffect } from 'react';
import {
	ActivityIndicator,
	BackHandler,
	Linking,
	Platform,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { getApiUrl, getUserRole, getWebviewUrl } from '../utils/helper';
import * as Device from 'expo-device';
import * as Crypto from 'expo-crypto';
import { useTranslation } from 'react-i18next';


export default function WebviewScreen({ route, navigation }) {
	const webViewRef = React.useRef(null);

	const WEBVIEW_URL = getWebviewUrl();
	const [refreshing, setRefreshing] = useState(false);
	const [isAtTop, setIsAtTop] = useState(false);
	const [currentTouchY, setCurrentTouchY] = useState(0);
	const [cookies, setCookies] = useState('');
	const [accessToken, setAccessToken] = useState(null);
	const [isRedirect, setIsRedirect] = useState(false);
	const [injectedJS, setInjectedJS] = useState();
	const [roleId, setRoleId] = useState(null);
	const { i18n } = useTranslation();

	useEffect(() => {
		const getRoleId = async () => {
			const storedRoleId = await AsyncStorage.getItem('curr_role_id');
			setRoleId(storedRoleId);
		};
		getRoleId();
	}, []);

	const ROLE = roleId ? getUserRole(roleId) : null;

	useEffect(() => {
		const getCookies = async () => {
			try {
				const csrftoken = await AsyncStorage.getItem('@csrftoken');
				const zelthycookie = await AsyncStorage.getItem('@zelthycookie');

				if (csrftoken && zelthycookie) {
					const cookieString = `csrftoken=${csrftoken}; zelthycookie=${zelthycookie};`;
					setCookies(cookieString);
				}
			} catch (error) {
				console.error('Error fetching cookies from AsyncStorage:', error);
			}
		};

		getCookies();
	}, []);

	const handleNavigationStateChange = (event) => {
		const { url } = event;
		console.log('url', url, Platform.OS);

		if (url.includes('/login/?next')) {
			navigation.navigate('CommonLoginPage', { page: 'verify_user' });
		} else if (url.includes('/login/')) {
			navigation.navigate('CommonLoginPage', { page: 'verify_user' });
		}
	};

	const handlePullToRefreshStart = (e) => {
		if (e.nativeEvent.locationY < 50 && !refreshing) {
			setIsAtTop(true);
		} else {
			setIsAtTop(false);
			setRefreshing(false);
		}
	};

	const handlePullToRefreshDrag = (e) => {
		if (isAtTop) {
			setRefreshing(true);
			setCurrentTouchY(e.nativeEvent.locationY);
			if (e.nativeEvent.locationY > 200) {
				webViewRef.current.reload();
				setRefreshing(false);
				setIsAtTop(false);
				setCurrentTouchY(0);
			}
		} else {
			setRefreshing(false);
		}
	};

	const handlePullToRefreshEnd = (e) => {
		if (isAtTop) {
			setRefreshing(false);
			setIsAtTop(false);
			setCurrentTouchY(0);
		} else {
			setRefreshing(false);
		}
	};

	const handleWebViewMessage = async (event) => {
		const data = event.nativeEvent.data;
		try {
			const parsedData = JSON.parse(data);

			console.log(
				'>##>##>##>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>parsedData',
				parsedData
			);

			if (parsedData['label'] === 'LOGOUT') {
				console.log('Webview Clicked', data);
				await AsyncStorage.clear();
				navigation.navigate('CommonLoginPage');
			} else if (parsedData['label'] === 'ESIGN-redirect') {
				setIsRedirect(parsedData.data.redirect);
				// Linking.openURL(parsedData.data.url);
			} else if (parsedData['label'] === 'hcp-prescription') {
				Linking.openURL(parsedData.data.url);
			}
			console.log('Intercepted API request:', parsedData);
		} catch (error) {
			console.error('Failed to parse message data:', error);
		}
	};

	const handleLoadRequest = (request) => {
		const { url, navigationType } = request;

		const initialUrl = WEBVIEW_URL[ROLE];
		// get webview url from env

		console.log('navigaiton', url, navigationType, isRedirect);

		// Check if the request is for the initialUrl
		if (url.startsWith(initialUrl) && isRedirect) {
			// If it's a navigation or a redirect to the initial URL
			// if (navigationType === 'other') {
			setIsRedirect(false);
			handleReload();
			console.log('webViewRef', webViewRef);
			return false; // Cancel the current navigation and trigger the manual reload
			// }
		}

		return true;
	};

	// const onWebViewLoad = () => {
	//   if (webViewRef.current) {
	//     const setCookiesJS = `
	//       document.cookie = "${cookies}";
	//       window.mobileNumber = ${AsyncStorage.getItem('mobileNumber')};
	//     `;
	//     console.log("webview loaded");
	//     webViewRef.current.injectJavaScript(setCookiesJS);
	//   }
	// };
	const onWebViewLoad = async () => {
	  if (webViewRef.current) {

	    let tempToken

	    // webViewRef.current.document.cookie = cookies;
	    try {
	      const setCookiesJS = `
	        document.cookie = "${cookies}";
	        ${tempToken} = document.cookie;
	        true;
	      `;
	      console.log("webview loaded",tempToken, cookies);
	      webViewRef.current.injectJavaScript(setCookiesJS);
	    } catch (error) {
	      console.error("Error setting cookies:", error);
	    }
	  }
	};

	const handleReload = () => {
		setAccessToken('');
	};

	useEffect(() => {
		const backAction = () => {
			if (webViewRef.current) {
				webViewRef.current.goBack();
				return true;
			}
			return false;
		};

		const backHandler = BackHandler.addEventListener(
			'hardwareBackPress',
			backAction
		);

		return () => backHandler.remove();
	}, []);

	useEffect(() => {
		const getAccessToken = async () => {
			try {
				const token = await AsyncStorage.getItem('access_token');
				setAccessToken(token);
				console.log('gettig access token =======>>>>>', token);
				const combinedScript = `
					window.localStorage.setItem('accessToken', '${token}');
					window.localStorage.setItem("i18nextLng", "${i18n.language}");
					window.localStorage.setItem('role', '${ROLE}');
					true;
				`;
				setInjectedJS(combinedScript);
			} catch (error) {
				console.error('Error getting access token:', error);
			}
		};

		getAccessToken();
	}, [accessToken, i18n.language]);

	const onReload = () => {
		setAccessToken('');
	};

	return (
		<SafeAreaView
			style={{
				position: 'relative',
				flex: 1,
				backgroundColor: '#F6F6F6',
			}}
			onTouchStart={handlePullToRefreshStart}
			onTouchMove={handlePullToRefreshDrag}
			onTouchEnd={handlePullToRefreshEnd}
		>
			{refreshing ? (
				<View
					style={{
						flex: 1,
						alignItems: 'center',
						justifyContent: 'center',
						width: '100%',
						height: 200,
						position: 'absolute',
						top: Platform.OS === 'ios' ? currentTouchY : 0,
						left: 0,
						zIndex: 1,
						backgroundColor:
							Platform.OS === 'ios'
								? 'transparent'
								: 'rgba(255, 255, 255, 0.9)',
					}}
				>
					<ActivityIndicator color="#b084cc" size="large" style={{}} />
				</View>
			) : null}
			{/* {console.log('uriii', {
				uri: `${WEBVIEW_URL}`,
				headers: { Cookie: cookies },
				// uri: `http://10.0.2.2:3000/app/patient/msdkeytruda/dashboard/?barcodeValues=${barcodeValue.toString()}&showBarcode=true&showBarcodeLoader=false&random=${Crypto.randomUUID()}`,
			})} */}
			{console.log('access token here', accessToken)}
			{accessToken && (
				<WebView
					style={{
						flex: 1,
						flexGrow: 1,
					}}
					ref={webViewRef}
					source={{
						uri: WEBVIEW_URL[ROLE],
						// uri: `https://www.google.com/`,
						headers: {
							Cookie: cookies,
							Authorization: `Bearer ${accessToken}`,
						},
						// uri: `http://10.0.2.2:3000/app/patient/msdkeytruda/dashboard/?barcodeValues=${barcodeValue.toString()}&showBarcode=true&showBarcodeLoader=false&random=${Crypto.randomUUID()}`,
					}}
					onLoadStart={() => {
						webViewRef.current?.injectJavaScript(injectedJS);
					}}
					sharedCookiesEnabled={true}
					onMessage={handleWebViewMessage}
					injectedJavaScript={injectedJS}
					injectedJavaScriptBeforeContentLoaded={`window.localStorage.setItem("accessToken", "${accessToken}");window.localStorage.setItem("i18nextLng", "${i18n.language}");window.localStorage.setItem('role', '${ROLE}');true;`}
					javaScriptEnabled={true}
					bounces={true}
					pullToRefreshEnabled={false}
					onNavigationStateChange={handleNavigationStateChange}
					startInLoadingState={true}
					renderLoading={() => {
						return (
							<View style={styles.activityIndicatorStyle}>
								<ActivityIndicator color="#b084cc" size="large" />
							</View>
						);
					}}
					onLoad={onWebViewLoad}
					onShouldStartLoadWithRequest={handleLoadRequest}
					geolocationEnabled={true}
				/>
			)}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#F5FCFF',
		flex: 1,
	},
	activityIndicatorStyle: {
		flex: 1,
		position: 'absolute',
		marginLeft: 'auto',
		marginRight: 'auto',
		marginTop: 'auto',
		marginBottom: 'auto',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		justifyContent: 'center',
		backgroundColor: 'rgba(255, 255, 255, 0.9)',
	},
});
