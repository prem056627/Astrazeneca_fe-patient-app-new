import React from 'react';

import { ReactComponent as Success } from '../../assets/images/svg/Form-dropDownTick-icon.svg';
function CallBackRequestSuccess({SuccessMessage}) {
	return (
		<div className=" bg-[#E8F6E8]  px-5 py-5 border-b-2 border-[#1EA41D]">
			<div className="flex gap-2 ">
				<Success className="h-7 w-7" />

				<p className="font-open-sans text-sm font-bold text-[#1EA41D]">
               { SuccessMessage }
				</p>
			</div>
		</div>
	);
}

export default CallBackRequestSuccess;
