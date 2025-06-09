import React, { useEffect } from 'react';
import ProgramEnrollmentSucess from './ProgramEnrollmentSucess';
import { ReactComponent as BrandIcon } from '../../assets/images/svg/brand-logo.svg';
import MenuFooter from '../../components/MenuFooter';
import FabButton from '../../components/FabButton/FabButton';
import FabButtonModal from '../../components/FabButton';


function PersonalDeatilSubmitedSucess() {
	

	return (
		<>
			<div className="fixed top-0 left-0 z-20 flex w-full items-center justify-center bg-white p-6 pt-11">
				<BrandIcon className="h-[32px] min-h-[32px]" />
			</div>
			<div className="mt-32 pb-32">
				<ProgramEnrollmentSucess />
				{/* <FabButton/> */}
			</div>

			<MenuFooter/>
   <FabButtonModal/>
		</>
	);
}

export default PersonalDeatilSubmitedSucess;
