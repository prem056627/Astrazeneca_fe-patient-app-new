

import React from 'react';
// import RequestOrderModalForm from './RequestOrderForm';
import Modal from '../../../components/Modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsProfilePageOpen, closeRequestOrderModal, isRequestOrderClose, isProfilePageOpen } from '../../slice';
// import RequestOrderModalForm from './RequestOrderModalForm';
// import RequestCallBackForm from '../RequestCallback/RequestCallBackForm';
import ProfileModalForm from './ProfileModalForm';

function ProfileModal() {
    const profilePageOpen = useSelector(selectIsProfilePageOpen); 
    const dispatch = useDispatch(); 

    function closeModal() {
        dispatch(isProfilePageOpen(false)); // Dispatch the close action
        console.log("Modal closed");
    }

    return (
        <Modal
            // label={'Profile'}
            labelType="center"
            show={profilePageOpen}
            closeModal={closeModal}
            ModalBody={<ProfileModalForm />}
            // ModalBody={< RequestCallBackForm />}
            // isScroll = false"
            type="center"
            isCloseVisible={true}
        />
    );
}

export default ProfileModal;
