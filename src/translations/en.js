export const english = {
	yes: 'Yes',
	no: 'No',
	save_next: 'Save & Next',
	program_enrollment_title: 'Program Enrollment',
	profile_details_title: 'Profile Details',
	caregiver_title: 'Caregiver Details',
	document_upload_title: 'Upload Documents',
	authorization_title: 'Authorization Consent',
	personal_details_accordion_title: 'Personal Details',
	address_proof_accordion_title: 'Address Proof',
	current_residence_accordion_title: 'Current Residence',
	reimbursement_accordion_title: 'Reimbursement Information',
	occupational_accordion_title: 'Occupational Details',
	caregiver_accordion_title: 'Caregiver',
	caregiver_address_title: 'Address Proof',
	caregiver_id_proof_title: 'Caregiver ID Proof',
	id_proof_accordion_title: 'ID Proof',
	other_documents_accordion_title: 'Other Documents',
	personal_details_form: {
		full_name: 'Full Name',
		gender: 'Gender',
		date_of_birth: 'Date of Birth',
		mobile_number: 'Mobile Number',
		alternate_mobile_number: 'Valid Phone Number',
		email: 'Email',
		nationality: 'Nationality',
		buttons: {
			next: 'Next',
		},
		gender_options: {
			male: 'Male',
			female: 'Female',
			other: 'Other',
		},
	},
	address_proof_form: {
		address_line_1: 'Address Line 1',
		address_line_2: 'Address Line 2',
		city: 'City',
		state: 'State',
		pin_code: 'Pin Code',
		placeholders: {
			address_line_1: 'Enter Address Line 1',
			address_line_2: 'Enter Address Line 2',
			city: 'Enter City',
			state: 'Select State',
			pin_code: 'Enter Pin Code',
		},
		validation: {
			required: 'Required',
			pin_code: {
				min: 'The field must contain a minimum of 6 digits',
				max: 'The field must contain a maximum of 6 digits',
			},
		},
		buttons: {
			next: 'Next',
		},
	},
	current_residential_address_form: {
		same_as_above_address: 'Same as above address',
		address_line_1: 'Address Line 1',
		address_line_2: 'Address Line 2',
		city: 'City',
		state: 'State',
		pin_code: 'Pin Code',
		placeholders: {
			address_line_1: 'Enter Address Line 1',
			address_line_2: 'Enter Address Line 2',
			city: 'Enter City',
			state: 'Select State',
			pin_code: 'Enter Pin Code',
		},
		validation: {
			required: 'Required',
			pin_code: {
				min: 'The field must contain a minimum of 6 digits',
				max: 'The field must contain a maximum of 6 digits',
			},
		},
		buttons: {
			next: 'Next',
		},
	},
	reimbursement_information_form: {
		has_reimbursement_label: 'Do you have reimbursement from your employer?',
		reimbursement_limits_label: 'Are you aware of reimbursement limits?',
		reimbursement_type_label: 'If yes, then please specify:',
		is_opdyta_label: 'Is OPDYTA covered as part of reimbursement?',
		is_rojuzda_label: 'Is ROJUZDA covered as part of reimbursement?',
		opdyta_note:
			'If not covered for reimbursement a letter or an email from the governing authority would be required along with Policy copy that has exclusions listed',
		government: 'Government',
		private: 'Private',
		others: 'Others',
		oasis_help: 'Kindly Contact oasis help center',
		validation: {
			required: 'Required',
		},
		buttons: {
			next: 'Next',
		},
	},
	occupation_details_form: {
		employment_status_label: 'What is your employment status?',
		employment_types: {
			self_employed: 'Self Employed',
			salaried: 'Salaried',
			not_working: 'Not Working',
		},
		organization_details: {
			current: 'Name of the Current organization',
			last: 'Name of the Current Organization with Address',
		},
		employment_sector: {
			semi_government: 'Are you working for a semi-government organization?',
			private: 'Are you working in a private organization?',
			service_government: 'Are you employed in government service?',
		},
		validation: {
			required: 'Required',
			select_option: 'Please select an option',
			organization_required: 'Please enter the current organization details',
		},
		buttons: {
			next: 'Next',
		},
	},
	caregiver_details_form: {
		full_name: 'Full Name',
		gender: 'Gender',
		mobile_number: 'Mobile Number',
		email: 'Email ID',
		placeholder: {
			full_name: 'Enter',
			gender: 'Select',
			mobile_number: '000000000',
			email: 'john.doe@xyz.com',
		},
		validation: {
			mobile_min: 'The field must contain a minimum of 10 digits',
			mobile_max: 'The field must contain a maximum of 10 digits',
			email_invalid: 'Invalid email format',
		},
		country_code: '+91',
		next: 'Next',
	},
	caregiver_address_proof_form: {
		address_line_1: 'Address Line 1',
		address_line_2: 'Address Line 2',
		city: 'City',
		state: 'State',
		pin_code: 'Pin Code',
		placeholders: {
			address_line_1: 'Enter Address Line 1',
			address_line_2: 'Enter Address Line 2',
			city: 'Enter City',
			state: 'Select state',
			pin_code: 'Enter Pin Code',
		},
		validation: {
			pin_code: {
				min: 'The field must contain a minimum of 6 digits',
				max: 'The field must contain a maximum of 6 digits',
			},
		},
		buttons: {
			next: 'Next',
		},
	},
	caregiver_id_proof_form: {
		title: 'ID Proof',
		file_instructions:
			'The file must be in jpg/pdf/png format. Maximum size of the document should be 5mb.',
		id_types: {
			voter_id: 'Voter ID',
			aadhar_card: 'Aadhar Card',
			pan_card: 'PAN Card',
		},
		upload: {
			label: 'ID Proof (Front)',
			placeholder: 'Upload ID Proof',
		},
		validation: {
			required: 'Required',
			file_type: 'Invalid file type. Only jpg, pdf, and png files are allowed',
			file_size: 'File size must not exceed 5MB',
		},
	},
	id_proof_form: {
		title: 'ID Proof',
		file_instructions:
			'The file must be in jpg/pdf/png format. Maximum size of the document should be 5mb.',
		id_types: {
			voter_id: 'Voter ID',
			aadhar_card: 'Aadhar Card',
			pan_card: 'PAN Card',
		},
		upload: {
			label: 'ID Proof (Front)',
			required: '*',
		},
		validation: {
			required: 'Required',
			proof_type_required: 'Please select an ID proof type',
			file_required: 'Please upload an ID proof document',
			file_type: 'Invalid file type. Only jpg, pdf, and png files are allowed',
			file_size: 'File size must not exceed 5MB',
		},
		buttons: {
			next: 'Next',
		},
	},
	other_documents_form: {
		title: 'Other Documents',
		file_instructions:
			'The file must be in jpg/pdf/png format. Maximum size of the document should be 5mb.',
		prescription: {
			label: 'Prescription File',
			required: '*',
		},
		diagnosis: {
			label: 'Diagnosis Detail',
			required: '*',
		},
		validation: {
			required: 'Required',
			file_required: 'Please upload the required document',
			file_type: 'Invalid file type. Only jpg, pdf, and png files are allowed',
			file_size: 'File size must not exceed 5MB',
		},
	},
	authorization_form: {
		title: 'Authorization',
		oasis_consent: {
			label: 'I hereby authorize OASIS Centre to',
			points: {
				point1:
					'Obtain my health information from healthcare providers, treating Doctor and insurance company to certify accuracy of the information for completion of the enrolment process.',
				point2:
					'To conduct necessary audit and patient verification processes (including through third parties) on behalf of BMS during my enrolment for and anticipation in the program. Failure to do so may affect the ability to enter/continue in the patient assistance program.',
				point3:
					'Contact me or my caretaker for additional information or for providing services of program either by call or email or other form of communication.',
				point4:
					'I allow OASIS to report any adverse event, that may be identified during our interactions to BMS and also agree that BMS may contact my treating physician to get more details if needed.',
			},
		},
		program_consent: {
			label:
				'I confirm that the BMS patient support programme has been fully explained to me and I consent to join the programme as explained above.',
			options: {
				yes: 'Yes',
				no: 'No',
			},
		},
		data_consent: {
			label:
				'I consent to OASIS Center processing my Personal Information for the purposes of providing the BMS patient support programme as explained above.',
			options: {
				yes: 'Yes',
				no: 'No',
			},
		},
		validation: {
			consent_required: 'Please agree the consent',
			yes_required: "Please select 'Yes' to proceed further.",
			required: 'Required',
		},
	},
	authorization_form_rojuzda: {
		title: 'Authorization',
		oasis_consent: {
			label: 'I hereby authorize AARAMBH Centre to',
			points: {
				point1:
					'Obtain my health information from healthcare providers, treating Doctor and insurance company to certify accuracy of the information for completion of the enrolment process.',
				point2:
					'To Conduct necessary audit and patient’s Audio / Video / physical verification processes (including through third parties) on behalf of BMS during my enrolment for and anticipation in the program. Failure to do so may affect the ability to enter/continue in the patient assistance program.',
				point3:
					'Contact me or my caretaker for additional information or for providing services of program either by call or email or other form of communication.',
				point4:
					'Report any adverse event, that may be identified during our interactions to BMS and also agree that BMS may contact my treating physician to get more details if needed.',
			},
		},
		program_consent: {
			label:
				'I confirm that the BMS patient support programme has been fully explained to me and I consent to join the programme as explained above.',
			options: {
				yes: 'Yes',
				no: 'No',
			},
		},
		data_consent: {
			label:
				'I consent to AARAMBH Center processing my Personal Information for the purposes of providing the BMS patient support program as explained above.',
			options: {
				yes: 'Yes',
				no: 'No',
			},
		},
		validation: {
			consent_required: 'Please agree the consent',
			yes_required: "Please select 'Yes' to proceed further.",
			required: 'Required',
		},
	},
	consent_form: {
		title: 'Please Agree to the terms and conditions',
		validation: {
			consent_required: 'Consent submission is required',
		},
		terms: {
			program_eligibility:
				'This programme is only for Nivolumab (OPDYTA®) and is open to all the patients (As per OASIS eligibility criteria) prescribed with Nivolumab (OPDYTA®) as monotherapy or Nivolumab (OPDYTA®) based combination as approved by DCGI, on prescription of registered Oncologist.',
			nationality:
				'Enrolment is open to Indian national located within India only.',
			non_transferable: 'Confirmation of enrolment is non-transferable.',
			enrollment_discretion:
				'Acceptance of enrolment application is at the sole discretion of management of OASIS Center.',
			services:
				'Members are entitled to receive services provided by the OASIS Center as determined by the management from time to time.',
			voluntary_participation:
				'Participation in the programme is voluntary and optional. Members may terminate participation under this programme at any time by written notice to OASIS Center.',
			liability:
				"The management of OASIS and It's sponsor, BMS shall not be liable whatsoever for any loss/ damage claim that may arise out of use of or other reliance on any service provided under this programme.",
			rights_reserved:
				'OASIS center / BMS reserves the absolute right to withdraw and/or alter any components, contents, terms or conditions of the programme and/or terminate any enrolment.',
			patient_rights:
				'Patient has the rights of rejection, right to withdraw the programme and rights to share relevant information with judiciary and government agency.',
			reimbursement:
				'The programme is not applicable for patient who have full reimbursement.',
			misrepresentation:
				'Any misrepresentation of the information or submission of the fraudulent documentation either during enrolment or any sequences stage of the program will be liable for discontinuation of the program immediately. OASIS Center and BMS reserves right to claim for the damages caused due to misuse of the program.',
			free_doses:
				'Free doses are subject to the condition of administration of the paid doses as prescribed. In case, the paid dose is partly administered, company will only be liable to dispense free dose equivalent to the paid dose. In case of death or discontinuation of the treatment after first dose, BMS will not dispense free drug.',
		},
		terms_rojuzda: {
			program_eligibility:
				'This program is only for Rojuzda® (luspatercept) and is open to all the patients (As per AARAMBH eligibility criteria) prescribed with Rojuzda® (luspatercept) as approved by DCGI, on prescription of registered Oncologist/Hematologist.',
			nationality:
				'Enrolment is open to Indian nationals located within India only.',
			non_transferable: 
				'Confirmation of enrolment is non-transferable.',
			enrollment_discretion:
				' Acceptance ofenrolment application is at the sole discretion of management of AARAMBH Center.',
			services:
				'Members are entitled to receive services provided by the AARAMBH Center as determined by the management from time to time.',
			voluntary_participation:
				'Participation in the program is voluntaryand optional. Members may terminate participation under this program at any time by written notice to AARAMBH Center.',
			liability:
				'The management of AARAMBH and Its sponsor, BMS shall not be liable whatsoever for any loss/ damage claim that may arise out of use of or other reliance on any service provided under this program.',
			rights_reserved:
				'AARAMBH Center / BMS reserves the absolute right to withdraw and/or alter any components, contents, terms or conditions of the program and/or terminate any enrolment.',
			patient_rights:
				'Patient has the rights of rejection, right to withdraw the program and rights to share relevant information with judiciary and government agency.',
			reimbursement:
				'This program is to support the patients under not reimbursed and partially reimbursed category.',
			misrepresentation:
				'Any misrepresentation of the information or submission of the fraudulent documentation either during enrolment or any sequences stage of the program will be liable for discontinuation of the program immediately. AARAMBH Center and BMS reserve the right to claim for the damages caused due to misuse of the program.',
			free_doses:
				'Free doses are subject to the condition of administration of the paid doses as prescribed. In case the paid dose is partly administered, company will only be liable to dispense free dose equivalent to the paid dose. In case of death or discontinuation of the treatment after first dose, BMS will not dispense free drug.'
		},
		buttons: {
			agree: 'I Agree To The Terms & Conditions',
		},
	},
	doc_esign: {
		title: 'Enrolment Authorization',
		aadhar_esign: {
			title: 'What is Aadhar based E-signing?',
			description:
				"Aadhaar-based e-signing is a form of electronic signature in India that leverages an individual's Aadhaar (a 12-digit unique identity number) and authentication through the Aadhaar system to digitally sign documents.",
		},
		steps: {
			title: 'Step:',
			list: {
				step1: 'Click on the button below "Sign my Enrolment Form"',
				step2:
					'Click on the start button show in yellow on the left top corner of the document',
				step3: 'Click on the E-Sign section',
				step4: 'Follow the OTP steps and Submit',
			},
		},
		note: {
			prefix: 'Note:',
			text: 'Location permission is required for proceeding with enrolment form signature',
		},
		button: 'Sign my Enrolment Form',
		compatibility_error:
			"Device Compatibility Error. Oops! It seems like you're trying to access this service from a non-native device. To ensure optimal performance and the best user experience, please use our service on a supported native device. If you have any questions or need further assistance, our support team is here to help. Thank you for your understanding!",
	},
	profile: {
		title: 'Profile',
		sections: {
			my_profile: 'My Profile',
			order_history: 'Order History',
		},
	},
	my_profile: {
		title: 'My Profile',
		toast: {
			success: 'Requested for paid order successfully.',
		},
		sections: {
			personal_details: {
				title: 'Personal Details',
				fields: {
					name: 'Name',
					gender: 'Gender',
					dob: 'Date of Birth',
					mobile: 'Mobile Number',
					email: 'Email ID',
					age: 'Age',
					address: 'Address',
					city: 'City',
					state: 'State',
					pin_code: 'PIN Code',
					relation: 'Relation',
					contact_number: 'Contact Number',
				},
			},
			address: {
				title: 'Address',
				fields: {
					address_line_1: 'Address Line 1',
					address_line_2: 'Address Line 2',
					city: 'City',
					state: 'State',
					pin_code: 'PIN Code',
				},
			},
			caregiver: {
				title: 'Caregiver',
				fields: {
					name: 'Name',
					gender: 'Gender',
					dob: 'Date of Birth',
					mobile: 'Mobile Number',
					email: 'Email ID',
					relation: 'Relation',
					address_line_1: 'Address Line 1',
					address_line_2: 'Address Line 2',
					city: 'City',
					state: 'State',
					pin_code: 'PIN Code',
				},
			},
			reimbursement: {
				title: 'Reimbursement Information',
				fields: {
					type: 'Reimbursement Type',
					limits: 'Reimbursement Limits',
					amount: 'Reimbursement Amount',
					status: 'Status',
				},
			},
			prescription: {
				title: 'Prescription Details',
				fields: {
					doctor_name: 'Doctor Name',
					hospital_name: 'Hospital Name',
					prescription_date: 'Prescription Date',
				},
			},
		},
		not_available: 'N/A',
		buttons: {
			edit: 'Edit',
			save: 'Save',
			cancel: 'Cancel',
		},
		validation: {
			required: 'This field is required',
			invalid_email: 'Invalid email address',
			invalid_phone: 'Invalid phone number',
		},
	},
	order_history: {
		title: 'Order History',
		active_order: {
			title: 'Active Order',
			order_id: 'Order ID',
			status: {
				dispatch: 'Dispatch',
			},
		},
		past_orders: {
			title: 'Past Orders',
			filters: {
				all: 'All',
				paid: 'Paid Orders',
				free: 'Free Orders',
			},
		},
		fields: {
			order_date: 'Order Date',
			dispensed_date: 'Dispensed Date',
			dosage: 'Dosage',
			distributor: 'Distributor',
			pharmacy: 'Pharmacy',
			infusion_date: 'Infusion Date',
		},
		card: {
			more: 'More...',
			less: 'Less...',
			order_advice: 'Order Advice Document',
		},
		not_available: 'N/A',
	},
	home: {
		program_details: {
			title: 'Program Details',
			program_name: {
				active_badge: 'Active',
			},
			fields: {
				patient_id: 'Patient ID',
				enrolled_date: 'Enrolled Date',
				remaining_infusions: 'Remaining Infusions',
				doctor_name: "Doctor's Name",
			},
		},
		recent_order: {
			title: 'Recent Order',
			order_id_prefix: 'Order ID',
			status: {
				paid: 'Paid',
				free: 'Free',
			},
			actions: {
				resend_otp: 'Resend OTP',
				confirm_infusion: 'Confirm Infusion',
			},
			fields: {
				order_date: 'Order Date',
				order_code: 'Order Code',
				distributor: 'Distributor',
				pharmacy: 'Pharmacy',
			},
		},
		oasis_section: {
			title: 'More on',
			program_name: 'OPDYTA® OASIS Patient Support Program (PSP)',
			program_name_rojuzda: 'ROJUZDA® AARAMBH Patient Support Program (PSP)',
			view_all: 'View all',
			tags: {
				pv_reporting: 'PV Reporting',
			},
		},
		order_success: 'Order request generated successfully',
		buttons: {
			confirm_infusion: 'Confirm Infusion',
			request_order: 'Request Order',
		},
	},
	profile_modal: {
		logout: 'Log Out',
		compatibility_error:
			"Device Compatibility Error. Oops! It seems like you're trying to access this service from a non-native device. To ensure optimal performance and the best user experience, please use our service on a supported native device. If you have any questions or need further assistance, our support team is here to help. Thank you for your understanding!",
	},
	ekyc_pending: {
		notification: {
			message: 'You have ',
			highlight:
				'completed your paid infusion, please complete your remote verification',
			continuation: ' to process the next order.',
		},
		verification: {
			title: 'Complete your Verification',
		},
		button: {
			start: 'Start eKYC',
		},
		mobile_status: {
			linked: 'Mobile number linked with Aadhaar Card',
			not_linked: 'Mobile number not linked with Aadhaar Card',
		},
		error: {
			device_compatibility:
				"Device Compatibility Error. Oops! It seems like you're trying to access this service from a non-native device. To ensure optimal performance and the best user experience, please use our service on a supported native device. If you have any questions or need further assistance, our support team is here to help. Thank you for your understanding!",
		},
	},
	physical_kyc: {
		notification: {
			message: 'You have ',
			highlight:
				'completed your first infusion, please complete your physical verification',
			continuation: ' to process the next order.',
		},
		verification: {
			title: 'Verification Pending',
			status: 'PAP Team will soon reach out to for verification',
		},
		process: {
			title: 'Virtual Verification Process',
		},
	},
	program_enrollment_success: {
		notification: {
			message: 'You have successfully submitted your program details. ',
			highlight1: 'Your documents are under evaluation',
			highlight2: 'PAP team',
			continuation:
				'. You will be notified about next step once it is approved!',
			by: 'by',
		},
		status: {
			title: 'Now Sit Back!',
			subtitle: 'while we verify your submitted documents',
		},
		about: {
			title: 'About ',
			program_name: 'OPDYTA® OASIS Patient Support Program (PSP)',
			program_name_rojuzda: 'ROJUZDA® AARAMBH Patient Support Program (PSP)',
			description:
				'BMS is committed to helping patients. BMS worldwide conducts several programs to reduce health disparities and to enhance global access to medicine. BMS India has introduced OPDYTA® PSP for patients prescribed OPDYTA® (Nivolumab) by an Registered Oncologist in an approved indication in India, if the eligibility criteria is fulfilled.',
			description_rojuzda:
				`Bristol Myers Squibb (BMS) is committed to transforming the lives of patients with science. We keep the patients at the center of all that we do. Our Patient Support Programs are aimed at enhancing access to our innovative therapies and ensuring that our medicines are available to patients.
Aarambh our Patient Support Program for Rojuzda is individualized to meet the required treatment needs of eligible patients. We understand that patients can only benefit from our medicines if they are able to access them. With Aarambh, our goal is to get the treatment to the right patient in time`,
		},
	},
	request_callback: {
		modal: {
			title: 'Request a Call Back',
		},
		form: {
			date: {
				label: 'Date',
				placeholder: 'DD/MM/YYYY',
				error: 'Date is required',
			},
			time_slot: {
				label: 'Time Slot',
				placeholder: 'Select Time Slot',
				error: 'Time slot is required',
			},
			note: {
				label: 'Note',
				placeholder: 'Enter any additional notes here',
				error: 'Note is required',
			},
			submit: 'Submit',
		},
		notifications: {
			success:
				'Call back requested. PAP team will reach out to you for the next steps',
		},
	},
	request_order: {
		modal: {
			title: 'Request Order',
		},
		form: {
			description:
				'The Oasis support will call you in the next 2 hours to support in processing the order request',
			submit: 'Submit',
			prescription_change: {
				text: 'Change in prescription?',
				action: 'Request a Call Back',
			},
		},
		notifications: {
			success: 'Order request submitted successfully',
			error: 'Failed to submit order request',
		},
	},
	enroll_success: {
		title: 'Account created successfully',
		subtitle: "Now, let's complete your profile to enrol into the program",
		description: 'Fill in the details and send for approval.',
		program: {
			title: 'You have enrolled for',
			names: {
				shambhav: 'Shambhav',
				aarambh: 'Aarambh',
			},
		},
		buttons: {
			get_started: 'Get Started',
		},
	},
	upload_infusion_card: {
		title: 'Upload Infusion Card',
		submit: 'Submit',
	},
};