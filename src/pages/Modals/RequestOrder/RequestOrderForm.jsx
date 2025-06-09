import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { ReactComponent as DropDownTickIcon } from '../../../assets/images/svg/Form-dropDownTick-icon.svg';
import '../../../toastStyles.css';
import useApi from '../../../hooks/useApi';
import { transformToFormData } from '../../../utils/forms';
import { 
  isRequestOrderClose, 
  selectInitializeData, 
  setCurrentPageState, 
  setInitializeData 
} from '../../slice';

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
  duration: Infinity,
};

function RequestOrderForm({ fetchProgramDetails }) {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const initialData = useSelector(selectInitializeData);
	const triggerApi = useApi();

	const showSuccessToast = (msg) => {
		toast('Requested for Order successfully', TOAST_CONFIG);
	};

	const handleRequestOrder = async () => {
		dispatch(isRequestOrderClose());

		const formData = transformToFormData({
			program_id: initialData?.data?.program_details?.program_id,
		});

		try {
			const { response, success } = await triggerApi({
				url: '/patient/order-workflow/?action=request_order',
				type: 'POST',
				loader: true,
				payload: formData,
			});

			if (success && response) {
				showSuccessToast(response.data.message);
				fetchProgramDetails();
			}
		} catch (error) {
			console.error('Error during order request:', error);
			toast.error('Failed to submit order request');
		}
	};

	return (
		<div className="flex flex-col gap-4">
			<div className="text-[14px] font-light">
				{t('request_order.form.description')}
			</div>

			<div className="flex flex-col gap-[8px] bg-[#ffffff] pt-[24px] font-lato text-[#696969]">
				<div className="mt-14 flex w-full flex-row items-center justify-center rounded-md bg-primary py-4 text-center leading-[20px]">
					<button
						className="flex items-center justify-center gap-4 bg-primary font-open-sans font-semibold text-white"
						onClick={handleRequestOrder}
					>
						{t('request_order.form.submit')}
					</button>
				</div>
			</div>
		</div>
	);
}

export default RequestOrderForm;
