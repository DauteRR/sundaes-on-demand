import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { OrderDetailsProvider } from '../../../contexts/OrderDetails';
import { ScoopOption } from '../ScoopOption';

test('Scoop input box turns red for invalid scoop count values', () => {
	render(<ScoopOption name={''} imagePath={''} />, {
		wrapper: OrderDetailsProvider,
	});

	const input = screen.getByRole('spinbutton');

	userEvent.clear(input);
	userEvent.type(input, '-2');
	expect(input).toHaveClass('is-invalid');

	userEvent.clear(input);
	userEvent.type(input, '1.25');
	expect(input).toHaveClass('is-invalid');

	userEvent.clear(input);
	userEvent.type(input, '6');
	expect(input).toHaveClass('is-invalid');

	userEvent.clear(input);
	userEvent.type(input, '5');
	expect(input).not.toHaveClass('is-invalid');
});
