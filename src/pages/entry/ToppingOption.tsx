import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useOrderDetails } from '../../contexts/OrderDetails';

export interface ToppingOptionProps {
	name: string;
	imagePath: string;
}

export const ToppingOption: React.FC<ToppingOptionProps> = ({ name, imagePath }) => {
	const { updateItemCount } = useOrderDetails();

	return (
		<Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
			<img
				style={{ width: '100%' }}
				src={`http://localhost:3030/${imagePath}`}
				alt={`${name} topping`}
			></img>
			<Form.Group controlId={`${name}-topping-checkbox`} as={Row} style={{ marginTop: '10px' }}>
				<Col xs="5" style={{ textAlign: 'left' }}>
					<Form.Check
						type="checkbox"
						label={name}
						onChange={event => {
							updateItemCount(name, event.target.checked ? '1' : '0', 'toppings');
						}}
					/>
				</Col>
			</Form.Group>
		</Col>
	);
};

export default ToppingOption;
