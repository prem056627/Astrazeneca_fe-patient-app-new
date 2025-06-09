import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../components/Modal/Modal';
import {
	setHcpProfileDetailsModal,
	selectIsHcpProfileDetailsModalOpen,
} from '../../pages/slice';
import HcpProfileDetails from './HcpProfileDetails';
import { useEffect, useState } from 'react';
import useApi from '../../hooks/useApi';

function MyProfileLabel() {
	return (
		<div className="flex flex-row items-center justify-between mt-10">
			<div>
				<h1 className="pb-2 font-open-sans text-lg font-semibold text-[#403939]">
					Profile
				</h1>
				<div className="h-1 w-11 rounded-full bg-primary"></div>
			</div>
		</div>
	);
}

function HcpProfileModal() {
	const dispatch = useDispatch(); // Added this line
	const triggerApi = useApi();
	const HcpProfilePageOpen = useSelector(selectIsHcpProfileDetailsModalOpen);
	const [doctorDetails, setdoctorDetails] = useState();

	function closeModal() {
		dispatch(setHcpProfileDetailsModal(false)); // Now dispatch is properly used
	}

	const getDoctorDetails = async () => {
		try {
			const { response, success } = await triggerApi({
				url: `/doctor/profile/`,
				type: 'GET',
				loader: true,
			});

			if (success && response) {
				setdoctorDetails(response.data);
			}
		} catch (error) {
			console.error('Error during API call:', error);
		}
	};

	useEffect(() => {
		if (HcpProfilePageOpen) {
			getDoctorDetails();
		}
	}, [HcpProfilePageOpen]);

	return (
		<Modal
			label={<MyProfileLabel />}
			labelType="center"
			show={HcpProfilePageOpen}
			closeModal={closeModal}
			ModalBody={<HcpProfileDetails doctorDetails={doctorDetails} />}
			type="center"
			isCloseVisible={false}
			isBackVisible={true}
		/>
	);
}

export default HcpProfileModal;
