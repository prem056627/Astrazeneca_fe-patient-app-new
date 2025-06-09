 const en = {
	translation: {
		common: {
			next: 'Next',
			back: 'Back',
			submit: 'Submit',
			cancel: 'Cancel',
			save: 'Save',
			edit: 'Edit',
			delete: 'Delete',
			loading: 'Loading...',
			resend: 'Resend',
			verify: 'Verify',
		},
		auth: {
			loginAsHcp: 'Log In as HCP',
			loginAsPatient: 'Log In as Patient',
			signup: 'Sign Up',
			email: 'Email',
			password: 'Password',
			forgotPassword: 'Forgot Password?',
			mobileNumber: {
				title: 'Enter Mobile Number',
				subtitle: 'Linked with Aadhar Card',
				countryCode: '+91',
				placeholder: 'Enter your mobile number',
				validation: {
					required: 'Mobile number is required',
					invalid: 'Mobile number is invalid',
					minLength: 'Field must have at least 10 digits',
					maxLength: 'Field can have maximum 10 digits',
				},
			},
			verifyOtp: {
				title: 'Verify your mobile number',
				enterOtp: 'Enter the OTP sent to',
				sentTo: 'sent to',
				edit: 'Edit',
				resendOtp: 'Resend OTP',
				resendIn: 'Resend OTP in',
				seconds: 'seconds',
				incorrectOtp: 'Please enter the correct OTP',
				otpSentSuccess: 'OTP has been sent successfully to the number',
				aadharNote: '*Keep your Aadhar Card handy before proceeding for eKYC',
				verifyAndProceed: 'Verify and Proceed for eKYC',
				login: 'Log In',
				validation: {
					digitsOnly: 'OTP must be only digits',
					length: 'OTP must be exactly 6 digits',
					required: 'OTP is required',
				},
			},
			otp: {
				title: 'OTP Verification',
				subtitle: 'Enter the 6-digit code sent to your mobile number',
				resendText: "Didn't receive OTP?",
				resendButton: 'Resend',
				validation: {
					required: 'OTP is required',
					invalid: 'Invalid OTP',
					length: 'OTP must be 6 digits',
				},
				timer: {
					text: 'Wait to resend',
					seconds: 'seconds',
				},
			},
			termsAndConditions: {
				agree: 'I agree to',
				linkText: 'Terms and Conditions',
				validation: 'Please agree to terms and conditions',
			},
		},
		profile: {
			personalInfo: 'Personal Information',
			name: 'Name',
			phone: 'Phone Number',
			address: 'Address',
			occupation: 'Occupation',
		},
		validation: {
			required: 'This field is required',
			invalidEmail: 'Please enter a valid email',
			invalidPhone: 'Please enter a valid phone number',
		},
	},
};

export default en