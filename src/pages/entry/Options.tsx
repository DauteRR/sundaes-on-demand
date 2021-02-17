import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import { pricePerItem } from '../../constants';
import { OptionType, useOrderDetails } from '../../contexts/OrderDetails';
import { formatCurrency } from '../../utilities';
import AlertBanner from '../common/AlertBanner';
import { ScoopOption, ScoopOptionProps } from './ScoopOption';
import ToppingOption, { ToppingOptionProps } from './ToppingOption';

export interface OptionsProps {
	optionType: OptionType;
}

export const Options: React.FC<OptionsProps> = ({ optionType }) => {
	const [scoops, setScoops] = useState<ScoopOptionProps[]>([]);
	const [toppings, setToppings] = useState<ToppingOptionProps[]>([]);
	const [error, setError] = useState<boolean>(false);

	const { totals } = useOrderDetails();

	useEffect(() => {
		axios
			.get<ScoopOptionProps[] | ToppingOptionProps[]>(`http://localhost:3030/${optionType}`)
			.then(response =>
				optionType === 'scoops'
					? setScoops(response.data as ScoopOptionProps[])
					: setToppings(response.data as ToppingOptionProps[])
			)
			.catch(error => setError(true));
	}, [optionType]);

	if (error) {
		return <AlertBanner />;
	}

	const optionItems =
		optionType === 'scoops'
			? scoops.map((scoop, index) => (
					<ScoopOption key={index} name={scoop.name} imagePath={scoop.imagePath} />
			  ))
			: toppings.map((topping, index) => (
					<ToppingOption key={index} name={topping.name} imagePath={topping.imagePath} />
			  ));

	const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

	return (
		<>
			<h2>{title}</h2>
			<p>{formatCurrency(pricePerItem[optionType])} each</p>
			<p>
				{title} total: {totals[optionType]}
			</p>
			<Row>{optionItems}</Row>
		</>
	);
};

export default Options;
