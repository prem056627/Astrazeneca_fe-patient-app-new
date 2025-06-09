import React from 'react';
import { useTranslation } from 'react-i18next';
import { Disclosure } from '@headlessui/react';
// import { ReactComponent as DropDownIcon } from '../../../assets/images/svg/Form-dropDown-icon.svg';
import { ReactComponent as ProfileChevoron } from '../../../assets/images/svg/ProfileChevron.svg';
import { useDispatch } from 'react-redux';
import {
	isMyProfileDetailsModalOpen,
	isOrderHistoryDetailsModalOpen,
} from '../../slice';
// import MyProfile from './MyProfile';

function ProfileDetails() {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	function ShowMyProfileDetails() {
		dispatch(isMyProfileDetailsModalOpen(true));
	}

	function ShowOderHistoryDetails() {
		dispatch(isOrderHistoryDetailsModalOpen(true));
	}
	return (
		<div>
			<div>
				<h1 className="pb-2 font-open-sans text-3xl font-semibold text-[#403939]">
					{t('profile.title')}
				</h1>
				<div className="h-1.5 w-11 rounded-full bg-primary"></div>
			</div>

			<div className="mx-auto w-full max-w-md rounded-2xl bg-white pt-12 ">
				<button
					onClick={ShowMyProfileDetails}
					className="flex w-full flex-row items-center justify-between py-6 px-4 shadow-md"
				>
					<p className="text-base font-bold text-[#283A46]">{t('profile.sections.my_profile')}</p>
					<ProfileChevoron className="h-8 w-8" />
				</button>

				<button
					onClick={ShowOderHistoryDetails}
					className="flex w-full flex-row items-center justify-between py-6 px-4 shadow-md  "
				>
					<p className="text-base font-bold text-[#283A46]">{t('profile.sections.order_history')}</p>
					<ProfileChevoron className="h-8 w-8" />
				</button>

				<button className="flex w-full flex-row py-6  "></button>
			</div>
		</div>
	);
}

export default ProfileDetails;
