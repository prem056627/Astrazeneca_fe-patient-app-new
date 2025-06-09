import React from 'react';
import { useTranslation } from 'react-i18next';
import { ReactComponent as DropDownTickIcon } from '../../assets/images/svg/Form-dropDownTick-icon.svg';
import { ReactComponent as EnrollmentSucess } from '../../assets/images/svg/EnrollmentSucess.svg';
import { useSelector } from 'react-redux';
import { selectInitializeData } from '../slice';
import ReuploadPrescription from '../../components/Cards/ReuploadPrescription';


function ProgramEnrollmentSucess() {
	const { t } = useTranslation();
	const initializeData = useSelector(selectInitializeData);
console.log(initializeData);
	return (
		<>
		{initializeData?.is_document_status === false ? <ReuploadPrescription /> : (
				<div className="mx-5 rounded-xl bg-[#BE2BBB] pb-1 ">
					<div className=" rounded-lg border border-[#DBDBDB] bg-white ">
						<div className="px-4">
							<div className="flex flex-row gap-2 py-8">
								<DropDownTickIcon className="h-6 w-6" />
								<p className="w-full font-open-sans text-sm">
									{t('program_enrollment_success.notification.message')}
									<span className="text-[#BE2BBB]">
										{t('program_enrollment_success.notification.highlight1')}
									</span>{' '}
									{t('program_enrollment_success.notification.by')}{' '}
									<span className="text-[#BE2BBB]">
										{t('program_enrollment_success.notification.highlight2')}
									</span>
									{t('program_enrollment_success.notification.continuation')}
								</p>
							</div>
							<div>
								<h1 className="font- py-2 font-open-sans text-4xl text-[#595454]">
									{t('program_enrollment_success.status.title')}
								</h1>
								<h2 className="font-open-sans text-lg italic text-[#CDCCCC]">
									{t('program_enrollment_success.status.subtitle')}
								</h2>
								<div className="flex items-center justify-center">
									<EnrollmentSucess className="text-center" />
								</div>
							</div>
						</div>
					</div>
				</div>
		)

		}


      

			<div className="mx-5  ">
				<h1 className="py-5 font-open-sans text-2xl font-semibold text-[#283A46]">
					{t('program_enrollment_success.about.title')}
					<span className="text-[#BE2BBB]">
						{initializeData?.data?.program_name == 'Opdyta' ? t('program_enrollment_success.about.program_name') : t('program_enrollment_success.about.program_name_rojuzda')}
					</span>
				</h1>
				<p className="font-open-sans text-base font-normal text-[#283A46]">
					{initializeData?.data?.program_name == 'Opdyta' ? t('program_enrollment_success.about.description') : t('program_enrollment_success.about.description_rojuzda')}
				</p>
			</div>
		</>
	);
}

export default ProgramEnrollmentSucess;
