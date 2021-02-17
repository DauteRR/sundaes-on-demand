import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { OrderDetailsProvider } from '../../../contexts/OrderDetails';
import { Options } from '../Options';
import OrderEntry from '../OrderEntry';

test('Update scoops subtotal when scoops change', async () => {
	render(<Options optionType="scoops" />, { wrapper: OrderDetailsProvider });

	const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false });
	expect(scoopsSubtotal).toHaveTextContent('0.00');

	const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });
	userEvent.clear(vanillaInput);
	userEvent.type(vanillaInput, '1');

	expect(scoopsSubtotal).toHaveTextContent('2.00');

	const chocolateInput = await screen.findByRole('spinbutton', { name: 'Chocolate' });
	userEvent.clear(chocolateInput);
	userEvent.type(chocolateInput, '2');

	expect(scoopsSubtotal).toHaveTextContent('6.00');
});

test('Update toppings subtotal when toppings change', async () => {
	render(<Options optionType="toppings" />, { wrapper: OrderDetailsProvider });

	const toppingsSubtotal = screen.getByText('Toppings total: $', { exact: false });
	expect(toppingsSubtotal).toHaveTextContent('0.00');

	const mAndMsCheckbox = await screen.findByRole('checkbox', { name: 'M&Ms' });
	userEvent.click(mAndMsCheckbox);
	expect(toppingsSubtotal).toHaveTextContent('1.50');
	const hotFudgeCheckbox = await screen.findByRole('checkbox', { name: 'Hot fudge' });
	userEvent.click(hotFudgeCheckbox);
	expect(toppingsSubtotal).toHaveTextContent('3.00');
	const cherriesCheckbox = await screen.findByRole('checkbox', { name: 'Cherries' });
	userEvent.click(cherriesCheckbox);
	expect(toppingsSubtotal).toHaveTextContent('4.50');
	userEvent.click(hotFudgeCheckbox);
	expect(toppingsSubtotal).toHaveTextContent('3.00');
});

describe('Grand total', () => {
	test('Grand total updates properly if scoop is added first', async () => {
		render(<OrderEntry />, { wrapper: OrderDetailsProvider });

		const grandTotal = screen.getByRole('heading', { name: /grand total: \$/i });
		expect(grandTotal).toHaveTextContent('0.00');

		const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });
		userEvent.clear(vanillaInput);
		userEvent.type(vanillaInput, '2');

		expect(grandTotal).toHaveTextContent('4.00');

		const cherriesCheckbox = await screen.findByRole('checkbox', { name: 'Cherries' });
		userEvent.click(cherriesCheckbox);
		expect(grandTotal).toHaveTextContent('5.50');
	});

	test('Grand total updates properly if topping is added first', async () => {
		render(<OrderEntry />, { wrapper: OrderDetailsProvider });

		const grandTotal = screen.getByRole('heading', { name: /grand total: \$/i });
		expect(grandTotal).toHaveTextContent('0.00');

		const cherriesCheckbox = await screen.findByRole('checkbox', { name: 'Cherries' });
		userEvent.click(cherriesCheckbox);
		expect(grandTotal).toHaveTextContent('1.50');

		const chocolateInput = await screen.findByRole('spinbutton', { name: 'Chocolate' });
		userEvent.clear(chocolateInput);
		userEvent.type(chocolateInput, '3');

		expect(grandTotal).toHaveTextContent('7.50');
	});

	test('Grand total updates properly if item is removed', async () => {
		render(<OrderEntry />, { wrapper: OrderDetailsProvider });

		const grandTotal = screen.getByRole('heading', { name: /grand total: \$/i });

		const cherriesCheckbox = await screen.findByRole('checkbox', { name: 'Cherries' });
		userEvent.click(cherriesCheckbox);
		const hotFudgeCheckbox = await screen.findByRole('checkbox', { name: 'Hot fudge' });
		userEvent.click(hotFudgeCheckbox);

		const vanillaInput = await screen.findByRole('spinbutton', { name: 'Chocolate' });
		userEvent.clear(vanillaInput);
		userEvent.type(vanillaInput, '4');

		expect(grandTotal).toHaveTextContent('11.00');
		userEvent.click(cherriesCheckbox);
		expect(grandTotal).toHaveTextContent('9.50');

		userEvent.clear(vanillaInput);
		userEvent.type(vanillaInput, '3');

		expect(grandTotal).toHaveTextContent('7.50');
	});
});
