import { Navigate, Route, Routes } from 'react-router-dom';
// import PatientInformation from '../components/patientInformation';
// import CareGiverDetailsForm from '../../caregiverInformation/components';
import ProgramEnrollMentForm from '../Index';
import personalDeatilSubmitedSucess from '../ProgramEnrollmentSuccess/index';
import PersonalDeatilSubmitedSucess from '../ProgramEnrollmentSuccess/index';

export const PatientInformationRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<ProgramEnrollMentForm/>} />
			<Route path="*" element={<Navigate to="/" />} />
		</Routes>
	);
};

