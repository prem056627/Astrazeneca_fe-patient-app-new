import React from 'react';
import { ReactComponent as BrandIcon } from '../assets/images/svg/brand-logo.svg';
import MenuFooter from '../components/MenuFooter';
import HcpMenuModal from './HcpMenuModal';
import HcpMenuFooter from './HcpMenuFooter';
import HcpPatient from './HcpPatient';
import HcpProfileModal from './HcpProfile/HcpProfileModal';
import HcpPatientProfileModal from './HcpPatientProfileModal';
function HcpDashboard() {
	return (
		<>
			<div className="relative h-full">
				<div className=" left-0 z-20 flex w-full items-center justify-center bg-white p-6 pt-11">
					<BrandIcon className="h-[32px] min-h-[32px]" />
				</div>

				<HcpPatient />

				<HcpMenuFooter />
			</div>

			<HcpProfileModal />
			<HcpMenuModal />
			<HcpPatientProfileModal />
		</>
	);
}

export default HcpDashboard;
