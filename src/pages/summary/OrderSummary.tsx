import React from 'react';
import { useOrderDetails } from '../../contexts/OrderDetails';
import SummaryForm from './SummaryForm';

export interface OrderSummaryProps {
	goToOrderConfirmation(): void;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({ goToOrderConfirmation }) => {
	const { totals, optionCounts } = useOrderDetails();

	return (
		<div>
			<h1>Order Summary</h1>
			<h2>Scoops {totals.scoops}</h2>
			<ul>
				{Object.entries(optionCounts.scoops)
					.filter(([, quantity]) => quantity > 0)
					.map(([item, quantity], index) => (
						<li key={index}>
							{item} - {quantity}
						</li>
					))}
			</ul>
			<h2>Toppings {totals.toppings}</h2>
			<ul>
				{Object.entries(optionCounts.toppings)
					.filter(([, quantity]) => quantity > 0)
					.map(([item], index) => (
						<li key={index}>{item}</li>
					))}
			</ul>
			<h2>Total {totals.grandTotal}</h2>
			<SummaryForm onOrderConfirmation={goToOrderConfirmation} />
		</div>
	);
};

export default OrderSummary;
