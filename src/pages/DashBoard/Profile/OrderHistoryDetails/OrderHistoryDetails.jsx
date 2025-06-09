import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import useApi from '../../../../hooks/useApi';
import {
	selectInitializeData
} from '../../../slice';
import OrderHistoryCard from './OrderHistoryCard';

// Constants
const FILTER_OPTIONS = {
    ALL: 'all',
    PAID: 'paid',
    FREE: 'foc'
};

const ORDER_STATUS = {
    DISPATCH: 'Dispatch'
};

// Styled components
const FilterButton = ({ active, onClick, children }) => (
    <button
        onClick={onClick}
        className={`rounded-full border-2 py-1.5 px-4 font-open-sans text-xs font-normal ${
            active
                ? 'border-primary text-primary'
                : 'border-[#595454] text-[#595454]'
        }`}
    >
        {children}
    </button>
);

FilterButton.propTypes = {
    active: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

const OrderStatusBadge = ({ type, status }) => {
    const getBadgeStyles = () => {
        if (type === 'foc') {
            return 'border-[#2476F1] bg-[#D3E4FC] text-[#2476F1]';
        }
        return 'border-[#0FD2B7] bg-[#CFF6F1] text-[#0FD2B7]';
    };

    return (
        <p className={`rounded-md border-2 py-1 px-2 font-open-sans text-xs font-semibold ${getBadgeStyles()}`}>
            {type==='foc' ? 'Free' : 'Paid'}
        </p>
    );
};

OrderStatusBadge.propTypes = {
    type: PropTypes.string.isRequired,
    status: PropTypes.string
};

const OrderDetailRow = ({ label, value }) => {
    const { t } = useTranslation();
    return (
        <p className="py-1 font-normal text-[#69757E]">
            {label}:
            <span className="font-open-sans font-bold text-[#69757E]">
                {' '}
            {value || 'N/A'}
            </span>
        </p>
    );
};

OrderDetailRow.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

function ActiveOrderCard({ orderData }) {
    const { t } = useTranslation();
    return (
			<div className="rounded-2xl border-2 border-[#DBDBDB] bg-white p-4">
				<div className="flex flex-row items-center justify-start gap-4">
					<h1 className="py-4 font-open-sans text-lg font-semibold">
						{t('order_history.active_order.order_id')} {orderData?.order_id}
					</h1>
					{orderData?.order_type && (
						<OrderStatusBadge
							type={orderData?.order_type}
							status={orderData?.order_status}
						/>
					)}
					{orderData?.order_status && (
						<p className="rounded-md border-2 border-[#F19F24] bg-[#FCECD3] py-1 px-2 font-open-sans text-xs font-semibold text-[#F19F24]">
							{orderData?.order_status}
						</p>
					)}
				</div>
				<OrderDetailRow
					label={t('order_history.fields.order_date')}
					value={orderData?.order_date}
				/>
				<OrderDetailRow
					label={t('order_history.fields.dispensed_date')}
					value={orderData?.order_dispensed_date}
				/>
				<OrderDetailRow
					label={t('order_history.fields.dosage')}
					value={orderData?.dosage}
				/>
				<OrderDetailRow
					label={t('order_history.fields.distributor')}
					value={orderData?.distributor}
				/>
				<OrderDetailRow
					label={t('order_history.fields.pharmacy')}
					value={orderData?.pharmacy}
				/>
			</div>
		);
}

ActiveOrderCard.propTypes = {
    orderData: PropTypes.shape({
        order_id: PropTypes.string,
        order_type: PropTypes.string,
        order_status: PropTypes.string,
        order_code: PropTypes.string,
        order_date: PropTypes.string,
        dispensed_date: PropTypes.string,
        dosage: PropTypes.number,
        distributor: PropTypes.string,
        pharmacy: PropTypes.string
    })
};

function OrderHistoryDetails() {
    const { t } = useTranslation();
    const [filter, setFilter] = useState(FILTER_OPTIONS.ALL);

	const [orderHistoryData, setOrderHistoryData] = useState(null);
    
	const triggerApi = useApi();

    const filteredOrders = orderHistoryData?.data?.orders?.filter((order) => {
			if (filter === FILTER_OPTIONS.ALL) return true;
			return order.order_type === filter;
		});

	const makeApiCall = async () => {
		try {
			const { response, success } = await triggerApi({
				url: '/order-history/',
				type: 'GET',
				loader: true,
			});
			if (success && response) {
				console.log(response);
				setOrderHistoryData(response);
			}
		} catch (error) {
			console.error('Error during API call:', error);
		}
	};

	useEffect(() => {
		makeApiCall();
	}, [])
	

    return (
			<div className="relative h-auto overflow-scroll">
				<div className="flex flex-col gap-5 pt-6">
					{/* Active order section */}
					<div>
						<h1 className="py-4 font-open-sans text-lg font-semibold">
							{t('order_history.active_order.title')}
						</h1>
						<ActiveOrderCard orderData={orderHistoryData?.data?.recent_order} />
					</div>

					{/* Past orders section */}
					<div>
						<h1 className="py-4 font-open-sans text-lg font-semibold">
							{t('order_history.past_orders.title')}
						</h1>
						<div className="flex flex-row gap-4">
							<FilterButton
								active={filter === FILTER_OPTIONS.ALL}
								onClick={() => setFilter(FILTER_OPTIONS.ALL)}
							>
								{t('order_history.past_orders.filters.all')}
							</FilterButton>
							<FilterButton
								active={filter === FILTER_OPTIONS.PAID}
								onClick={() => setFilter(FILTER_OPTIONS.PAID)}
							>
								{t('order_history.past_orders.filters.paid')}
							</FilterButton>
							<FilterButton
								active={filter === FILTER_OPTIONS.FREE}
								onClick={() => setFilter(FILTER_OPTIONS.FREE)}
							>
								{t('order_history.past_orders.filters.free')}
							</FilterButton>
						</div>

						{filteredOrders?.map((order, index) => (
							<OrderHistoryCard
								key={`${order.order_id}-${index}`}
								eachObj={order}
								index={index}
							/>
						))}
					</div>
				</div>
			</div>
		);
}

export default OrderHistoryDetails;
