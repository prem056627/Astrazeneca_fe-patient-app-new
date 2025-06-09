import React, { useState } from 'react';
import { ReactComponent as HomeLogo } from '../assets/images/svg/menu/Home.svg';
import { ReactComponent as Notify } from '../assets/images/svg/menu/Notify.svg';
import { ReactComponent as Profile } from '../assets/images/svg/menu/Profile.svg';
import { ReactComponent as Patient } from '../assets/images/svg/menu/patient.svg';
import { ReactComponent as Menu } from '../assets/images/svg/menu/menu.svg';
// import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	isProfilePageOpen,
	selectCurrentPageState,
	setHcpMenu,
} from '../pages/slice';
import { Navigate, useNavigate } from 'react-router-dom';
// isHcpMenuOpen
// selectIsHcpMenuOpen
function MenuItem({ label, icon: Icon, isActive, onClick }) {
	return (
		<div
			onClick={onClick}
			className={`flex w-full cursor-pointer flex-col items-center gap-1 ${
				isActive ? 'text-[#BE2BBB]' : 'text-[#595454]'
			}`}
		>
			<Icon
				className={`h-7 w-7 ${
					isActive
						? 'fill-current stroke-current'
						: 'fill-current stroke-current'
				}`}
			/>
			<span className="text-xs">{label}</span>
		</div>
	);
}

function HcpMenuFooter() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [activeMenu, setActiveMenu] = useState('Home');
	const current_page_state = useSelector(selectCurrentPageState);

	let menuItems = [
		{ label: 'Notification', icon: Notify },
		{ label: 'Profile', icon: Profile },
	];

	let hcpMenuItems = [
		{ label: 'Patient', icon: Patient },
		{ label: 'Menu', icon: Menu },
	];

	if (current_page_state === 'program_active') {
		menuItems = [{ label: 'Home', icon: HomeLogo }, ...menuItems];
	}

	// if (current_page_state === 'hcp_profile') {
	//     menuItems = [{ label: 'PATIENT', icon: Patient }, ...menuItems];
	// }

	const handleMenuClick = (key) => {
		setActiveMenu(key);

		if (key === 'Home') {
			// navigate("/Dashboard/Home");
		}

		if (key === 'Profile') {
			dispatch(isProfilePageOpen(true));
		}

		console.log('key', key);

		if (key === 'Menu') {
			dispatch(setHcpMenu(true));
		}
		if (key === 'Patient') {
			navigate('/');
		}
	};

	return (
		<nav className="shadow-custom-shadow fixed bottom-0 left-0 flex w-full justify-between gap-4 bg-white px-10 py-6 shadow-lg">
			{hcpMenuItems.map((item) => (
				<MenuItem
					key={item.label}
					label={item.label}
					icon={item.icon}
					isActive={activeMenu === item.label}
					onClick={() => handleMenuClick(item.label)}
				/>
			))}
		</nav>
	);
}

export default HcpMenuFooter;
