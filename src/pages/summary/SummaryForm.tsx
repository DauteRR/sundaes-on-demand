import React, { useState } from 'react';
import { Button, Form, OverlayTrigger, Popover } from 'react-bootstrap';
import { OverlayChildren } from 'react-bootstrap/esm/Overlay';

export const TermsAndConditionsPopover: OverlayChildren = () => (
	<Popover id="terms-and-conditions-popover">
		<Popover.Content>No ice cream will actually be delivered</Popover.Content>
	</Popover>
);

export interface SummaryFormProps {
	onOrderConfirmation(): void;
}

export const SummaryForm: React.FC<SummaryFormProps> = ({ onOrderConfirmation }) => {
	const [tcChecked, setTcChecked] = useState<boolean>(false);

	const tcLabel = (
		<span>
			I agree to
			<OverlayTrigger placement="right" overlay={TermsAndConditionsPopover}>
				<span style={{ color: 'blue' }}>Terms and Conditions</span>
			</OverlayTrigger>
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
			<Button onClick={onOrderConfirmation} variant="primary" disabled={!tcChecked}>
				Confirm order
			</Button>
		</Form>
	);
};

export default SummaryForm;
