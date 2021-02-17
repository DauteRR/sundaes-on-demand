import React from 'react';
import { useOrderDetails } from '../../contexts/OrderDetails';
import { Options } from './Options';

export interface OrderEntryProps {}

export const OrderEntry: React.FC<OrderEntryProps> = () => {
	const { totals } = useOrderDetails();

	return (
		<div>
			<Options optionType="scoops" />
			<Options optionType="toppings" />
			<h2>Grand total: {totals.grandTotal}</h2>
		</div>
	);
};

export default OrderEntry;
