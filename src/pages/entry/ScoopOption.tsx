import React, { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useOrderDetails } from '../../contexts/OrderDetails';

export interface ScoopOptionProps {
	name: string;
	imagePath: string;
}

export const ScoopOption: React.FC<ScoopOptionProps> = ({ name, imagePath }) => {
	const { updateItemCount } = useOrderDetails();
	const [isValid, setIsValid] = useState<boolean>(true);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		if (value === '') return;

		const floatValue = parseFloat(value);
		const validValue =
			floatValue >= 0 && floatValue < 6 && Math.floor(parseFloat(value)) === floatValue;
		setIsValid(validValue);

		if (validValue) {
			updateItemCount(name, value, 'scoops');
		}
	};

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
						isInvalid={!isValid}
						type="number"
						defaultValue={0}
						min={0}
						max={5}
						onChange={handleChange}
					/>
				</Col>
			</Form.Group>
		</Col>
	);
};

export default ScoopOption;
