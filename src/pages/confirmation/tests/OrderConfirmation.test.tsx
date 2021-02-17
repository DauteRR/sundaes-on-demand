import { render, screen } from '@testing-library/react';
import { rest } from 'msw';
import { OrderDetailsProvider } from '../../../contexts/OrderDetails';
import { server } from '../../../mocks/server';
import { OrderConfirmation } from '../OrderConfirmation';

test('Loading... text appears on component mount and disappears once the query resolves', async () => {
	render(<OrderConfirmation newOrder={jest.fn()} />, { wrapper: OrderDetailsProvider });

	const loadingText = screen.getByText(/loading/i);
	expect(loadingText).toBeInTheDocument();

	const orderNumber = await screen.findByText(/order number/i);
	expect(orderNumber).toBeInTheDocument();

	const notLoading = screen.queryByText(/loading/i);
	expect(notLoading).not.toBeInTheDocument();
});

test('Appears an alert if the submit order operation fails', async () => {
	server.resetHandlers(
		rest.post('http://localhost:3030/order', (req, res, ctx) => res(ctx.status(500)))
	);

	render(<OrderConfirmation newOrder={jest.fn()} />, { wrapper: OrderDetailsProvider });

	const alert = await screen.findByRole('alert');
	expect(alert).toHaveTextContent(/unexpected error/i);
});
