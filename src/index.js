import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './i18n.js'
import { Suspense } from 'react';

// async function enableMocking() {
// 	if (process.env.REACT_APP_MSW_MOCK_API === 'true') {
// 		const { worker } = await import('./mocks/browser');
// 		return worker.start();
// 	} else {
// 		return;
// 	}
// }

// enableMocking().then(() => {
	const root = ReactDOM.createRoot(document.getElementById('root'));
	root.render(<App />);
// });
