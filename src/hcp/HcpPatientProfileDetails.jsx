import React from 'react';
import HcpPatientTimeLineView from './HcpPatientTimeLineView';
import { useSelector } from 'react-redux';
import { selectHcpPatientProfileData } from '../pages/slice';

function HcpPatientProfileDetails({ patientProfile }) {
	console.log('patientProfile', patientProfile);
	
	return (
		<div>
			{/* Scrollable Top Container */}
			<div
				className="rounded-[6px] bg-[#F7F7F7] p-4"
				style={{
					// maxHeight: '200px', // Adjust the height as needed
					overflowY: 'auto', // Enable vertical scrolling
				}}
			>
				<div className="py-2">
					<p className="from-neutral-400 font-inter text-[#696969]">
						Paid Orders:{' '}
					</p>
					<p className="font-inter font-normal text-black">
						{patientProfile?.paid_orders}
					</p>
				</div>

				<div className="py-2">
					<p className="font-inter font-normal text-[#696969]">Free Orders: </p>
					<p className="font-inter font-normal text-black">
						{patientProfile?.foc_orders}
					</p>
				</div>
			</div>

			{/* Patient Timeline */}
			<div className='mt-4'>
				<div className="flex flex-row items-center justify-between">
					<div>
						<h1 className="pb-2 font-inter text-base font-semibold text-black">
							Patient Timeline
						</h1>
						<div className="h-1 w-11 rounded-full bg-primary"></div>
					</div>
				</div>
				{patientProfile?.timeline && <HcpPatientTimeLineView timelineData={patientProfile?.timeline} />}
			</div>
		</div>
	);
}

export default HcpPatientProfileDetails;
