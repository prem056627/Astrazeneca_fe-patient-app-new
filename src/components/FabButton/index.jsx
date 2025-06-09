import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import FabModal from './FabModal';
import { SelectIsFabButtonOpen, isFabButtonClose } from '../../pages/slice';
import FabModalBody from './FabModalBody';

function FabButtonModal() {
    const isFabButtonOpen = useSelector(SelectIsFabButtonOpen); 
    const dispatch = useDispatch(); 
console.log("hi from fabButton modal");
    function closeModal() {
        dispatch(isFabButtonClose()); 
        console.log("Modal closed");
    }
    console.log(" is FabButton is open ",isFabButtonOpen);

    return (
        <FabModal
           
            show={isFabButtonOpen}
            closeModal={closeModal}
            ModalBody={<FabModalBody/>} 
            isCloseVisible={true} 
        />
    );
}

export default FabButtonModal;
