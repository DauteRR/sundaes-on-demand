import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

	userEvent.click(conditionsCheckbox);
	expect(confirmOrderButton).toBeEnabled();
	userEvent.click(conditionsCheckbox);
	expect(confirmOrderButton).toBeDisabled();
});

test('Popover responds to hover', async () => {
	render(<SummaryForm />);

	const popoverText = /no ice cream will actually be delivered/i;

	const nullPopover = screen.queryByText(popoverText);
	expect(nullPopover).not.toBeInTheDocument();

	const termsAndConditionsText = screen.getByText(/terms and conditions/i);

	userEvent.hover(termsAndConditionsText);
	const popover = screen.getByText(popoverText);
	expect(popover).toBeInTheDocument();

	userEvent.unhover(termsAndConditionsText);
	await waitForElementToBeRemoved(() => screen.queryByText(popoverText));
});
