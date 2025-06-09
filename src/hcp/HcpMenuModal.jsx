import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setHcpMenu, selectIsHcpMenuOpen } from '../pages/slice';
import HcpMenuDetails from './HcpMenuDetails';
import Modal from '../components/Modal/Modal';

function HcpProfile() {
	return (
		<div className=" flex flex-row items-center justify-between">
			<div>
				<h1 className="pb-2 font-open-sans text-lg font-bold text-[]">Menu</h1>
			</div>
		</div>
	);
}
function HcpMenuModal() {
	const IsHcpMenuisOpen = useSelector(selectIsHcpMenuOpen);

	const dispatch = useDispatch();

	function closeModal() {
		dispatch(setHcpMenu(false));
	}

	return (
		<Modal
			label={<HcpProfile />}
			labelType="center"
			show={IsHcpMenuisOpen}
			closeModal={closeModal}
			ModalBody={<HcpMenuDetails />}
			type="center"
			isCloseVisible={true}
		/>
	);
}

export default HcpMenuModal;
