import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../../../components/Modal/Modal';
import {
	isOrderHistoryDetailsModalOpen,
	selectIsOrderHistoryDetailsModalOpen
} from '../../../slice';
// import RequestOrderModalForm from './RequestOrderModalForm';
// import RequestCallBackForm from '../RequestCallback/RequestCallBackForm';
// import ProfileModalForm from './ProfileModalForm';
// import MyProfileDetails from './MyProfileDetails';
import OrderHistoryDetails from './OrderHistoryDetails';

function MyProfileLabel() {
    const { t } = useTranslation();
	return (
		<div className=' flex flex-row justify-between items-center'>
            <div>
			<h1 className="pb-2 font-open-sans text-2xl font-semibold text-[#403939]">
                {t('order_history.title')}
			</h1>
			<div className="h-1.5 w-11 rounded-full bg-primary"></div>
		</div>
       
        </div>
	);
}
function OrderHistoryModal() {
    const dispatch = useDispatch();
    const OrderHistoryDetailsModalOpen = useSelector(selectIsOrderHistoryDetailsModalOpen)
	
	// const dispatch = useDispatch();

	function closeModal() {
		dispatch(isOrderHistoryDetailsModalOpen(false));

	}

	return (
		<Modal
			label={<MyProfileLabel />}
			labelType="center"
			show={OrderHistoryDetailsModalOpen}
            // show={true}

			closeModal={closeModal}
			ModalBody={<OrderHistoryDetails />}
			// ModalBody={< RequestCallBackForm />}
			// isScroll = {false}
			type="center"
			isCloseVisible={true}
		/>
	);
}

export default OrderHistoryModal;
