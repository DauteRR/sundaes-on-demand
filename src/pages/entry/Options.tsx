import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import { ScoopOption, ScoopOptionProps } from './ScoopOption';
import ToppingOption, { ToppingOptionProps } from './ToppingOption';

export interface OptionsProps {
	optionType: 'scoops' | 'toppings';
}

export const Options: React.FC<OptionsProps> = ({ optionType }) => {
	const [scoops, setScoops] = useState<ScoopOptionProps[]>([]);
	const [toppings, setToppings] = useState<ToppingOptionProps[]>([]);

	useEffect(() => {
		axios
			.get<ScoopOptionProps[] | ToppingOptionProps[]>(`http://localhost:3030/${optionType}`)
			.then(response =>
				optionType === 'scoops'
					? setScoops(response.data as ScoopOptionProps[])
					: setToppings(response.data as ToppingOptionProps[])
			);
	}, [optionType]);

	const optionItems =
		optionType === 'scoops'
			? scoops.map((scoop, index) => (
					<ScoopOption key={index} name={scoop.name} imagePath={scoop.imagePath} />
			  ))
			: toppings.map((topping, index) => <ToppingOption key={index} />);

	return <Row>{optionItems}</Row>;
};

export default Options;
