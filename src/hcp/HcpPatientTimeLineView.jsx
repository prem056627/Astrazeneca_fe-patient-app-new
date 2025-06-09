import React from 'react';
import { ReactComponent as TimeLine } from '../assets/images/svg/menu/TimeLine.svg';

const HcpPatientTimeLineView = ({ timelineData }) => {
	// Dummy data for the timeline
	// const timelineData = [
	// 	{ date: "11 Nov '21, 3:45pm", event: 'Profile Created' },
	// 	{ date: "11 Nov '21, 3:45pm", event: 'Medically Verified' },
	// 	{ date: "11 Nov '21, 3:45pm", event: 'Program Approved' },
	// 	{ date: "11 Nov '21, 3:45pm", event: '1st Paid Order Created' },
	// 	{ date: "11 Nov '21, 3:45pm", event: '1st Paid Order Dispatched' },
	// 	{ date: "11 Nov '21, 3:45pm", event: 'Physical Verification Initiated' },
	// 	{ date: "11 Nov '21, 3:45pm", event: 'Physically Verified' },
	// 	{ date: "11 Nov '21, 3:45pm", event: '1st FOC Order Created' },
	// 	{ date: "11 Nov '21, 3:45pm", event: '1st FOC Order Dispatched' },
	// 	{ date: "11 Nov '21, 3:45pm", event: '2nd Paid Order Created' },
	// 	{ date: "11 Nov '21, 3:45pm", event: '2nd Paid Order Dispatched' },
	// 	{ date: "11 Nov '21, 3:45pm", event: 'Remote Verification Initiated' },
	// 	{ date: "11 Nov '21, 3:45pm", event: 'Remotely Verified (KYC)' },
	// 	{ date: "11 Nov '21, 3:45pm", event: '2nd FOC Order Created' },
	// 	{ date: "11 Nov '21, 3:45pm", event: '2nd FOC Order Dispatched' },
	// ];

	const currentEvent = 'Physically Verified';

	// Reverse the timeline data to make current status appear from bottom to top
	const reversedTimelineData = [...timelineData].reverse();

	return (
		<div className="flex h-fit items-center justify-center ">
			<div className="w-full max-w-md ">
				<div className="p-4">
					<div className="relative flex flex-col">
						{reversedTimelineData.map((item, index) => {
							// Determine if the event is completed based on currentEvent
							

							return (
								<div key={index} className="relative mb-4 flex items-center">
									{/* Connector Line */}
									{index !== reversedTimelineData.length - 1 && (
										<div
											className={`absolute left-[15px] top-6 z-0 h-full border-l-2 border-dotted ${
												item.completed ? 'border-primary' : 'border-gray-300'
											}`}
										></div>
									)}
									{/* Icon */}
									<div
										className={`z-10 flex h-8 w-8 items-center justify-center rounded-full ${
											item.completed
												? 'bg-primary text-white'
												: 'bg-gray-300 text-gray-500'
										}`}
									>
										{item.completed ? (
											<span className="text-white">
												<TimeLine />
											</span>
										) : (
											<span className="text-gray-500">
												<TimeLine />
											</span>
										)}
									</div>

									<div className="ml-6">
										<p className="text-sm text-gray-600">{item.timestamp}</p>
										<p className="font-semibold text-gray-800">{item.title}</p>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default HcpPatientTimeLineView;
