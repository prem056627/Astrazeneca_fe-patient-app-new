import { ReactComponent as BrandIcon } from '../../assets/images/svg/brand-logo.svg';

import { ReactComponent as DropDownIcon } from '../../assets/images/svg/Form-dropDown-icon.svg';
import { ReactComponent as DropDownTickIcon } from '../../assets/images/svg/Form-dropDownTick-icon.svg';
import { Disclosure } from '@headlessui/react';
import React, { useState } from 'react';

import {
	
	
	selectIsIdProofFormSubmittted,
	selectIsOtherDocumentSubmittted,
} from '../slice/index';
import { useSelector } from 'react-redux';
import OtherDocumentsForm from './OtherDocumentsForm';
import IdProofForm from './IdProofForm';
import { useTranslation } from 'react-i18next';

const UploadDocumentsForm = () => {
	const {t} = useTranslation()
	const OtherDocumentSubmittted = useSelector(selectIsOtherDocumentSubmittted);
	const IdProofSubmited = useSelector(selectIsIdProofFormSubmittted)

	const [step, setStep] = useState(1);

	return (
		<>
			<div className="w-full">
				<div className="mx-auto w-full max-w-md rounded-2xl bg-white pb-30">
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
											{t('id_proof_accordion_title')}
										</span>

										<DropDownTickIcon
											className={`${
												IdProofSubmited ? `block` : `hidden`
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
									<IdProofForm setStep={setStep} closeAccordion={close} />
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
											{t('other_documents_accordion_title')}
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
									<OtherDocumentsForm setStep={setStep} closeAccordion={close} />
								</Disclosure.Panel>
							</>
						)}
					</Disclosure>
				</div>
			</div>
		</>
	);
};

export default UploadDocumentsForm;
