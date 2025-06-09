import React from 'react';
import { useTranslation } from 'react-i18next';
import { ReactComponent as BrandIcon } from '../../../assets/images/svg/brand-logo.svg';
import { ReactComponent as ShambhavIcon } from '../../../assets/images/svg/shambhav_icon.svg';
import { ReactComponent as AarambhIcon } from '../../../assets/images/svg/aarambh_icon.svg';
import {
	selectInitializeData,
} from '../../slice';
import { useSelector } from 'react-redux';


const EnrollSuccess = ({ setCurrPage }) => {
	const { t } = useTranslation();
	const initialData = useSelector(selectInitializeData);

	return (
		<div className="flex h-full items-center justify-center bg-gray-50">
			<div className="relative h-full w-full  rounded-lg bg-white p-4">
				<div className="flex flex-col items-center">
					<div className="fixed top-0 left-0 z-20 flex w-full items-center justify-center bg-white p-6 pt-11">
						<BrandIcon className="h-[32px] min-h-[32px]" />
					</div>
					<div className="mb-6 mt-24 text-center">
						<div className="flex justify-center">
							<svg
								width="58"
								height="57"
								viewBox="0 0 58 57"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<g id="Group 3">
									<circle
										id="Oval"
										opacity="0.47"
										cx="29"
										cy="28.5"
										r="28.5"
										fill="#D2ECD1"
									/>
									<circle
										id="Oval_2"
										cx="28.9999"
										cy="28.4999"
										r="18.1364"
										stroke="#1EA41D"
									/>
									<path
										id="Icon"
										d="M37.6132 20.3347C38.0448 19.8884 38.7446 19.8884 39.1763 20.3347C39.6079 20.781 39.6079 21.5047 39.1763 21.951L25.9131 35.6653C25.4815 36.1116 24.7817 36.1116 24.35 35.6653L18.8237 29.951C18.3921 29.5047 18.3921 28.781 18.8237 28.3347C19.2554 27.8884 19.9552 27.8884 20.3868 28.3347L25.1316 33.2409L37.6132 20.3347Z"
										fill="#1EA41D"
									/>
								</g>
							</svg>
						</div>
						<h1 className="mt-4 text-xl font-semibold text-gray-700">
							{t('enroll_success.title')}
						</h1>
						<p className="mt-2 text-[16px] font-bold text-[#595454]">
							{t('enroll_success.subtitle')}
						</p>
						<p className="mt-2 text-xs">
							{t('enroll_success.description')}
						</p>
					</div>
					<div className="w-full">
						<h2 className="mb-2 text-lg text-center font-medium text-gray-700">
							{t('enroll_success.program.title')}
						</h2>
						<div className="space-y-3">
							<div className="flex items-center justify-center">
								<span className="text-gray-700">
									{initialData?.data?.program_name == 'Opdyta' ? (
										<ShambhavIcon />
									) : (
										<AarambhIcon />
									)}
								</span>
							</div>
						</div>
					</div>
					<div className="absolute bottom-[16px] left-0 w-full px-[24px]">
						<button
							onClick={() => setCurrPage('consent')}
							className="mt-6 w-full rounded-md bg-[#BE2BBB] px-[16px] py-[14px] text-[14px] font-bold text-white focus:outline-none"
						>
							{t('enroll_success.buttons.get_started')}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EnrollSuccess;
