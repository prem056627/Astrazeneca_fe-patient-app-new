import React from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import ProfileDetails from './ProfileDetails';
// import { isRequestCallBackOpen } from '../../slice';

function ProfileModalForm() {
    const { t } = useTranslation();

    const handleLogout = () => {
        localStorage.clear();
			// eslint-disable-next-line no-undef
			// const isAppOnWeb = view;	
			// if (isAppOnWeb == 'web') {
			// 	window.location.href = '/logout'
			// }

        let message = {
            label: 'LOGOUT',
        };

        let stringifiedMessage = JSON.stringify(message);

			// Comment it in desktop !!!!
        if (window.ReactNativeWebView) {
            window.ReactNativeWebView.postMessage(stringifiedMessage);
        } else {
            console.log(t('profile_modal.compatibility_error'));
        }
    };
    return (
		<div className=" relative  h-auto overflow-scroll">
            <ProfileDetails />
            <div className="fixed bottom-0 left-0 w-full py-7 pb-20 text-center">
                <p className="font-open-sans text-sm font-semibold text-[#595454]">
					{' '}
                    <button
                        onClick={handleLogout}
                        className="font-open-sans text-base font-bold text-[#D41A41]"
                    >
                        {t('profile_modal.logout')}
                    </button>
                </p>
            </div>
        </div>
    );
}

export default ProfileModalForm