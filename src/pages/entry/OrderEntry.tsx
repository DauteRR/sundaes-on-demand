import React from 'react';
import { Button } from 'react-bootstrap';
import { useOrderDetails } from '../../contexts/OrderDetails';
import { Options } from './Options';

export interface OrderEntryProps {
	goToOrderSummary(): void;
}

export const OrderEntry: React.FC<OrderEntryProps> = ({ goToOrderSummary }) => {
	const { totals } = useOrderDetails();

	return (
		<div>
			<h1>Design Your Sundae!</h1>
			<Options optionType="scoops" />
			<Options optionType="toppings" />
			<h2>Grand total: {totals.grandTotal}</h2>
			<Button variant="success" onClick={goToOrderSummary}>
				Order
			</Button>
		</div>
	);
};

export default OrderEntry;
