import { ReactComponent as DropDownTickIcon } from '../assets/images/svg/Form-dropDownTick-icon.svg';

export const INITIATE_EYC_MENU_ITEMS = [];

export const SHOW_PROFILE_MENU_ITEMS = [];

export const TOAST_ERROR_CONFIG = {
	position: 'top-right',
	style: {
		borderBottom: '3px solid #D52918',
		fontFamily: 'open sans',
		fontSize: '14px',
		paddingTop: '20px',
		paddingBottom: '20px',
		fontWeight: '800',
		color: '#D52918',
		background: '#E8F6E8',
	},
	className: 'custom-toast',
	// icon: <DropDownTickIcon className="h-7 w-7" />,
	ariaProps: {
		role: 'status',
		'aria-live': 'polite',
	},
};

export const TOAST_SUCCESS_CONFIG = {
	position: 'top-right',
	style: {
		borderBottom: '3px solid #1EA41D',
		fontFamily: 'open sans',
		fontSize: '14px',
		paddingTop: '20px',
		paddingBottom: '20px',
		fontWeight: '800',
		color: '#1EA41D',
		background: '#E8F6E8',
	},
	className: 'custom-toast',
	icon: <DropDownTickIcon className="h-7 w-7" />,
	ariaProps: {
		role: 'status',
		'aria-live': 'polite',
	},
};
