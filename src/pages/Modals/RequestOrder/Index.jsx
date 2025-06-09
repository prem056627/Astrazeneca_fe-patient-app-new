import React from 'react';
// import RequestOrderModalForm from './RequestOrderForm';
import { useTranslation } from 'react-i18next';
import Modal from '../../../components/Modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { SelectIsRequestOrderOpen, closeRequestOrderModal, isRequestOrderClose } from '../../slice';
import RequestOrderModalForm from './RequestOrderModalForm';
import RequestCallBackForm from '../RequestCallback/RequestCallBackForm';

function RequestOrderModal({ fetchProgramDetails }) {
    const isRequestOrderOpen = useSelector(SelectIsRequestOrderOpen); // Correct usage of selector
    const dispatch = useDispatch(); // Get the dispatch function from useDispatch
    const {t} = useTranslation();

    function closeModal() {
        dispatch(isRequestOrderClose());
         // Dispatch the close action
        console.log("Modal closed");
        console.log('hi')
    }

    return (
        <Modal
            label={t('request_order.modal.title')}
            labelType="center"
            show={isRequestOrderOpen}
            closeModal={closeModal}
            ModalBody={<RequestOrderModalForm  fetchProgramDetails={fetchProgramDetails} />}
            // ModalBody={< RequestCallBackForm />}
           
            type="center"
            isCloseVisible={true}
        />
    );
}

export default RequestOrderModal;
