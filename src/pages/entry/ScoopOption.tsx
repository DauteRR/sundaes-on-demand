import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useOrderDetails } from '../../contexts/OrderDetails';

export interface ScoopOptionProps {
	name: string;
	imagePath: string;
}

export const ScoopOption: React.FC<ScoopOptionProps> = ({ name, imagePath }) => {
	const { updateItemCount } = useOrderDetails();

	return (
		<Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
			<img
				style={{ width: '100%' }}
				src={`http://localhost:3030/${imagePath}`}
				alt={`${name} scoop`}
			></img>
			<Form.Group controlId={`${name}-count`} as={Row} style={{ marginTop: '10px' }}>
				<Form.Label column xs="6" style={{ textAlign: 'right' }}>
					{name}
				</Form.Label>
				<Col xs="5" style={{ textAlign: 'left' }}>
					<Form.Control
						type="number"
						defaultValue={0}
						onChange={event => {
							updateItemCount(name, event.target.value, 'scoops');
						}}
					/>
				</Col>
			</Form.Group>
		</Col>
	);
};

export default ScoopOption;
