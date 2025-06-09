import React from 'react';

function HcpProfileDetails({ doctorDetails }) {
	console.log('doctorDetails', doctorDetails);
	
	return (
		<div>
			{/* Personal Details Card */}
			<div className="rounded[1px] my-4  bg-white p-4 shadow-md">
				<h1 className="pb-4 font-inter text-base font-normal uppercase text-[#9A9A9A]">
					Personal Details
				</h1>
				<div className="py-2">
					<p className="from-neutral-400 font-inter text-[#9A9A9A]">Name: </p>
					<p className=" font-inter font-normal text-black">
						{doctorDetails?.personal_details?.name }
					</p>
				</div>

				<div className="py-2">
					<p className="font-inter font-normal text-[#9A9A9A]">
						Mobile Number:{' '}
					</p>
					<p className=" font-inter font-normal text-black">
						{doctorDetails?.personal_details?.mobile}
					</p>
				</div>

				<div className="py-2">
					<p className="font-inter font-normal text-[#9A9A9A]">Email ID: </p>
					<p className=" font-inter font-normal text-black">
						{doctorDetails?.personal_details?.email}
					</p>
				</div>
			</div>

			{/* Medical Details Card */}
			<div className="rounded[1px] my-4 bg-white p-4 shadow-md">
				<h1 className="pb-4 font-inter text-base font-normal uppercase text-[#9A9A9A]">
					Medical Details
				</h1>

				<div className="py-2">
					<p className="font-inter font-normal text-[#9A9A9A]">
						Organization:{' '}
					</p>
					<p className=" font-inter font-normal text-black">
						{doctorDetails?.medical_details?.hospital}
					</p>
				</div>

				<div className="py-2">
					<p className="font-inter font-normal text-[#9A9A9A]">Address: </p>
					<p className=" font-inter font-normal text-black">
						{doctorDetails?.medical_details?.address}
					</p>
				</div>

				{/* <div className="py-2">
					<p className="font-inter font-normal text-[#9A9A9A]">Speciality: </p>
					<p className=" font-inter font-normal text-black">Oncologist</p>
				</div> */}
			</div>
		</div>
	);
}

export default HcpProfileDetails;
