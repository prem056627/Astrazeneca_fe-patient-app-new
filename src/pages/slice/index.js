import { createSlice } from '@reduxjs/toolkit';

export const ProgramEnrollmentSlice = createSlice({
	name: 'ProgramEnrollment',
	initialState: {
		initializeData: {
			data: {
				enrollment_details: {
					step_data: {},
				},
			},
		},
		// initializeData: {},
		programData: {},
		patient_details: {},
		caregiver_details: {},
		document_upload_details: {},
		authorization_details: {},
		ProgramEnrollmentData: {},
		idType: false,
		isProgramEnrollmentDataSubmited: false,
		rerenderInitialize: false,
		isOrderHistoryDetailsModalOpen: false,
		isAddressSameAsAboveAddress: false,
		isFinalSubmit: false,
		// parentFormHandling
		isProfileDetailsDataSubmited: false,
		isOccupationDetailsDataSubmited: false,
		isCaregiverDetailsData: false,
		isUploadDocumentsDataSubmited: false,
		isAuthorizationSubmited: false,
		// personalDetailForm submited handling
		isPersonalDetailsSubmited: false,
		isAddressproofsubmited: false,
		isCurrentResidentialAddressSubmited: false,
		isReimbursementFormSubmited: false,
		isOccupationFormSubmited: false,
		isAddressInputDisabled: false,
		// //CareGiverDetailForm  submited handling

		isCaregiverDetailsSubmited: false,
		isCareGiverAddressproofsubmited: false,
		isCareGiverIdProofSubmited: false,
		isOtherDocumentSubmittted: false,
		isIdProofFormSubmittted: false,
		isProfilePageOpen: false,
		isHcpMenuOpen: false,
		isConfirmInfusion: false,
		isFinalSubmit: false,
		isMyProfileDetailsModalOpen: false,
		isHcpProfileDetailsModalOpen: false,
		isHcpPatientProfileDetailsModalOpen: false, 
		hcpPatientProfileDetails: {},
		// Handling parent Steps
		currentStep: 'signup_success',
		current_page_state: 'hcp_profile',
		// currentStep : "careGiverDetails",
		// currentStep: 'uploadDocumentsDetails',
		// currentStep : "authorizationDetails",
		// currentStep : "finalSubmit",

		isRequestOrderOpen: false,
		isRequestCallBackOpen: false,
		isFabButtonOpen: false,
		isUploadInfusionCardOpen: false,

		isHcpPatientDetailsModalViewOpen: false,

		isAddressProofFormValid: false,
		isCurrAddressFormValid: false,

	},

	reducers: {
		// Handling parent Steps
		// UpdatecurrentStep:(state, action) => {
		// 	state.currentStep = action.payload;

		// },
		// personalDetailForm submited handling
		setAddressInputDisabled: (state, action) => {
			console.log('payload', action.payload);
			state.isAddressInputDisabled = action.payload;
		},
		setInitializeData: (state, action) => {
			state.initializeData = { ...action?.payload };
		},
		setProgramData: (state, action) => {
			state.programData = { ...action?.payload };
		},
		setPatientDetails: (state, action) => {
			state.patient_details = action?.payload;
		},
		setCaregiverDetails: (state, action) => {
			state.caregiver_details = action?.payload;
		},
		setDocumentUploadDetails: (state, action) => {
			state.document_upload_details = action?.payload;
		},
		setAuthorisationDetails: (state, action) => {
			state.authorization_details = action?.payload;
		},
		setProgramEnrollmentData: (state, action) => {
			state.ProgramEnrollmentData = { ...action?.payload };
		},
		ProgramEnrollmentDataFormControl: (state, action) => {
			state.ProgramEnrollmentData = action.payload;
		},
		setIsProgramEnrollmentDataSubmited: (state, action) => {
			state.isProgramEnrollmentDataSubmited = true;
		},

		// Handling parent Steps

		ChangeNextStep: (state, action) => {
			state.currentStep = action.payload;
		},
		setCurrentPageState: (state, action) => {
			state.current_page_state = action.payload;
		},
		toggleRerenderInitialize: (state) => {
			state.rerenderInitialize = !state.rerenderInitialize;
		},

		// parentFormSubmited
		isProfileDetailsDataSubmited: (state, action) => {
			state.isProfileDetailsDataSubmited = action.payload;
		},
		isOccupationDetailsDataSubmited: (state, action) => {
			state.isOccupationDetailsDataSubmited = action.payload;
		},
		isAddressSameAsAboveAddress: (state, action) => {
			state.isAddressSameAsAboveAddress = action.payload;
		},
		isCaregiverDetailsData: (state, action) => {
			state.isCaregiverDetailsData = action.payload;
		},
		isUploadDocumentsDataSubmited: (state, action) => {
			state.isUploadDocumentsDataSubmited = action.payload;
		},
		isAuthorizationSubmited: (state, action) => {
			state.isAuthorizationSubmited = action.payload;
		},

		// push data for each steps
		isProfilePageOpen: (state, action) => {
			state.isProfilePageOpen = action.payload;
		},
		setHcpMenu: (state, action) => {
			state.isHcpMenuOpen = action.payload;
		},

		// addPersonalDetails: (state, action) => {
		// 	state.ProgramEnrollmentData.ProfileDetailsData.patient_details =
		// 		action.payload;
		// 	state.isPersonalDetailsSubmited = true;
		// },
		addPersonalDetails: (state, action) => {
			// Ensure ProgramEnrollmentData and ProfileDetailsData are defined
			if (!state.ProgramEnrollmentData) {
				state.ProgramEnrollmentData = {};
			}
			if (!state.ProgramEnrollmentData.ProfileDetailsData) {
				state.ProgramEnrollmentData.ProfileDetailsData = {};
			}

			// Set patient details
			state.ProgramEnrollmentData.ProfileDetailsData.patient_details =
				action.payload;
			state.isPersonalDetailsSubmited = true;
		},

		addAddressProof: (state, action) => {
			console.log('addAddressProof', action.payload);

			// Ensure ProgramEnrollmentData and ProfileDetailsData are defined
			if (!state.ProgramEnrollmentData) {
				state.ProgramEnrollmentData = {};
			}
			if (!state.ProgramEnrollmentData.ProfileDetailsData) {
				state.ProgramEnrollmentData.ProfileDetailsData = {};
			}
			// if(!state.initializeData){
			// 	state.initializeData = {}
			// }
			// if(!state.initializeData.data){
			// 	state.initializeData.data = {}
			// }
			// if(!state.initializeData.data.enrollment_details){
			// 	state.initializeData.data.enrollment_details = {}
			// }
			// if(!state.initializeData.data.enrollment_details.step_data){
			// 	state.initializeData.data.enrollment_details.step_data= {}
			// }
			// if(!state.initializeData.data.enrollment_details.step_data.address_details){
			// 	state.initializeData.data.enrollment_details.step_data.address_details = {}
			// }
			console.log('addr', state.initializeData);
			console.log('action pay', action.payload);
			// if(state.initializeData.data?.enrollment_details){
			console.log('in if');
			state.initializeData.data.enrollment_details.step_data.address_details =
				action.payload;
			// }
			console.log('addr2', state.initializeData);

			// Set patient details
			state.ProgramEnrollmentData.ProfileDetailsData.address_details =
				action.payload;
			state.isAddressproofsubmited = true;
		},
		addCurrentResidentialAddress: (state, action) => {
			// Ensure ProgramEnrollmentData and ProfileDetailsData are defined
			if (!state.ProgramEnrollmentData) {
				state.ProgramEnrollmentData = {};
			}
			if (!state.ProgramEnrollmentData.ProfileDetailsData) {
				state.ProgramEnrollmentData.ProfileDetailsData = {};
			}
			if (state.initializeData.data.enrollment_details != undefined) {
				state.initializeData.data.enrollment_details.step_data.current_residence =
					action.payload;
			}
			// Set patient details
			state.ProgramEnrollmentData.ProfileDetailsData.current_residence =
				action.payload;
			state.isCurrentResidentialAddressSubmited = true;
		},
		addReimbursementForm: (state, action) => {
			// Ensure ProgramEnrollmentData and ProfileDetailsData are defined
			console.log('reimb');
			if (!state.ProgramEnrollmentData) {
				state.ProgramEnrollmentData = {};
			}
			if (!state.ProgramEnrollmentData.ProfileDetailsData) {
				state.ProgramEnrollmentData.ProfileDetailsData = {};
			}
			if (state.initializeData.data.enrollment_details != undefined) {
				state.initializeData.data.enrollment_details.step_data.reimbursement_info =
					action.payload;
			}
			// Set patient details
			state.ProgramEnrollmentData.ProfileDetailsData.reimbursement_info =
				action.payload;
			state.isReimbursementFormSubmited = true;
		},
		addOccupationForm: (state, action) => {
			// Ensure ProgramEnrollmentData and ProfileDetailsData are defined
			if (!state.ProgramEnrollmentData) {
				state.ProgramEnrollmentData = {};
			}
			if (!state.ProgramEnrollmentData.ProfileDetailsData) {
				state.ProgramEnrollmentData.ProfileDetailsData = {};
			}
			console.log('bdehfv', state.initializeData);
			if (state.initializeData.data.enrollment_details != undefined) {
				state.initializeData.data.enrollment_details.step_data.occupational_info =
					action.payload;
			}
			// Set patient details
			state.ProgramEnrollmentData.ProfileDetailsData.occupational_info =
				action.payload;
			state.isOccupationFormSubmited = true;
		},
		// setAddressInputDisabled: (state, action) => {
		// 	state.disbleInputAdress = action.payload;
		// },
		addCareGiverDetails: (state, action) => {
			if (!state.ProgramEnrollmentData) {
				state.ProgramEnrollmentData = {};
			}
			if (!state.ProgramEnrollmentData.CaregiverDetailsData) {
				state.ProgramEnrollmentData.CaregiverDetailsData = {};
			}

			state.initializeData.data.enrollment_details.step_data.caregiver_details =
				action.payload;
			state.initializeData.data.enrollment_details.current_step =
				'caregiver_details';
			// Set patient details
			state.ProgramEnrollmentData.CaregiverDetailsData.caregiver_details =
				action.payload;
			state.isCaregiverDetailsSubmited = true;
		},
		addCareGiverAddressProof: (state, action) => {
			if (!state.ProgramEnrollmentData) {
				state.ProgramEnrollmentData = {};
			}
			if (!state.ProgramEnrollmentData.CaregiverDetailsData) {
				state.ProgramEnrollmentData.CaregiverDetailsData = {};
			}

			state.initializeData.data.enrollment_details.step_data.caregiver_address_proof =
				action.payload;
			state.initializeData.data.enrollment_details.current_step =
				'caregiver_details';
			// Set patient details
			state.ProgramEnrollmentData.CaregiverDetailsData.caregiver_address_proof =
				action.payload;
			state.isCareGiverAddressproofsubmited = true;
		},
		addCareGiverIdProof: (state, action) => {
			if (!state.ProgramEnrollmentData) {
				state.ProgramEnrollmentData = {};
			}
			if (!state.ProgramEnrollmentData.CaregiverDetailsData) {
				state.ProgramEnrollmentData.CaregiverDetailsData = {};
			}

			state.initializeData.data.enrollment_details.step_data.caregiver_id_proof =
				action.payload;

			state.initializeData.data.enrollment_details.current_step =
				'caregiver_details';
			state.ProgramEnrollmentData.CaregiverDetailsData.caregiver_id_proof =
				action.payload;
			state.isCareGiverIdProofSubmited = true;
		},
		setIDType: (state, action) => {
			state.idType = action.payload;
		},
		addIdProof: (state, action) => {
			// state.ProgramEnrollmentData.uploadDocumentsData.IdProof = action.payload;
			if (!state.ProgramEnrollmentData) {
				state.ProgramEnrollmentData = {};
			}
			if (!state.ProgramEnrollmentData.uploadDocumentsData) {
				state.ProgramEnrollmentData.uploadDocumentsData = {};
			}

			state.initializeData.data.enrollment_details.current_step =
				'document_upload';
			state.initializeData.data.enrollment_details.step_data.document_upload =
				action.payload;

			state.ProgramEnrollmentData.uploadDocumentsData.document_upload =
				action.payload;
			// state.isIdProofFormSubmittted = true;
		},
		addUploadOtherDocuments: (state, action) => {
			// state.ProgramEnrollmentData.uploadDocumentsData.otherDocument = action.payload;

			if (!state.ProgramEnrollmentData) {
				state.ProgramEnrollmentData = {};
			}
			if (!state.ProgramEnrollmentData.uploadDocumentsData) {
				state.ProgramEnrollmentData.uploadDocumentsData = {};
			}

			state.initializeData.data.enrollment_details.step_data.other_documents =
				action.payload;

			state.initializeData.data.enrollment_details.current_step =
				'document_upload';
			// Set patient details
			state.ProgramEnrollmentData.uploadDocumentsData.other_documents =
				action.payload;
			state.isOtherDocumentSubmittted = true;
		},

		updateAuthorization: (state, action) => {
			state.ProgramEnrollmentData.authorization = action.payload;
		},

		setisFinalSubmit: (state, action) => {
			state.isFinalSubmit = action.payload;
		},
		isMyProfileDetailsModalOpen: (state, action) => {
			state.isMyProfileDetailsModalOpen = action.payload;
		},

		setHcpProfileDetailsModal: (state, action) => {
			state.isHcpProfileDetailsModalOpen = action.payload;
		},
		isHcpPatientProfileDetailsModalOpen: (state, action) => {
			state.isHcpPatientProfileDetailsModalOpen = action.payload;
		},
		setHcpProfileData: (state, action) => {
			state.hcpPatientProfileDetails = action?.payload;
		},
		isOrderHistoryDetailsModalOpen: (state, action) => {
			state.isOrderHistoryDetailsModalOpen = action.payload;
		},
		// 	switch (action.type) {
		// 	  case ADD_PROFILE_DETAILS:
		// 		return {
		// 		  ...state,
		// 		  details: action.payload,
		// 		  isPersonalDetailsSubmited: true
		// 		};
		// 	  default:
		// 		return state;
		// 	}
		//   };

		isFinalSubmit: (state, action) => {
			state.isFinalSubmit = action.payload;
		},
		IsPersonalDetailsSubmited: (state, action) => {
			state.isPersonalDetailsSubmited = action.payload;
		},

		IsAddressproofsubmited: (state, action) => {
			state.isAddressproofsubmited = action.payload;
		},

		IsCurrentResidentialAddressSubmited: (state, action) => {
			state.isCurrentResidentialAddressSubmited = action.payload;
		},

		IsReimbursementFormSubmited: (state, action) => {
			state.isReimbursementFormSubmited = action.payload;
		},

		IsOccupationFormSubmited: (state, action) => {
			state.isOccupationFormSubmited = action.payload;
		},

		// //CareGiverDetailForm submited handling
		isCaregiverDetailsSubmited: (state, action) => {
			state.isCaregiverDetailsSubmited = action.payload;
		},

		isCareGiverAddressproofsubmited: (state, action) => {
			state.isCareGiverAddressproofsubmited = action.payload;
		},

		isCareGiverIdProofSubmited: (state, action) => {
			state.isCareGiverIdProofSubmited = action.payload;
		},
		isOtherDocumentSubmittted: (state, action) => {
			state.isOtherDocumentSubmittted = action.payload;
		},
		isIdProofFormSubmittted: (state, action) => {
			state.isIdProofFormSubmittted = action.payload;
		},
		// modals

		isRequestOrderOpen: (state, action) => {
			// state.uploadDocumentsData = action.payload;
			state.isRequestOrderOpen = true;
		},
		isRequestOrderClose: (state, action) => {
			// state.uploadDocumentsData = action.payload;
			state.isRequestOrderOpen = false;
		},

		isRequestCallBackOpen: (state, action) => {
			// state.uploadDocumentsData = action.payload;
			state.isRequestCallBackOpen = true;
		},
		isRequestCallBackClose: (state, action) => {
			// state.uploadDocumentsData = action.payload;
			state.isRequestCallBackOpen = false;
		},

		isFabButtonOpen: (state, action) => {
			// state.uploadDocumentsData = action.payload;
			state.isFabButtonOpen = true;
		},
		isFabButtonClose: (state, action) => {
			// state.uploadDocumentsData = action.payload;
			state.isFabButtonOpen = false;
		},

		isUploadInfusionCardOpen: (state, action) => {
			// state.uploadDocumentsData = action.payload;
			state.isUploadInfusionCardOpen = true;
		},
		isUploadInfusionCardClose: (state, action) => {
			// state.uploadDocumentsData = action.payload;
			state.isUploadInfusionCardOpen = false;
		},
		setAddressProofFormValid: (state, action) => {
			state.isAddressProofFormValid = action.payload;
		},
		setCurrAddressFormValid: (state, action) => {
			state.isCurrAddressFormValid = action.payload;
		},

		openIsHcpPatientDetailsModalViewOpen: (state, action) => {
			state.isHcpPatientDetailsModalViewOpen = true;
		},
		closeIsHcpPatientDetailsModalViewOpen: (state, action) => {
			state.isHcpPatientDetailsModalViewOpen = false;
		},

		// isAuthorizationSubmited: (state, action) => {
		// 	state.isIDProofFormSubmittted = action.payload;
		// },
		// close

		// toggleIsDeactivateUserModalOpen: (state) => {
		// 	state.isDeactivateUserModalOpen += !state.isDeactivateUserModalOpen;
		// },
		// openIsDeactivateUserModalOpen: (state) => {
		// 	state.isDeactivateUserModalOpen = true;
		// },
		// closeIsDeactivateUserModalOpen: (state, action) => {
		// 	state.isDeactivateUserModalOpen = false;
		// },
	},
});

export const {
	toggleRerenderInitialize,
	isAddressSameAsAboveAddress,
	ChangeNextStep,
	setCurrentPageState,
	setProgramData,
	isConfirmInfusion,
	setProgramEnrollmentData,
	setPatientDetails,
	setCaregiverDetails,
	setDocumentUploadDetails,
	setAuthorisationDetails,
	// IndividualForm Data Adding
	setInitializeData,
	addPersonalDetails,
	addAddressProof,
	addCurrentResidentialAddress,
	addReimbursementForm,
	addOccupationForm,
	addCareGiverDetails,
	addCareGiverAddressProof,
	addCareGiverIdProof,
	addIdProof,
	setIDType,
	addUploadOtherDocuments,
	updateAuthorization,
	isFinalSubmit,
	setisFinalSubmit,
	isMyProfileDetailsModalOpen,
	setHcpProfileDetailsModal,
	isHcpPatientProfileDetailsModalOpen,
	setHcpProfileData,
	isRequestOrderOpen,
	isRequestOrderClose,
	isFabButtonOpen,
	isFabButtonClose,
	isRequestCallBackOpen,
	isRequestCallBackClose,
	isUploadInfusionCardOpen,
	isHcpPatientDetailsModalViewOpen,
	isUploadInfusionCardClose,
	isProfilePageOpen,
	setHcpMenu,
	isOrderHistoryDetailsModalOpen,
	// //ProgramEnrollmentDataForm handling
	ProgramEnrollmentDataFormControl,
	setIsProgramEnrollmentDataSubmited,

	// //personalDetailForm handling

	IsPersonalDetailsSubmited,
	IsAddressproofsubmited,
	IsCurrentResidentialAddressSubmited,
	IsReimbursementFormSubmited,
	IsOccupationFormSubmited,

	// //CareGiverDetailForm handling

	isCaregiverDetailsSubmited,
	isCareGiverAddressproofsubmited,
	isCareGiverIdProofSubmited,
	isOtherDocumentSubmittted,
	isIdProofFormSubmittted,

	// parent Form
	isOccupationDetailsDataSubmited,
	isProfileDetailsDataSubmited,
	isCaregiverDetailsData,
	isUploadDocumentsDataSubmited,
	isAuthorizationSubmited,
	//******* */ close////////
	// toggleIsAddNewUserModalOpen,
	// openIsAddNewUserModalOpen,
	// closeIsAddNewUserModalOpen,

	// toggleIsDeactivateUserModalOpen,
	// openIsDeactivateUserModalOpen,
	// closeIsDeactivateUserModalOpen,
	setAddressInputDisabled,

	closeIsHcpPatientDetailsModalViewOpen,
	openIsHcpPatientDetailsModalViewOpen,

	setAddressProofFormValid,
	setCurrAddressFormValid,
} = ProgramEnrollmentSlice.actions;

// export const selectIsAddNewUserModalOpen = (state) =>
// 	state.zTemplatePage.isAddNewUserModalOpen;

// export const selectIsDeactivateUserModalOpen = (state) =>
// 	state.zTemplatePage.isDeactivateUserModalOpen;

// // select personalDetailform submit
export const selectIsAddressInputDisabled = (state) =>
	state.ProgramEnrollment.isAddressInputDisabled;

export const selectIsAddressSameAsAboveAddress = (state) =>
	state.ProgramEnrollment.isAddressSameAsAboveAddress;
export const selectSetIsFinalSubmit = (state) =>
	state.ProgramEnrollment.isFinalSubmit;
export const selectCurrentStep = (state) => state.ProgramEnrollment.currentStep;
export const selectCurrentPageState = (state) =>
	state.ProgramEnrollment.current_page_state;
export const selectProgramEnrollmentData = (state) =>
	state.ProgramEnrollment.ProgramEnrollmentData;
export const selectIsProgramEnrollmentDataSubmited = (state) =>
	state.ProgramEnrollment.isProgramEnrollmentDataSubmited;

export const selectPatientDetails = (state) =>
	state.ProgramEnrollment.patient_details;

export const selectCaregiverDetails = (state) =>
	state.ProgramEnrollment.caregiver_details;

export const selectDocumentUploadDetails = (state) =>
	state.ProgramEnrollment.document_upload_details;

export const selectIDType = (state) => state.ProgramEnrollment.idType;

export const selectAuthorizationDetails = (state) =>
	state.ProgramEnrollment.authorization_details;

export const selectIsPersonalDetailsSubmited = (state) =>
	state.ProgramEnrollment.isPersonalDetailsSubmited;

// export const { toggleRerenderInitialize } = concentSlice.actions;

export const selectToggleRerenderInitialize = (state) =>
	state.rerenderInitialize;

export const selectIsAddressproofsubmited = (state) =>
	state.ProgramEnrollment.isAddressproofsubmited;

export const selectIsCurrentResidentialAddressSubmited = (state) =>
	state.ProgramEnrollment.isCurrentResidentialAddressSubmited;

export const selectIsReimbursementFormSubmited = (state) =>
	state.ProgramEnrollment.isReimbursementFormSubmited;

export const selectIsOccupationFormSubmited = (state) =>
	state.ProgramEnrollment.isOccupationFormSubmited;

// // select CaregiverDetailsForm submit

export const selectIsCaregiverDetailsSubmited = (state) =>
	state.ProgramEnrollment.isCaregiverDetailsSubmited;

export const selectIsCareGiverAddressproofsubmited = (state) =>
	state.ProgramEnrollment.isCareGiverAddressproofsubmited;

export const selectIsCareGiverIdProofSubmited = (state) =>
	state.ProgramEnrollment.isCareGiverIdProofSubmited;

export const selectIsOtherDocumentSubmittted = (state) =>
	state.ProgramEnrollment.isOtherDocumentSubmittted;

export const selectIsIdProofFormSubmittted = (state) =>
	state.ProgramEnrollment.isIdProofFormSubmittted;
export const selectIsProfilePageOpen = (state) =>
	state.ProgramEnrollment.isProfilePageOpen;
export const selectIsHcpMenuOpen = (state) =>
	state.ProgramEnrollment.isHcpMenuOpen;

// individual Form Selection

// parent form submit flag

export const selectisProfileDetailsDataSubmited = (state) =>
	state.ProgramEnrollment.isProfileDetailsDataSubmited;
export const selectisOccupationDetailsDataSubmited = (state) =>
	state.ProgramEnrollment.isOccupationDetailsDataSubmited;
export const selectisCaregiverDetailsData = (state) =>
	state.ProgramEnrollment.isCaregiverDetailsData;
export const selectisUploadDocumentsDataSubmited = (state) =>
	state.ProgramEnrollment.isUploadDocumentsDataSubmited;
export const selectisAuthorizationSubmited = (state) =>
	state.ProgramEnrollment.isAuthorizationSubmited;

export const selectIsFinalSubmit = (state) =>
	state.ProgramEnrollment.isFinalSubmit;

export const SelectIsRequestOrderOpen = (state) =>
	state.ProgramEnrollment.isRequestOrderOpen;

export const SelectIsRequestOrderClose = (state) =>
	state.ProgramEnrollment.isRequestOrderOpen;

export const SelectIsFabButtonOpen = (state) =>
	state.ProgramEnrollment.isFabButtonOpen;

export const SelectIsRequestCallBackOpen = (state) =>
	state.ProgramEnrollment.isRequestCallBackOpen;
export const SelectIsUploadInfusionCardOpen = (state) =>
	state.ProgramEnrollment.isUploadInfusionCardOpen;
export const selectInitializeData = (state) =>
	state.ProgramEnrollment.initializeData;

export const selectProgramData = (state) => state.ProgramEnrollment.programData;
export const selectProgramEnrollmentFormData = (state) =>
	state.ProgramEnrollment.ProgramEnrollmentData;
export const selectIsMyProfileDetailsModalOpen = (state) =>
	state.ProgramEnrollment.isMyProfileDetailsModalOpen;
export const selectIsHcpProfileDetailsModalOpen = (state) =>
	state.ProgramEnrollment.isHcpProfileDetailsModalOpen;

export const selectIsHcpPatientProfileDetailsModalOpen = (state) =>
	state.ProgramEnrollment.isHcpPatientProfileDetailsModalOpen;

export const selectHcpPatientProfileData = (state) =>
	state.ProgramEnrollment.hcpPatientProfileDetails;

export const selectIsOrderHistoryDetailsModalOpen = (state) =>
	state.ProgramEnrollment.isOrderHistoryDetailsModalOpen;
export const selectIsAddressProofFormValid = (state) =>
	state.ProgramEnrollment.isAddressProofFormValid;
export const selectIsCurrAddressFormValid = (state) =>
	state.ProgramEnrollment.isCurrAddressFormValid;

export default ProgramEnrollmentSlice.reducer;

export const selectIsHcpPatientDetailsModalViewOpen = (state) =>
	state.ProgramEnrollment.isHcpPatientDetailsModalViewOpen;
