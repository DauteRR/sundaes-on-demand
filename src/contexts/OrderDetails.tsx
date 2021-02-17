import { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { pricePerItem } from '../constants';
import { formatCurrency } from '../utilities';

export type OptionType = 'scoops' | 'toppings';
export type OptionCount = Record<string, number>;
export type OptionCounts = Record<OptionType, OptionCount>;

export type Totals = Record<OptionType | 'grandTotal', string>;

export interface OrderDetailsContext {
	updateItemCount(itemName: string, newItemCount: string, optionType: OptionType): void;
	resetOrder(): void;
	totals: Totals;
	optionCounts: OptionCounts;
	initialized: boolean;
}

const zeroCurrency = formatCurrency(0);

const OrderDetails = createContext<OrderDetailsContext>({
	resetOrder: () => {},
	updateItemCount: () => {},
	totals: {
		grandTotal: zeroCurrency,
		scoops: zeroCurrency,
		toppings: zeroCurrency,
	},
	optionCounts: {
		scoops: {},
		toppings: {},
	},
	initialized: false,
});

export function useOrderDetails() {
	const context = useContext(OrderDetails);

	if (!context.initialized) {
		throw new Error('useOrderDetails must be used within an OrderDetailsProvider');
	}

	return context;
}

const calculateSubtotal = (optionType: OptionType, optionCounts: OptionCounts): number => {
	const counts = optionCounts[optionType];
	const countsArray = Object.values(counts);

	if (countsArray.length < 1) {
		return 0;
	}

	const count = countsArray.reduce((acc: number, current: number) => acc + current);

	return count * pricePerItem[optionType];
};

export const OrderDetailsProvider: React.FC = ({ children }) => {
	const [optionCounts, setOptionCounts] = useState<OptionCounts>({
		scoops: {},
		toppings: {},
	});
	const [totals, setTotals] = useState<Totals>({
		scoops: zeroCurrency,
		toppings: zeroCurrency,
		grandTotal: zeroCurrency,
	});

	useEffect(() => {
		const scoopsSubtotal = calculateSubtotal('scoops', optionCounts);
		const toppingsSubtotal = calculateSubtotal('toppings', optionCounts);
		const grandTotal = scoopsSubtotal + toppingsSubtotal;
		setTotals({
			scoops: formatCurrency(scoopsSubtotal),
			toppings: formatCurrency(toppingsSubtotal),
			grandTotal: formatCurrency(grandTotal),
		});
	}, [optionCounts]);

	const value = useMemo(() => {
		const updateItemCount = (
			itemName: string,
			newItemCount: string,
			optionType: OptionType
		): void => {
			const newOptionCounts = { ...optionCounts };

			const counts = optionCounts[optionType];
			counts[itemName] = parseInt(newItemCount);

			setOptionCounts(newOptionCounts);
		};

		const resetOrder = (): void => {
			setOptionCounts({
				scoops: {},
				toppings: {},
			});
		};
		return { optionCounts, totals, updateItemCount, resetOrder, initialized: true };
	}, [optionCounts, totals]);
	return <OrderDetails.Provider value={value}>{children}</OrderDetails.Provider>;
};
