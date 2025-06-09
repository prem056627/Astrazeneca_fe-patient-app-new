import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { DashboardContextProvider } from './context/DashboardContextProvider';
import LoaderContextProvider from './context/LoaderContextProvider';
import ErrorMessageContextProvider from './context/ErrorMessageContextProvider';
import store from './store';
import { Provider } from 'react-redux';
import { AppRoutes } from './routes';
import './App.css';
import { Toaster } from 'react-hot-toast';

function App() {
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
	useEffect(() => {
	  console.log("current language", localStorage.getItem('i18nextLng'));
	  logToReactNative('current language', { message: 'current language', data: localStorage.getItem('i18nextLng')});
	}, [])
	
	return (
		<DashboardContextProvider>
			<ErrorMessageContextProvider>
				<LoaderContextProvider>
					<Provider store={store}>
						<BrowserRouter basename="/">
							<AppRoutes />
						</BrowserRouter>
						<Toaster
							toastOptions={{
								// Define default options
								className: '',
								duration: 500000,
								style: {
									background: '#363636',
									color: '#fff',
								},	
							}}
						/>
					</Provider>
				</LoaderContextProvider>
			</ErrorMessageContextProvider>
		</DashboardContextProvider>
	);
}

export default App;
