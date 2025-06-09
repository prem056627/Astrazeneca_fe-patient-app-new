// import { decamelizeKeys } from 'humps';
// let authToken = 'Sb9S4RwQJSoyAUYd3K0lGBdI3vMyAD';

// const baseURL = 'https://bmspatientapp.in.zelthy.dev/api';
const baseURL = '/api';
// const baseURL = ''

export const callGetApi = async ({ fullUrl }) => {
	const request = await fetch(baseURL + fullUrl, {
		method: 'GET',
		redirect: 'follow',
		headers: {
			Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
		},
	});
	return request;
};

export const callPostApi = async ({ fullUrl, payload }) => {
	const request = await fetch(baseURL + fullUrl, {
		method: 'POST',
		redirect: 'follow',
		headers: {
			Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
		},
		body: payload instanceof FormData ? payload : JSON.stringify(payload),
	});

	return request;
};

export const callPutApi = async ({ fullUrl, payload }) => {
	const request = await fetch(baseURL + fullUrl, {
		method: 'PUT',
		redirect: 'follow',
		headers: {
			Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
		},
		body: payload instanceof FormData ? payload : JSON.stringify(payload),
	});

	return request;
};

// export const initializeDashboard = {
// 	url: isHcpDashboard
// 		? '/hcp/initialize-dashboard/'
// 		: '/patient/initialize-dashboard/',
// 	type: 'GET',
// };

// export const getProgramDetails = (tenantCode) => ({
// 	url: isHcpDashboard
// 		? `/hcp/get-programs/${tenantCode}/`
// 		: `/patient/get-programs/${tenantCode}/`,
// 	type: 'GET',
// });

// export const workflow = (payload) => ({
// 	url: isHcpDashboard ? `/hcp/workflow/` : '/patient/workflow/',
// 	type: 'POST',
// 	payload,
// });

// export const patientTable = (tenantCode, searchValue, pageNumber) => ({
// 	url: `/hcp/patient-table/${tenantCode}/?page=${pageNumber}&search_value=${searchValue}`,
// 	type: 'GET',
// });

// export const getPatientDetails = (tenantCode, patientId) => ({
// 	url: `/hcp/patient-programs/${tenantCode}/${patientId}`,
// 	type: 'GET',
// });

// export const patientSearch = (payload) => ({
// 	url: '/hcp/patient-search/',
// 	type: 'POST',
// 	payload,
// 	loader: false,
// });
