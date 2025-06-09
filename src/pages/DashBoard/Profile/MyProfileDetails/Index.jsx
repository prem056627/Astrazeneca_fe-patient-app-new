import React from 'react';
import { useTranslation } from 'react-i18next';
import Modal from '../../../../components/Modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectIsProfilePageOpen,
	closeRequestOrderModal,
	isRequestOrderClose,
	isProfilePageOpen,
	selectIsMyProfileDetailsModalOpen,
	isMyProfileDetailsModalOpen,
	selectProgramEnrollmentFormData,
} from '../../../slice';
// import RequestOrderModalForm from './RequestOrderModalForm';
// import RequestCallBackForm from '../RequestCallback/RequestCallBackForm';
// import ProfileModalForm from './ProfileModalForm';
import MyProfileDetails from './MyProfileDetails';

function MyProfileLabel() {
	const { t } = useTranslation();
	return (
		<div className=' flex flex-row justify-between items-center'>
            <div>
			<h1 className="pb-2 font-open-sans text-2xl font-semibold text-[#403939]">
				{t('my_profile.title')}
			</h1>
			<div className="h-1.5 w-11 rounded-full bg-primary"></div>
		</div>
        {/* <button className='text-lg text-primary'>Edit</button> */}
        </div>
	);
}
function MyProfileModal() {
	const myProfilePageOpen = useSelector(selectIsMyProfileDetailsModalOpen);
	// const enrollmentData = useSelector(selectProgramEnrollmentFormData)
	const dispatch = useDispatch();

	function closeModal() {
		dispatch(isMyProfileDetailsModalOpen(false));
		// console.log("Modal closed");
	}

	return (
		<Modal
			label={<MyProfileLabel />}
			labelType="center"
			show={myProfilePageOpen}
			closeModal={closeModal}
			ModalBody={<MyProfileDetails />}
			// ModalBody={< RequestCallBackForm />}
			// isScroll = {false}
			type="center"
			isCloseVisible={true}
		/>
	);
}

export default MyProfileModal;
