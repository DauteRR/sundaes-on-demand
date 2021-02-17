import React from 'react';
import { Col } from 'react-bootstrap';

export interface ToppingOptionProps {
	name: string;
	imagePath: string;
}

export const ToppingOption: React.FC<ToppingOptionProps> = ({ name, imagePath }) => {
	return (
		<Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
			<img
				style={{ width: '100%' }}
				src={`http://localhost:3030/${imagePath}`}
				alt={`${name} topping`}
			></img>
		</Col>
	);
};

export default ToppingOption;
