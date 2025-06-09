import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
// import toast from 'react-hot-toast';
// import './toastStyles.css';
import { useEffect, useState } from 'react';
import { ReactComponent as DropDownTickIcon } from '../../../../assets/images/svg/Form-dropDownTick-icon.svg';
import useApi from '../../../../hooks/useApi';
function MyProfileDetails() {
	const { t } = useTranslation();
	const triggerApi = useApi();
	const dispatch = useDispatch();
	const [profileDetails, setProfileDetails] = useState({});

	useEffect(() => {
		const makeApiCall = async () => {
			try {
				console.log('Making API call to /api/profile_details/');
				const { response, success, error } = await triggerApi({
					url: `/profile_details/`,
					type: 'GET',
					loader: true,
				});
				if (success && response) {
					console.log('Profile Details API response:', response);
					setProfileDetails(response);
				} else {
					console.error(
						'Profile Details API request failed:',
						error ? JSON.stringify(error) : 'Unknown error'
					);
				}
			} catch (err) {
				console.error(
					'Error making Profile Details API call:',
					err.message || err
				);
			}
		};

		makeApiCall();
	}, [dispatch, triggerApi]);

	const notify = () =>
		toast(t('my_profile.toast.success'), {
			duration: 6000,
			position: 'top-right', // Adjust the position

			// Styling
			style: {
				borderBottom: '3px solid #1EA41D',
				fontFamily: 'open sans',
				fontSize: '14px',
				padding: '16px',
				fontWeight: '800',
				color: '#1EA41D ',
				background: '#E8F6E8', // Custom background color
				width: '100%', // Adjusted width
			},
			className: 'custom-toast', // Custom CSS class

			// Custom Icon
			icon: <DropDownTickIcon />, // Custom icon

			// Change colors of success/error/loading icon
			// iconTheme: {
			//   primary: '#FFD700', // Custom primary color (gold)
			//   secondary: '#333',  // Custom secondary color (background)
			// },

			// Aria
			ariaProps: {
				role: 'status',
				'aria-live': 'polite',
			},
		});

	return (
		<div className="relative h-auto w-full overflow-scroll">
			<div className="flex flex-col gap-5 pt-6">
				<div>
					{/* <button onClick={notify}>Make me a toast</button> */}
					{/* <Toaster /> */}
				</div>
				{/* Personal details */}
				<div className="rounded-2xl border-2 border-[#DBDBDB] bg-white p-4">
					<h1 className="pb-4 font-open-sans text-base font-semibold">
						{t('my_profile.sections.personal_details.title')}
					</h1>
					<p className="py-1 font-normal text-[#69757E]">
						{t('my_profile.sections.personal_details.fields.name')}:
						<span className="font-open-sans font-bold text-[#69757E]">
							{'  '}
							{profileDetails?.data?.patient_name || 'N/A'}
						</span>
					</p>
					<p className="py-1 font-normal text-[#69757E]">
						{t('my_profile.sections.personal_details.fields.gender')}:
						<span className="font-open-sans font-bold text-[#69757E]">
							{'  '}
							{profileDetails?.data
								?.patient_gender || 'N/A'}
						</span>
					</p>
					<p className="py-1 font-normal text-[#69757E]">
						{t('my_profile.sections.personal_details.fields.dob')}:
						<span className="font-open-sans font-bold text-[#69757E]">
							{'  '}
							{profileDetails?.data?.patient_dob || 'N/A'}
						</span>
					</p>
					<p className="py-1 font-normal text-[#69757E]">
						{t('my_profile.sections.personal_details.fields.mobile')}:
						<span className="font-open-sans font-bold text-[#69757E]">
							{'  '}
							{profileDetails?.data?.patient_primary_phone || 'N/A'}
						</span>
					</p>
					<p className="py-1 font-normal text-[#69757E]">
						{t('my_profile.sections.personal_details.fields.email')}:
						<span className="font-open-sans font-bold text-[#69757E]">
							{'  '}
							{profileDetails?.data?.patient_email || 'N/A'}
						</span>
					</p>
				</div>

				{/* Address details */}
				<div className="rounded-2xl border-2 border-[#DBDBDB] bg-white p-4">
					<h1 className="pb-4 font-open-sans text-base font-semibold">
						{t('my_profile.sections.address.title')}
					</h1>
					<p className="py-1 font-normal text-[#69757E]">
						{t('my_profile.sections.address.fields.address_line_1')}:
						<span className="font-open-sans font-bold text-[#69757E]">
							{'  '}
							{profileDetails?.data?.enrollment_details?.address_details
								?.address_line_1 || 'N/A'}
						</span>
					</p>
					<p className="py-1 font-normal text-[#69757E]">
						{t('my_profile.sections.address.fields.address_line_2')}:
						<span className="font-open-sans font-bold text-[#69757E]">
							{'  '}
							{profileDetails?.data?.enrollment_details?.address_details
								?.address_line_2 || 'N/A'}
						</span>
					</p>
					<p className="py-1 font-normal text-[#69757E]">
						{t('my_profile.sections.address.fields.city')}:
						<span className="font-open-sans font-bold text-[#69757E]">
							{'  '}
							{profileDetails?.data?.enrollment_details?.address_details
								?.city || 'N/A'}
						</span>
					</p>
					<p className="py-1 font-normal text-[#69757E]">
						{t('my_profile.sections.address.fields.state')}:
						<span className="font-open-sans font-bold text-[#69757E]">
							{'  '}
							{profileDetails?.data?.enrollment_details?.address_details
								?.state || 'N/A'}
						</span>
					</p>
					<p className="py-1 font-normal text-[#69757E]">
						{t('my_profile.sections.address.fields.pin_code')}:
						<span className="font-open-sans font-bold text-[#69757E]">
							{'  '}
							{profileDetails?.data?.enrollment_details?.address_details
								?.pin_code || 'N/A'}
						</span>
					</p>
				</div>

				{/* Caregiver details */}
				<div className="rounded-2xl border-2 border-[#DBDBDB] bg-white p-4">
					<h1 className="pb-4 font-open-sans text-base font-semibold">
						{t('my_profile.sections.caregiver.title')}
					</h1>
					<p className="py-1 font-normal text-[#69757E]">
						{t('my_profile.sections.caregiver.fields.name')}:
						<span className="font-open-sans font-bold text-[#69757E]">
							{'  '}
							{profileDetails?.data?.enrollment_details?.caregiver_details
								?.full_name || 'N/A'}
						</span>
					</p>
					<p className="py-1 font-normal text-[#69757E]">
						{t('my_profile.sections.caregiver.fields.gender')}:
						<span className="font-open-sans font-bold text-[#69757E]">
							{'  '}
							{profileDetails?.data?.enrollment_details?.caregiver_details
								?.gender || 'N/A'}
						</span>
					</p>
					<p className="py-1 font-normal text-[#69757E]">
						{t('my_profile.sections.caregiver.fields.dob')}:
						<span className="font-open-sans font-bold text-[#69757E]">
							{'  '}
							{profileDetails?.data?.enrollment_details?.caregiver_details
								?.date_of_birth || 'N/A'}
						</span>
					</p>
					<p className="py-1 font-normal text-[#69757E]">
						{t('my_profile.sections.caregiver.fields.mobile')}:
						<span className="font-open-sans font-bold text-[#69757E]">
							{'  '}
							{profileDetails?.data?.enrollment_details?.caregiver_details
								?.mobile_number || 'N/A'}
						</span>
					</p>
					<p className="py-1 font-normal text-[#69757E]">
						{t('my_profile.sections.caregiver.fields.email')}:
						<span className="font-open-sans font-bold text-[#69757E]">
							{'  '}
							{profileDetails?.data?.enrollment_details?.caregiver_details
								?.email || 'N/A'}
						</span>
					</p>
					<p className="py-1 font-normal text-[#69757E]">
						{t('my_profile.sections.caregiver.fields.address_line_1')}:
						<span className="font-open-sans font-bold text-[#69757E]">
							{'  '}
							{profileDetails?.data?.enrollment_details?.caregiver_address_proof
								?.address_line_1 || 'N/A'}
						</span>
					</p>
					<p className="py-1 font-normal text-[#69757E]">
						{t('my_profile.sections.caregiver.fields.address_line_2')}:
						<span className="font-open-sans font-bold text-[#69757E]">
							{'  '}
							{profileDetails?.data?.enrollment_details?.caregiver_address_proof
								?.address_line_2 || 'N/A'}
						</span>
					</p>
					<p className="py-1 font-normal text-[#69757E]">
						{t('my_profile.sections.caregiver.fields.city')}:
						<span className="font-open-sans font-bold text-[#69757E]">
							{'  '}
							{profileDetails?.data?.enrollment_details?.caregiver_address_proof
								?.city || 'N/A'}
						</span>
					</p>
					<p className="py-1 font-normal text-[#69757E]">
						{t('my_profile.sections.caregiver.fields.state')}:
						<span className="font-open-sans font-bold text-[#69757E]">
							{'  '}
							{profileDetails?.data?.enrollment_details?.caregiver_address_proof
								?.state || 'N/A'}
						</span>
					</p>
					<p className="py-1 font-normal text-[#69757E]">
						{t('my_profile.sections.caregiver.fields.pin_code')}:
						<span className="font-open-sans font-bold text-[#69757E]">
							{'  '}
							{profileDetails?.data?.enrollment_details?.caregiver_address_proof
								?.pin_code || 'N/A'}
						</span>
					</p>
				</div>

				{/* Reimbursement Info */}
				<div className="rounded-2xl border-2 border-[#DBDBDB] bg-white p-4">
					<h1 className="pb-4 font-open-sans text-base font-semibold">
						{t('my_profile.sections.reimbursement.title')}
					</h1>
					<p className="py-1 font-normal text-[#69757E]">
						{t('my_profile.sections.reimbursement.fields.status')}:
						<span className="font-open-sans font-bold text-[#69757E]">
							{'  '}
							{profileDetails?.data?.enrollment_details?.reimbursement_info
								?.has_reimbursement || 'N/A'}
						</span>
					</p>

					<p className="py-1 font-normal text-[#69757E]">
						{t('my_profile.sections.reimbursement.fields.limits')}:
						<span className="font-open-sans font-bold text-[#69757E]">
							{'  '}
							{profileDetails?.data?.enrollment_details?.reimbursement_info
								?.reimbursement_limits || 'N/A'}
						</span>
					</p>
					<p className="py-1 font-normal text-[#69757E]">
						{t('my_profile.sections.reimbursement.fields.amount')}:
						<span className="font-open-sans font-bold text-[#69757E]">
							{'  '}
							{profileDetails?.data?.enrollment_details?.reimbursement_info
								?.reimbursement_mount || 'N/A'}
						</span>
					</p>

					<p className="py-1 font-normal text-[#69757E]">
						{t('my_profile.sections.reimbursement.fields.type')}:
						<span className="font-open-sans font-bold text-[#69757E]">
							{'  '}
							{profileDetails?.data?.enrollment_details?.reimbursement_info
								?.reimbursement_type || 'N/A'}
						</span>
					</p>
				</div>
			</div>
		</div>
	);
}

export default MyProfileDetails;
