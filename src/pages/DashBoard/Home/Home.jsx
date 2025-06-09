import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as BrandIcon } from '../../../assets/images/svg/brand-logo.svg';
import { ReactComponent as DropDownTickIcon } from '../../../assets/images/svg/Form-dropDownTick-icon.svg';
import { useTranslation } from 'react-i18next';

// Components
import MenuFooter from '../../../components/MenuFooter';
import FabButton from '../../../components/FabButton/FabButton';
import FabButtonModal from '../../../components/FabButton/index';

// Modals
import RequestOrderModal from '../../Modals/RequestOrder/Index';
import RequestCallBackModal from '../../Modals/RequestCallback/Index';
import ConfirmInfusionModal from '../../Modals/ConfirmInfusion/ConfirmInfusionModal';

// Redux selectors and actions
import {
    SelectIsUploadInfusionCardOpen,
    isRequestOrderOpen,
    isUploadInfusionCardClose,
    isUploadInfusionCardOpen,
    // selectProgramData,
    selectInitializeData,
    setProgramEnrollmentData,
	setInitializeData,
	setCurrentPageState,
} from '../../slice';

// Utilities
import useApi from '../../../hooks/useApi';
import { transformToFormData } from '../../../utils/forms';
import toast from 'react-hot-toast';
import { LoaderContext } from '../../../context/LoaderContextProvider';
import { isObjectEmpty } from '../../../utils/helper';

const TOAST_CONFIG = {
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

const ProgramDetail = ({ label, value }) => (
    <p className="py-1 font-medium text-[#69757E]">
        {label} :
        <span className="font-open-sans font-black text-[#69757E]"> {value}</span>
    </p>
);

const ProgramCard = ({ programDetails }) => {
    const { t } = useTranslation();
    return (
        <div className="rounded-lg border border-[#DBDBDB] bg-white px-4">
            <div className="flex gap-2 py-7">
                <p className="font-open-sans text-base font-bold text-[#283A46]">
                    {programDetails?.data?.program_details?.program_name}
                </p>
                <span className="rounded-lg border border-[#1EA41D] bg-[#78C877] p-1 px-2 text-xs text-white">
                    {t('home.program_details.program_name.active_badge')}
                </span>
            </div>

            <div className="pb-7">
                <ProgramDetail 
                    label={t('home.program_details.fields.patient_id')} 
                    value={programDetails?.data?.patient_id} 
                />
                <ProgramDetail 
                    label={t('home.program_details.fields.enrolled_date')} 
                    value={programDetails?.data?.program_details?.enrollment_date} 
                />
                <ProgramDetail 
                    label={t('home.program_details.fields.remaining_infusions')} 
                    value={programDetails?.data?.program_details?.remaining_infusions} 
                />
                <ProgramDetail 
                    label={t('home.program_details.fields.doctor_name')} 
                    value={programDetails?.data?.program_details?.doctor_name} 
                />
            </div>
        </div>
    );
};

const OrderStatusBadge = ({ type, status }) => {
    const { t } = useTranslation();
    if (type === 'paid') {
        return (
            <span className="rounded-lg border border-[#0FD2B7] bg-[#cff6f1] p-1 px-2 text-xs text-[#0FD2B7]">
                {t('home.recent_order.status.paid')}
            </span>
        );
    }
    if (type === 'foc') {
        return (
            <span className="rounded-lg border border-[#2476F1] bg-[#d2e4fc] p-1 px-2 text-xs text-[#2476F1]">
                {t('home.recent_order.status.free')}
            </span>
        );
    }
    if (status) {
        return (
            <span className="rounded-lg border border-[#F19F24] bg-[#fdecd3] p-1 px-2 text-xs text-[#F19F24] h-fit">
                {status}
            </span>
        );
    }
    return null;
};

const RecentOrderCard = ({ orderDetails, onConfirmInfusion, onResendOtp }) => {
    const { t } = useTranslation();
    return (
			<div className="rounded-lg border border-[#DBDBDB] bg-white px-4">
				<div className="flex justify-between py-7">
					<div className="flex gap-2">
						<p className="font-open-sans text-base font-bold text-[#283A46]">
							{t('home.recent_order.order_id_prefix')} {orderDetails.order_id}
						</p>
						<OrderStatusBadge
							type={orderDetails.order_type}
							status={orderDetails.order_status}
						/>
						{orderDetails.order_status && (
							<p className="rounded-md border-2 border-[#F19F24] bg-[#FCECD3] py-1 px-2 font-open-sans text-xs font-semibold text-[#F19F24]">
								{orderDetails.order_status}
							</p>
						)}
					</div>
					<div>
						{orderDetails.can_resend_otp && (
							<span
								onClick={onResendOtp}
								className="cursor-pointer text-[14px] font-semibold text-[#BE2BBB]"
							>
								{t('home.recent_order.actions.resend_otp')}
							</span>
						)}
						{orderDetails.can_confirm_infusion && (
							<span
								onClick={onConfirmInfusion}
								className="cursor-pointer text-[14px] font-semibold text-[#BE2BBB]"
							>
								{t('home.recent_order.actions.confirm_infusion')}
							</span>
						)}
					</div>
				</div>

				<div className="pb-7">
					<ProgramDetail
						label={t('home.recent_order.fields.order_code')}
						value={orderDetails.order_code}
					/>
					<ProgramDetail
						label={t('home.recent_order.fields.order_date')}
						value={orderDetails.order_date}
					/>
					<ProgramDetail
						label={t('home.recent_order.fields.distributor')}
						value={orderDetails.distributor}
					/>
					<ProgramDetail
						label={t('home.recent_order.fields.pharmacy')}
						value={orderDetails.pharmacy}
					/>
				</div>
			</div>
		);
};

const OasisCard = ({ item }) => (
    <div 
        className="mb-4 flex h-96 w-full flex-col items-start justify-between rounded-xl bg-off-white bg-cover bg-center py-6 pl-6 pr-12"
        style={{ backgroundImage: `url(${item.bg})` }}
    >
        <p className={`font-invention-app inline-block rounded-full border px-3 py-2 text-xs font-bold text-white ${
            item.tag === 'PV Reporting' ? 'bg-[#1FCCB4] border-white' : 'bg-[#FDCC80] border-white'
        }`}>
            {item.tag}
        </p>

        <div className="flex flex-col gap-2">
            <img src={item.icon} alt="" width={40} />
            <p className="font-open-sans text-sm font-semibold text-white">
                {item.date}
            </p>
            <p className="font-open-sans text-lg font-semibold text-white">
                {item.desc}
            </p>
        </div>
    </div>
);

const OasisSection = ({ programData, showAll, onViewAll }) => {
    const initialData = useSelector(selectInitializeData)
    const { t } = useTranslation();
    return (
        <div>
            <h1 className="py-5 font-open-sans text-2xl font-semibold text-[#283A46]">
                {t('home.oasis_section.title')}{' '}
                <span className="text-[#BE2BBB]">{initialData?.data?.program_name == 'Opdyta' ?  t('home.oasis_section.program_name') : t('home.oasis_section.program_name_rojuzda')}</span>
            </h1>
            {
                initialData?.data?.program_name == 'Rojuzda Program' &&  <div className='my-3 text-xs text-gray-400'>
                    Bristol Myers Squibb (BMS) is committed to transforming the lives of patients with science. We keep the patients at the center of all that we do. Our Patient Support Programs are aimed at enhancing access to our innovative therapies and ensuring that our medicines are available to patients.
                    Aarambh our Patient Support Program for Rojuzda is individualized to meet the required treatment needs of eligible patients. We understand that patients can only benefit from our medicines if they are able to access them. With Aarambh, our goal is to get the treatment to the right patient in time
                </div>
            }

            {(showAll ? programData?.pap_informations : programData?.pap_informations?.slice(0, 2))?.map((item, index) => (
                <OasisCard key={index} item={item} />
            ))}

            {!showAll && programData?.pap_informations?.length > 2 && (
                <div className="text-center">
                    <button
                        onClick={onViewAll}
                        className="cursor-pointer py-3 font-open-sans text-base font-semibold text-[#BE2BBB]"
                    >
                        {t('home.oasis_section.view_all')}
                    </button>
                </div>
            )}
        </div>
    );
};

function Home() {
    const { t } = useTranslation();
    const triggerApi = useApi();
    const dispatch = useDispatch();
	const { setLoading } = useContext(LoaderContext);
    const initialData = useSelector(selectInitializeData);
    // const programData = useSelector(selectProgramData);
    const UploadInfusionCardOpen = useSelector(SelectIsUploadInfusionCardOpen);

    const [showAll, setShowAll] = useState(false);

    const handleRequestPaidOrder = () => dispatch(isRequestOrderOpen());
    const handleConfirmInfusion = () => {
        dispatch(isUploadInfusionCardOpen());
    };
    const closeModal = () => dispatch(isUploadInfusionCardClose());

    const handleOtp = async () => {
        const formData = transformToFormData({ 
            order_id: initialData?.data?.recent_order?.order_id 
        });
        
        try {
            const { response, success } = await triggerApi({
                url: '/patient/order-workflow/?action=resend_order_otp',
                type: 'POST',
                loader: true,
                payload: formData,
            });
            if (success && response) {
				toast('OTP sent successfully', TOAST_CONFIG);
                console.log('resend otp post', response);
            }
        } catch (error) {
            console.error('Error during API call:', error);
        }
    };

    const fetchProfileDetails = async () => {
        try {
            const { response, success } = await triggerApi({
                url: '/profile_details/',
                type: 'GET',
                loader: true,
            });
            
            if (success && response) {
                dispatch(setProgramEnrollmentData(response));
            }
        } catch (error) {
            console.error('Error fetching profile details:', error);
        }
    };

    const fetchProgramDetails = async () => {
		setLoading(true);
        try {
            const { response, success } = await triggerApi({
                url: '/patient-initialize/',
                type: 'GET',
                loader: true,
            });
            
            if (success && response) {
				dispatch(setInitializeData(response));
				// dispatch(setCurrentPageState('signup_success'));
				dispatch(setCurrentPageState(response.data.current_state));
                // dispatch(selectProgramData(response));
				
				setLoading(false);
            }
        } catch (error) {
			setLoading(false);
            console.error('Error fetching program details:', error);
        }
    };

    useEffect(() => {
       fetchProfileDetails();
    }, []);

    return (
			<div className="relative h-full overflow-auto pb-24">
				<header className="left-0 z-20 flex w-full items-center justify-center bg-white p-6 pt-11">
					<BrandIcon className="h-[32px] min-h-[32px]" />
				</header>

				{initialData?.data?.active_order_request_id && (
					<div className="flex items-center gap-2 border-b-2 border-[#1EA41D] bg-[#E8F6E8] px-4 py-3">
						<DropDownTickIcon />
						{t('home.order_success')}
					</div>
				)}

				<main
					className={
						`${
							initialData?.data?.recent_order?.can_confirm_infusion ||
							initialData?.data?.can_request_order
								? 'mb-24'
								: ''
						} mt-5 px-5`
					}
				>
					<section>
						<h2 className="mb-4 text-[20px] font-semibold">
							{t('home.program_details.title')}
						</h2>
						<ProgramCard programDetails={initialData} />
					</section>

					{initialData?.data?.recent_order && (
						<section className="mb-4 mt-10">
							<h2 className="mb-4 text-[20px] font-semibold">
								{t('home.recent_order.title')}
							</h2>
							<RecentOrderCard
								orderDetails={initialData.data.recent_order}
								onConfirmInfusion={handleConfirmInfusion}
								onResendOtp={handleOtp}
							/>
						</section>
					)}

					<section className="px-2 pb-8">
						<OasisSection
							programData={initialData}
							showAll={showAll}
							onViewAll={() => setShowAll(true)}
						/>
					</section>
				</main>

				<div className="fixed bottom-24 z-30 w-full">
					<FabButton />
					{initialData?.data?.recent_order?.can_confirm_infusion && (
						<button
							type="button"
							className=" flex w-full cursor-pointer items-center justify-center bg-primary px-[16px] py-[20px] font-open-sans text-[14px] font-bold uppercase leading-[20px] text-white focus:outline-none disabled:opacity-[0.38]"
							onClick={handleConfirmInfusion}
						>
							{t('home.buttons.confirm_infusion')}
						</button>
					)}

					{initialData?.data?.can_request_order && (
						<button
							type="button"
							className="flex w-full cursor-pointer items-center justify-center bg-primary px-[16px] py-[20px] font-open-sans text-[14px] font-bold uppercase leading-[20px] text-white focus:outline-none disabled:opacity-[0.38]"
							onClick={handleRequestPaidOrder}
						>
							{t('home.buttons.request_order')}
						</button>
					)}
				</div>

				<MenuFooter />

				<RequestOrderModal fetchProgramDetails={fetchProgramDetails} />
				<RequestCallBackModal />
				<FabButtonModal />
				<ConfirmInfusionModal
					show={UploadInfusionCardOpen}
					fetchProgramDetails={fetchProgramDetails}
					closeModal={closeModal}
				/>
			</div>
		);
}

export default Home;
