// import { useParams } from 'react-router-dom';
// import Modal from '../../../../../components/Modal';
// import AccentrixConsentForm from './AccentrixConsentForm';
// import ConsentForm from './ConsentForm';
// import TransplantConsentForm from './TransplantConsentForm';
// import UmaangConsentForm from './UmaangConsentForm';
import { useDispatch, useSelector } from 'react-redux';
import { selectInitializeData, setInitializeData } from '../../slice';

import { useEffect, useState } from 'react';
import ConcentForm from './ConcentForm';
import EnrollSuccess from './EnrollSuccess';


function Consent({ setCurrentState, currentState }) {
	const [isOpen, setIsOpen] = useState(true);
	const [currPage, setCurrPage] = useState('enroll_success');


	useEffect(() => {
		if (currentState) {
			setIsOpen(true);
			setCurrPage('enroll_success');
		}
	}, [currentState]);


	return (
		<>
			{currentState && (
				// <Modal
				// 	label={
				// 		<p className=" text-start text-[20px] font-black text-black ">
				// 			Terms and Conditions
				// 		</p>
				// 	}
				// 	show={isOpen}
				// 	closeModal={() => {}}
				// 	isCloseVisible={false}
				// 	ModalBody={
				// {
				// 	onemgnvst004: <TransplantConsentForm />,
				// 	onemgnvscommon: <UmaangConsentForm />,
				// 	onemgnvst003: <AccentrixConsentForm />,
				// }[tenantCode]
				<>
					{currPage == 'enroll_success' ? (
						<EnrollSuccess setCurrPage={setCurrPage} />
					) : (
						<ConcentForm
							setIsOpen={setIsOpen}
							setCurrentState={setCurrentState}
							currentState={currentState}
						/>
					)}
				</>
				// }
				// 	type="large"
				// />
			)}
		</>
	);
}

export default Consent;
