import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

export interface SummaryFormProps {}

export const SummaryForm: React.FC<SummaryFormProps> = () => {
	const [tcChecked, setTcChecked] = useState<boolean>(false);

	const tcLabel = (
		<span>
			I agree to <span style={{ color: 'blue' }}>Terms and Conditions</span>
		</span>
	);

	return (
		<Form>
			<Form.Group controlId="terms-and-conditions">
				<Form.Check
					type="checkbox"
					checked={tcChecked}
					onChange={e => setTcChecked(e.currentTarget.checked)}
					label={tcLabel}
				/>
			</Form.Group>
			<Button variant="primary" type="submit" disabled={!tcChecked}>
				Confirm order
			</Button>
		</Form>
	);
};

export default SummaryForm;
