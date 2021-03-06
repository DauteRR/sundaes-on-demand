import { render, screen } from '@testing-library/react';
import { OrderDetailsProvider } from '../../../contexts/OrderDetails';
import { Options } from '../Options';

test('Displays image for each scoop option from server', async () => {
	render(<Options optionType="scoops" />, { wrapper: OrderDetailsProvider });

	const scoopImages = await screen.findAllByRole('img', { name: /.+\sscoop$/i });
	expect(scoopImages).toHaveLength(2);

	const altText = scoopImages.map(element => (element as HTMLImageElement).alt);
	expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
});

test('Displays image for each topping option from server', async () => {
	render(<Options optionType="toppings" />, { wrapper: OrderDetailsProvider });

	const toopingImages = await screen.findAllByRole('img', { name: /.+\stopping$/i });
	expect(toopingImages).toHaveLength(3);

	const altText = toopingImages.map(element => (element as HTMLImageElement).alt);
	expect(altText).toEqual(['Cherries topping', 'M&Ms topping', 'Hot fudge topping']);
});
