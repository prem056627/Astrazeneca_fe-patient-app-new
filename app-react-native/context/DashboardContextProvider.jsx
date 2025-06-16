import React, { createContext, useContext, useReducer } from "react";

const initialDashboardState = {
  contextData: {},
  patientLoginData: {
    request_id: "",
    mobile: "",
    currentStep: "verify_username",
    isSignupUser: false,
    termAndConditions: false,
    isUserExist: true,
  },
  curr_role_id: 375,
  authData: {},
};

const DashboardContext = createContext({ ...initialDashboardState });

const DashboardDispatchContext = createContext(() => {});

function dashboardReducer(dashboard, action) {
  switch (action.type) {
		case 'SET_CONTEXT': {
			return {
				...dashboard,
				contextData: action.payload,
			};
		}
		case 'SET_PATIENT_LOGIN_DATA': {
			return {
				...dashboard,
				patientLoginData: action.payload,
			};
		}
		case 'SET_AUTH_DATA': {
			return {
				...dashboard,
				authData: action.payload,
			};
		}
		case 'SET_CURRENT_ROLE': {
			return {
				...dashboard,
				curr_role_id: action.payload,
			};
		}
	}
}

export function DashboardContextProvider({ children }) {
  const [dashboardState, dispatch] = useReducer(
    dashboardReducer,
    initialDashboardState
  );

  return (
    <DashboardContext.Provider value={dashboardState}>
      <DashboardDispatchContext.Provider value={dispatch}>
        {children}
      </DashboardDispatchContext.Provider>
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  return useContext(DashboardContext);
}

export function useDashboardDispatch() {
  return useContext(DashboardDispatchContext);
}
