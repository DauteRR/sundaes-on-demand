import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

test('Order phases', async () => {
	render(<App />);

	const vanillaScoopInput = await screen.findByRole('spinbutton', { name: /vanilla/i });
	const cherriesToppingCheckbox = await screen.findByRole('checkbox', { name: /cherries/i });

	userEvent.clear(vanillaScoopInput);
	userEvent.type(vanillaScoopInput, '2');
	userEvent.click(cherriesToppingCheckbox);

	const orderButton = screen.getByRole('button', { name: /order/i });
	userEvent.click(orderButton);

	const orderSummaryHeader = screen.getByRole('heading', { name: /order summary/i });
	expect(orderSummaryHeader).toBeInTheDocument();

	const optionItems = screen.getAllByRole('listitem');
	const optionItemsText = optionItems.map(item => item.textContent);
	expect(optionItemsText).toEqual(['Vanilla - 2', 'Cherries']);

	const totalText = screen.getByRole('heading', { name: /total/i });
	expect(totalText).toHaveTextContent('5.50');

	const tcCheckbox = screen.getByRole('checkbox', { name: /terms and conditions/i });
	userEvent.click(tcCheckbox);

	const confirmOrderButton = screen.getByRole('button', { name: /confirm order/i });
	userEvent.click(confirmOrderButton);

	const orderConfirmationHeader = await screen.findByRole('heading', { name: /thank you/i });
	expect(orderConfirmationHeader).toBeInTheDocument();

	const orderNumber = screen.getByRole('heading', {
		name: /your order number is: 123456789/i,
	});
	expect(orderNumber).toBeInTheDocument();

	const newOrderButton = screen.getByRole('button', { name: /new order/i });
	userEvent.click(newOrderButton);

	const orderEntryHeader = screen.getByRole('heading', { name: /design your sundae/i });
	expect(orderEntryHeader).toBeInTheDocument();

	const scoopsTotal = screen.getByText(/scoops total: \$0.00/i);
	expect(scoopsTotal).toBeInTheDocument();
	const toppingsTotal = screen.getByText(/toppings total: \$0.00/i);
	expect(toppingsTotal).toBeInTheDocument();

	await screen.findByRole('spinbutton', { name: 'Vanilla' });
	await screen.findByRole('checkbox', { name: 'Cherries' });
});

test('Conditional toppings section on summary page', async () => {
	render(<App />);

	const vanillaScoopInput = await screen.findByRole('spinbutton', { name: /vanilla/i });

	userEvent.clear(vanillaScoopInput);
	userEvent.type(vanillaScoopInput, '2');

	const orderButton = screen.getByRole('button', { name: /order/i });
	userEvent.click(orderButton);

	const orderSummaryHeader = screen.getByRole('heading', { name: /order summary/i });
	expect(orderSummaryHeader).toBeInTheDocument();

	const toppingsSection = screen.queryByRole('heading', { name: /toppings/i });
	expect(toppingsSection).not.toBeInTheDocument();
});
