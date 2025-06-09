let envBasedConfig = {
	baseUrl: 'https://bmspatientapp.in.zelthy.dev',
	apiUrl: 'https://bmspatientapp.in.zelthy.dev/api',
	userRoleId: { patient: '403', hcp: '404 ' },
	userRoleMap: { 403: 'patient', 404: 'hcp' },
	webviewUrl: {
		patient: 'https://bmspatientapp.in.zelthy.dev/app/patient/',
		hcp: 'https://bmspatientapp.in.zelthy.dev/app/doctor/',
	},
};
if (process.env.APP_ENV === 'production') {
	envBasedConfig.baseUrl = 'https://bmsi-patientapp.zelthy.com';
	envBasedConfig.apiUrl = 'https://bmsi-patientapp.zelthy.com/api';
	envBasedConfig.userRoleId = { patient: '354', hcp: '354' };
	envBasedConfig.userRoleMap = { 354: 'patient', 377: 'hcp' };
	envBasedConfig.webviewUrl = 'https://bmsi-patientapp.zelthy.com/app/patient/';
} else if (process.env.APP_ENV === 'staging') {
	envBasedConfig.baseUrl = 'https://bmspatientappstage-zel-in.zelthy.in';
	envBasedConfig.apiUrl = 'https://bmspatientappstage-zel-in.zelthy.in/api';
	envBasedConfig.userRoleId = { patient: '375', hcp: '377' };
	envBasedConfig.userRoleMap = { 375: 'patient', 377: 'hcp' };
	envBasedConfig.webviewUrl = {
		patient: 'https://bmspatientappstage-zel-in.zelthy.in/app/patient/',
		hcp: 'https://bmspatientappstage-zel-in.zelthy.in/app/doctor/',
	};
} else if (process.env.APP_ENV === 'development') {
	envBasedConfig.baseUrl = 'https://bmspatientapp.in.zelthy.dev';
	envBasedConfig.apiUrl = 'https://bmspatientapp.in.zelthy.dev/api';
	envBasedConfig.userRoleId = { patient: '403', hcp: '404' };
	envBasedConfig.userRoleMap = { 403: 'patient', 404: 'hcp' };
	envBasedConfig.webviewUrl = {
		patient: 'https://bmspatientapp.in.zelthy.dev/app/patient/',
		hcp: 'https://bmspatientapp.in.zelthy.dev/app/doctor/',
	};
}

module.exports = ({ config }) => {
	return {
		...config,
		extra: {
			...config.extra,
			...envBasedConfig,
		},
	};
};
