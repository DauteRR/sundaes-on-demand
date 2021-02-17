import { server } from '../../../mocks/server';
import { rest } from 'msw';
import { OrderEntry } from '../OrderEntry';
import { waitFor, screen, render } from '@testing-library/react';
import { OrderDetailsProvider } from '../../../contexts/OrderDetails';

test('Handles error for scoops and toppings routes', async () => {
	server.resetHandlers(
		rest.get('http://localhost:3030/scoops', (req, res, ctx) => res(ctx.status(500))),
		rest.get('http://localhost:3030/toppings', (req, res, ctx) => res(ctx.status(500)))
	);

	render(<OrderEntry goToOrderSummary={() => {}} />, { wrapper: OrderDetailsProvider });

	await waitFor(async () => {
		const alerts = await screen.findAllByRole('alert');
		expect(alerts).toHaveLength(2);
	});
});
