import { server } from '../../../mocks/server';
import { rest } from 'msw';
import { OrderEntry } from '../OrderEntry';
import { waitFor, screen, render } from '@testing-library/react';
import { OrderDetailsProvider } from '../../../contexts/OrderDetails';
import userEvent from '@testing-library/user-event';

test('Handles error for scoops and toppings routes', async () => {
	server.resetHandlers(
		rest.get('http://localhost:3030/scoops', (req, res, ctx) => res(ctx.status(500))),
		rest.get('http://localhost:3030/toppings', (req, res, ctx) => res(ctx.status(500)))
	);

	render(<OrderEntry goToOrderSummary={jest.fn()} />, { wrapper: OrderDetailsProvider });

	await waitFor(async () => {
		const alerts = await screen.findAllByRole('alert');
		expect(alerts).toHaveLength(2);
	});
});

test('Order button is disabled if no scoops are ordered', async () => {
	render(<OrderEntry goToOrderSummary={jest.fn()} />, { wrapper: OrderDetailsProvider });

	const vanillaScoop = await screen.findByRole('spinbutton', { name: /vanilla/i });
	expect(vanillaScoop).toBeInTheDocument();

	const orderButton = screen.getByRole('button', { name: /order/i });
	expect(orderButton).toBeDisabled();

	userEvent.clear(vanillaScoop);
	userEvent.type(vanillaScoop, '2');

	expect(orderButton).toBeEnabled();

	userEvent.clear(vanillaScoop);
	userEvent.type(vanillaScoop, '0');

	expect(orderButton).toBeDisabled();
});

test('Scoops subtotal does not update for invalid scoop count', async () => {
	render(<OrderEntry goToOrderSummary={jest.fn()} />, {
		wrapper: OrderDetailsProvider,
	});

	const vanillaScoop = await screen.findByRole('spinbutton', { name: /vanilla/i });
	expect(vanillaScoop).toBeInTheDocument();

	userEvent.clear(vanillaScoop);
	userEvent.type(vanillaScoop, '-2');

	const scoopsSubtotal = screen.getByText(/scoops total/i);
	expect(scoopsSubtotal).toHaveTextContent('0.00');
});
