import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useOrderDetails } from '../../contexts/OrderDetails';

export interface OrderConfirmationProps {
	newOrder(): void;
}

export const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ newOrder }) => {
	const { resetOrder } = useOrderDetails();
	const [orderNumber, setOrderNumber] = useState<number | undefined>(undefined);

	useEffect(() => {
		axios.post(`http://localhost:3030/order`, {}).then(response => {
			setOrderNumber(response.data.orderNumber);
		});
	}, []);

	if (!orderNumber) {
		return <p>Loading...</p>;
	}

	return (
		<div>
			<h2>Thank you!</h2>
			<h3>Your order number is: {orderNumber}</h3>
			<p>as per our terms and conditions, nothing will happen now</p>
			<Button
				onClick={() => {
					resetOrder();
					newOrder();
				}}
				variant="primary"
			>
				Create new order
			</Button>
		</div>
	);
};

export default OrderConfirmation;
