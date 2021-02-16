import { render, screen } from '@testing-library/react';
import { Options } from '../Options';

test('Displays image for each scoop option from server', async () => {
	render(<Options optionType="scoops" />);

	const scoopImages = await screen.findAllByRole('img', { name: /.+\sscoop$/i });
	expect(scoopImages).toHaveLength(2);

	const altText = scoopImages.map(element => (element as HTMLImageElement).alt);
	expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
});
