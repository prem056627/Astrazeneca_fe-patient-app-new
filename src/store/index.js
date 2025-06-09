import { configureStore } from '@reduxjs/toolkit';

import ProgramEnrollmentReducer from '../pages/slice/index';

export default configureStore({
	reducer: {
		ProgramEnrollment: ProgramEnrollmentReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
		  serializableCheck: false,
		}),
});
