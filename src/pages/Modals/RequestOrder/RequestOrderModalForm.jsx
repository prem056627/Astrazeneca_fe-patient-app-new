import React from 'react';
import { useTranslation } from 'react-i18next';
import RequestOrderForm from './RequestOrderForm';
import { useDispatch } from 'react-redux';
import { isRequestCallBackOpen, isRequestOrderClose } from '../../slice';

function RequestOrderModalForm({ fetchProgramDetails }) {
	const { t } = useTranslation();
	const dispatch = useDispatch();

	function handleRequestCallback() {
		dispatch(isRequestOrderClose());
		dispatch(isRequestCallBackOpen());
		console.log('handleRequestcallback');
	}
	return (
		<div className="h-auto overflow-scroll overflow-y-auto">
			<RequestOrderForm fetchProgramDetails={fetchProgramDetails} />
			<div className="mt-12 border-t border-[#DBDBDB] py-5 text-center">
				<p className="font-open-sans text-sm font-semibold text-[#595454]">
					{t('request_order.form.prescription_change.text')}{' '}
					<button
						onClick={handleRequestCallback}
						className="font-open-sans text-sm font-bold text-primary"
					>
						{t('request_order.form.prescription_change.action')}
					</button>
				</p>
			</div>
		</div>
	);
}

export default RequestOrderModalForm 
