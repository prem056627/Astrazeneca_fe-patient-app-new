import React from 'react';
import { useTranslation } from 'react-i18next';
import Modal from '../../../components/Modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
// import { SelectIsRequestOrderOpen, closeRequestOrderModal, isRequestOrderClose } from '../../slice';
// import RequestOrderModalForm from './RequestOrderModalForm';
import RequestCallBackForm from './RequestCallBackForm';
import { SelectIsRequestCallBackOpen, isRequestCallBackClose } from '../../slice';
// import RequestCallBackForm from '../RequestCallback/RequestCallBackForm';

function RequestCallBackModal() {
    const { t } = useTranslation();
    const isRequestCallBackOpen = useSelector(SelectIsRequestCallBackOpen); 
    const dispatch = useDispatch(); // Get the dispatch function from useDispatch

    function closeModal() {
        dispatch(isRequestCallBackClose()); 
        console.log("Modal closed");
    }

    return (
        <Modal
            label={t('request_callback.modal.title')}
            labelType="center"
            show={isRequestCallBackOpen}
            closeModal={closeModal}
            // ModalBody={<RequestOrderModalForm />}
            ModalBody={< RequestCallBackForm />}
           
            type="center"
            isCloseVisible={true}
        />
    );
}

export default RequestCallBackModal;
