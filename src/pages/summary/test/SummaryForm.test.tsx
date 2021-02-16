import { fireEvent, render, screen } from '@testing-library/react';
import { SummaryForm } from '../SummaryForm';

test('Initial conditions', () => {
	render(<SummaryForm />);
	const conditionsCheckbox = screen.getByRole('checkbox', {
		name: /terms and conditions/i,
	});
	expect(conditionsCheckbox).not.toBeChecked();

	const confirmOrderButton = screen.getByRole('button', { name: /confirm order/i });
	expect(confirmOrderButton).toBeDisabled();
});

test('Checkbox enables button on first click and disables on second click', () => {
	render(<SummaryForm />);
	const conditionsCheckbox = screen.getByRole('checkbox', {
		name: /terms and conditions/i,
	});
	const confirmOrderButton = screen.getByRole('button', { name: /confirm order/i });

	fireEvent.click(conditionsCheckbox);
	expect(confirmOrderButton).toBeEnabled();
	fireEvent.click(conditionsCheckbox);
	expect(confirmOrderButton).toBeDisabled();
});
