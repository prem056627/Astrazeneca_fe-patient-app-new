import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import ErrorModal from "./components/ErrorModal";
import { DashboardContextProvider } from "./context/DashboardContextProvider";
// import AuthenticateForm from "./screens/AuthenticateForm";
// import AuthenticateMedicineResultScreen from "./screens/AuthenticateMedicineResultScreen";
// import AuthenticateMedicineScreen from "./screens/AuthenticateMedicineScreen";
// import BarcodeScanner from "./screens/BarcodeScanner";
import CommonLoginPage from "./screens/CommonLoginPage";
import PatientLoginScreen from "./screens/PatientLoginScreen";
// import PermissionsScreen from "./screens/PermissionsScreen";
import WebviewScreen from "./screens/WebviewScreen";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from "react";
import './src/i18n';
import { I18nextProvider } from 'react-i18next';
import i18n from './src/i18n';

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

export default function App() {
  // usePreventScreenCapture();

  const hideSplash = async () => {
    await SplashScreen.hideAsync()
  }
  useEffect(() => {
    setTimeout(() => {
      hideSplash()
    }, 2000);
  }, [])


  return (
		<I18nextProvider i18n={i18n}>
			<View style={styles.container}>
				<KeyboardAvoidingView
					behavior={Platform.OS === 'ios' ? 'padding' : null}
					contentContainerStyle={{ flex: 1 }}
					style={styles.container}
				>
					<DashboardContextProvider>
						<NavigationContainer>
							<Stack.Navigator
								initialRouteName={'CommonLoginPage'}
								screenOptions={{
									headerShown: false,
								}}
							>
								<Stack.Screen
									name="ErrorModal"
									component={ErrorModal}
									options={{ title: 'Login', gestureEnabled: false }}
								/>
								<Stack.Screen
									name="CommonLoginPage"
									component={CommonLoginPage}
									options={{ title: 'Login', gestureEnabled: false }}
								/>
								<Stack.Screen
									name="PatientLoginScreen"
									component={PatientLoginScreen}
									initialParams={{ page: '' }}
									options={{ title: 'Login', gestureEnabled: false }}
								/>
								<Stack.Screen
									name="WebviewScreen"
									component={WebviewScreen}
									initialParams={{
										barcodeValue: [],
									}}
									options={{ title: 'Home', gestureEnabled: false }}
								/>
							</Stack.Navigator>
						</NavigationContainer>
					</DashboardContextProvider>
				</KeyboardAvoidingView>
			</View>
		</I18nextProvider>
	);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
