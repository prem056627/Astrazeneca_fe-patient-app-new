// import React from 'react'

// function ConfirmInfusionModal() {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default ConfirmInfusionModal



import { ReactComponent as ModalCloseIcon } from '../../../assets/images/svg/FabButton/Fab_close_icon.svg';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import MultiFileUpload from '../../../components/Form/MultiFileUpload';
import ConfirmInfusionFormUpload from './ConfirmInfusionFormUpload';
import { isConfirmInfusion, isUploadInfusionCardClose } from '../../slice';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
// import { useDispatch, useSelector } from 'react-redux';
// import { ReactComponent as UnsavedChangeIcon } from '../../../../assets/images/svg/unsaved-change-icon.svg';
// import {
// 	closeIsCloseEnrollFormInBetweenModalOpen,
// 	selectCloseEnrollFormInBetweenModalCallback,
// 	selectIsCloseEnrollFormInBetweenModalOpen,
// } from '../../slice';

const UploadInfusionForm = ({ fetchProgramDetails }) => {
	const { t } = useTranslation();
	// const closeEnrollFormInBetweenModalCallback = useSelector(
	// 	selectCloseEnrollFormInBetweenModalCallback
	// );

	// function UploadInfusionForm() {
	// 	// closeModal();
	// 	// if (closeEnrollFormInBetweenModalCallback) {
	// 	// 	closeEnrollFormInBetweenModalCallback();
	// 	// }
	// }

	return (
		<div className="flex flex-grow flex-col justify-between gap-[16px]">
			<div className="flex flex-col items-center gap-[20px] bg-[#F6F4F3]">
				{/* <UnsavedChangeIcon /> */}
				<div className="flex flex-col justify-center gap-[8px] ">
					<h4 className="p-6 text-center font-open-sans text-[20px] font-semibold text-[#24224A] ">
						{t('upload_infusion_card.title')}
					</h4>
				</div>
			</div>
			<ConfirmInfusionFormUpload fetchProgramDetails={fetchProgramDetails} />
		</div>
	);
};

export default function ConfirmInfusionModal({
	isCloseVisible = true,
	show = true,
	closeModal,
	fetchProgramDetails,
}) {
	// const isCloseEnrollFormInBetweenModalOpen = useSelector(
	// 	selectIsCloseEnrollFormInBetweenModalOpen
	// );
	// console.log(isCloseEnrollFormInBetweenModalOpen);
	// const dispatch = useDispatch();
	const dispatch = useDispatch();
	function closeModal() {
		dispatch(isUploadInfusionCardClose());
		console.log('Modal closed');
	}

	return (
		<>
			<Transition appear show={show} as={Fragment}>
				<Dialog as="div" className="relative z-40" onClose={() => {}}>
					<Transition.Child
						as={Fragment}
						enter="ease-in-out duration-700"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in-out duration-700"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black bg-opacity-[.67]" />
					</Transition.Child>

					<Transition.Child
						as={Fragment}
						enter="transform transition ease-in-out duration-500"
						enterFrom="translate-y-full"
						enterTo="translate-y-0"
						leave="transform transition ease-in-out duration-500"
						leaveFrom="translate-y-0"
						leaveTo="translate-y-full"
					>
						<div className="fixed inset-0 flex items-end justify-end overflow-y-auto ">
							{isCloseVisible ? (
								<div className="absolute right-0 top-0  flex justify-end  ">
									<button
										type="button"
										className="absolute right-[4vw] top-[35vh] z-0 flex  justify-end focus:outline-none xxsm:top-[49vh] xxxsm:top-[52vh]"
										onClick={closeModal}
									>
										<ModalCloseIcon />
									</button>
								</div>
							) : null}
							<div className="flex max-w-[498px] grow items-center justify-center text-center">
								<Dialog.Panel className="relative flex h-full min-h-[389px] w-full transform flex-col items-end gap-[32px] overflow-hidden rounded-t-2xl  bg-white text-left align-middle shadow-xl transition-all md:items-center md:px-[32px] md:pt-[32px]">
									<div className="container flex max-w-[864px] grow flex-col gap-[24px]">
										<UploadInfusionForm
											fetchProgramDetails={fetchProgramDetails}
											// closeModal={closeModal}
										/>
									</div>
								</Dialog.Panel>
							</div>
						</div>
					</Transition.Child>
				</Dialog>
			</Transition>
		</>
	);
}
