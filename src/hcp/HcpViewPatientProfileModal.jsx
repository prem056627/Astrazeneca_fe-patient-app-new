import { Menu, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ReactComponent as TableRowKebabIcon } from '../assets/images/svg/menu/add-user-icon.svg';
// import { isHcpPatientProfileDetailsModalOpen, openIsHcpPatientDetailsModalViewOpen } from '../pages/slice';
import { usePopper } from 'react-popper';
import { isHcpPatientProfileDetailsModalOpen, setHcpProfileData } from '../pages/slice';

export default function HcpViewPatientProfileModal({ data }) {
	const [referenceElement, setReferenceElement] = useState(null);
	const [popperElement, setPopperElement] = useState(null);

	const { styles, attributes } = usePopper(referenceElement, popperElement, {
		placement: 'bottom-end',
		modifiers: [
			{
				name: 'offset',
				options: {
					offset: [0, 8],
				},
			},
		],
	});

	const dispatch = useDispatch();

	// const handleEditAddress = (payload) => {
	// 	dispatch(openIsHcpPatientDetailsModalViewOpen(payload));
	// };

	function ShowHcpPatientProfileDetails() {
		dispatch(setHcpProfileData(data));
		console.log('data', data);
		
		dispatch(isHcpPatientProfileDetailsModalOpen(true));
	}

	return (
		<Menu as="div" className="relative flex">
			<Menu.Button ref={(ref) => setReferenceElement(ref)}>
				<TableRowKebabIcon className="text-[#5048ED]" />
			</Menu.Button>
			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
				ref={(ref) => setPopperElement(ref)}
				style={styles['popper']}
				{...attributes['popper']}
			>
				<Menu.Items className="absolute top-[30px] right-0 z-10 w-[130px] bg-white shadow-lg">
					<div className="p-[4px]">
						<Menu.Item>
							{({ active }) => (
								<button
									type="button"
									className={`flex w-full justify-center ${
										active ? 'bg-[#F0F3F4]' : ''
									}`}
									onClick={() => ShowHcpPatientProfileDetails(data)}
								>
									<div className="flex flex-col rounded-[2px] px-[16px] py-[18px]">
										<span className="font-inter font-semibold text-black">
											View Deatils
										</span>
									</div>
								</button>
							)}
						</Menu.Item>
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	);
}
