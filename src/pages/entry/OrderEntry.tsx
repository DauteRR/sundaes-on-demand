import React from 'react';
import { Options } from './Options';

export interface OrderEntryProps {}

export const OrderEntry: React.FC<OrderEntryProps> = () => {
	return (
		<div>
			<Options optionType="scoops" />
			<Options optionType="toppings" />
		</div>
	);
};

export default OrderEntry;
