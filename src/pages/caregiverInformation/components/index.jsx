import { ReactComponent as BrandIcon } from '../../../assets/images/svg/brand-logo.svg';

import { ReactComponent as DropDownIcon } from '../../../assets/images/svg/Form-dropDown-icon.svg';
import { ReactComponent as DropDownTickIcon } from '../../../assets/images/svg/Form-dropDownTick-icon.svg';
import { Disclosure } from '@headlessui/react';
import React, { useState, useEffect } from 'react';
import CaregiverDetailsForm from './CaregiverDetailsForm';
import AddressProofForm from './AddressProofForm';
import CareGiverIdProofForm from './CareGiverIdProofForm';
// import OtherDocumentsForm from './OtherDocumentsForm';

import {
	selectIsCareGiverAddressproofsubmited,
	selectIsCareGiverIdProofSubmited,
	selectIsCaregiverDetailsSubmited,
	selectInitializeData,
	isCaregiverDetailsData,
	// selectIsOtherDocumentSubmittted,
} from '../../slice/index';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const CareGiverDetailsForm = () => {
	const {t} = useTranslation()
	const dispatch = useDispatch()
	const CaregiverDetailsSubmited = useSelector(
		selectIsCaregiverDetailsSubmited
	);

	const CareGiverAddressproofsubmited = useSelector(
		selectIsCareGiverAddressproofsubmited
	);

	const CareGiverIdProofSubmited = useSelector(
		selectIsCareGiverIdProofSubmited
	);

	const initialData = useSelector(selectInitializeData);


	// const OtherDocumentSubmittted = useSelector(selectIsOtherDocumentSubmittted);

	const [step, setStep] = useState(1);

	useEffect(()=>{
		dispatch(isCaregiverDetailsData(true));
	},[])

	return (
		<>
			<div className="w-full  ">
				<div className="mx-auto w-full max-w-md rounded-2xl bg-white pb-30">
					<Disclosure
						as="div"
						defaultOpen={
							initialData?.response?.enrollment_details?.current_step ===
							'caregiver_details'
						}
						className={`${
							'oppacity-100'
						}  mt-2 pt-10`}
					>
						{({ open, close }) => (
							<>
								<Disclosure.Button className="flex w-full items-center justify-between  bg-white px-6 py-6  text-left text-sm font-medium text-black shadow-md hover:bg-white focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
									<div className="flex items-center justify-center gap-4">
										<span className="text-base font-bold text-[#283A46]">
											{t('caregiver_accordion_title')}
										</span>

										<DropDownTickIcon
											className={`${
												CaregiverDetailsSubmited ? `block` : `hidden`
											} h-6 w-6 `}
										/>
									</div>
									<DropDownIcon
										className={`${open ? 'rotate-180 transform' : ''} h-8 w-8 `}
									/>
								</Disclosure.Button>
								<Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
									<CaregiverDetailsForm
										setStep={setStep}
										closeAccordion={close}
									/>
								</Disclosure.Panel>
							</>
						)}
					</Disclosure>

					<Disclosure
						as="div"
						className={`${
							 'oppacity-100'
						}  mt-2 `}
					>
						{({ open, close }) => (
							<>
								<Disclosure.Button className="flex w-full justify-between   bg-white px-6 py-6  text-left text-sm font-medium text-black shadow-md hover:bg-white  focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
									<div className="flex items-center justify-center gap-4">
										<span className="text-base font-bold text-[#283A46]">
										{t('caregiver_address_title')}
										</span>

										<DropDownTickIcon
											className={`${
												CareGiverAddressproofsubmited ? `block` : `hidden`
											} h-6 w-6 `}
										/>
									</div>
									<DropDownIcon
										className={`${
											open ? 'rotate-180 transform ' : ''
										} h-8 w-8 `}
									/>
								</Disclosure.Button>
								<Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
									{/* <AddressProofForm
										setAddressproofsubmited={setAddressproofsubmited}
										
									/> */}
									<AddressProofForm setStep={setStep} closeAccordion={close} />
								</Disclosure.Panel>
							</>
						)}
					</Disclosure>

					<Disclosure
						as="div"
						className={`${
							'oppacity-100'
						}  mt-2 `}
					>
						{({ open, close }) => (
							<>
								<Disclosure.Button className="flex w-full justify-between   bg-white px-6 py-6  text-left text-sm font-medium text-black shadow-md hover:bg-white  focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
									<div className="flex items-center justify-center gap-4">
										<span className="text-base font-bold text-[#283A46]">
										{t('caregiver_id_proof_title')}
										</span>

										<DropDownTickIcon
											className={`${
												CareGiverIdProofSubmited ? `block` : `hidden`
											} h-6 w-6 `}
										/>
									</div>
									<DropDownIcon
										className={`${
											open ? 'rotate-180 transform ' : ''
										} h-8 w-8 `}
									/>
								</Disclosure.Button>
								<Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
									<CareGiverIdProofForm
										setStep={setStep}
										closeAccordion={close}
									/>
								</Disclosure.Panel>
							</>
						)}
					</Disclosure>

					{/* <Disclosure
						as="div"
						className={`${step !== 4 ? 'opacity-30' : 'oppacity-100'}  mt-2 `}
					>
						{({ open }) => (
							<>
								<Disclosure.Button className="flex w-full justify-between   bg-white px-6 py-6  text-left text-sm font-medium text-black shadow-md hover:bg-white  focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
									<div className="flex items-center justify-center gap-4">
										<span className="text-base font-bold text-[#283A46]">
											Other Documents
										</span>

										<DropDownTickIcon
											className={`${
												OtherDocumentSubmittted ? `block` : `hidden`
											} h-6 w-6 `}
										/>
									</div>
									<DropDownIcon
										className={`${
											open ? 'rotate-180 transform ' : ''
										} h-8 w-8 `}
									/>
								</Disclosure.Button>
								<Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
									<OtherDocumentsForm setStep={setStep} />
								</Disclosure.Panel>
							</>
						)}
					</Disclosure> */}
				</div>
			</div>
		</>
	);
};

export default CareGiverDetailsForm;
