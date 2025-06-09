import {useState} from 'react'
import { useTranslation } from 'react-i18next';
import { ReactComponent as DownloadIcon } from '../../../../assets/images/svg/Icon/File/20px/Download.svg';

const OrderHistoryCard = ({ eachObj, index }) => {
    const { t } = useTranslation();
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleCard = () => {
        setIsExpanded(!isExpanded); 
    };

    const handleDownloadOrder = (url) => {
        // Handle download logic for each order
        window.open(url, '_blank');
    };

    return (
			<div
				key={index}
				className="mb-4 mt-8 rounded-2xl border-2 border-[#DBDBDB] bg-white p-4"
			>
				<div className="flex flex-row items-center  justify-between gap-4 ">
					{/* <h1 className="py-4 font-open-sans text-lg font-semibold">
									Past Orders
								</h1> */}
					<div className="flex items-center gap-2">
						<h1 className="py-4 font-open-sans text-lg font-semibold">
							{t('order_history.active_order.order_id')} {eachObj?.order_id}
						</h1>
						{eachObj.order_type === 'foc' ? (
							<span className="h-fit rounded-md border-2 border-[#2476F1] bg-[#D3E4FC] py-1 px-2 font-open-sans text-xs font-semibold text-[#2476F1]">
								{/* {eachObj.order_type} */}
								Free
							</span>
						) : (
							<span className="h-fit rounded-lg border-2 border-[#0FD2B7] bg-[#CFF6F1]  py-1  px-2 font-open-sans text-xs font-semibold text-[#0FD2B7]">
								{/* {eachObj.order_type} */}
								Paid
							</span>
						)}
						{eachObj?.order_status && (
							<p className="rounded-md border-2 border-[#F19F24] bg-[#FCECD3] py-1 px-2 font-open-sans text-xs font-semibold text-[#F19F24]">
								{eachObj?.order_status}
							</p>
						)}
					</div>
					<div>
						<p
							onClick={toggleCard}
							className="font-open-sans text-base font-bold text-primary"
						>
							{isExpanded
								? t('order_history.card.less')
								: t('order_history.card.more')}
						</p>
					</div>
				</div>

				<p className="py-1 font-normal text-[#69757E]">
					{t('order_history.fields.order_date')}:
					<span className="font-open-sans font-bold text-[#69757E]">
						{' '}
						{eachObj.order_date}
					</span>
				</p>
				{isExpanded && (
					<>
						<p className="py-1 font-normal text-[#69757E]">
							{t('order_history.fields.dispensed_date')}:
							<span className="font-open-sans font-bold text-[#69757E]">
								{' '}
								{eachObj.order_dispensed_date}
							</span>
						</p>
						<p className="py-1 font-normal text-[#69757E]">
							{t('order_history.fields.dosage')}:
							<span className="font-open-sans font-bold text-[#69757E]">
								{' '}
								{eachObj.dosage}
							</span>
						</p>
						<p className="py-1 font-normal text-[#69757E]">
							{t('order_history.fields.infusion_date')}:
							<span className="font-open-sans font-bold text-[#69757E]">
								{' '}
								{eachObj.order_infusion_date}
							</span>
						</p>
						<p className="py-1 font-normal text-[#69757E]">
							{t('order_history.fields.distributor')}:
							<span className="font-open-sans font-bold text-[#69757E]">
								{' '}
								{eachObj.distributor}
							</span>
						</p>
						<p className="py-1 pb-4 font-normal text-[#69757E]">
							{t('order_history.fields.pharmacy')}:
							<span className="font-open-sans font-bold text-[#69757E]">
								{' '}
								{eachObj.pharmacy}
							</span>
						</p>

						<button
							onClick={() => handleDownloadOrder(eachObj.order_advice_file)}
							className="flex w-full flex-row items-center justify-center gap-4 border-t-2 border-[#DBDBDB] py-4"
						>
							<DownloadIcon className="h-7 w-7" />
							<p className="font-open-sans text-base font-bold text-primary">
								{t('order_history.card.order_advice')}
							</p>
						</button>
					</>
				)}
			</div>
		);
}

export default OrderHistoryCard