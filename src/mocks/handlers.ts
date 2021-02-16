import { rest } from 'msw';
import { RequestHandlersList } from 'msw/lib/types/setupWorker/glossary';

export const handlers: RequestHandlersList = [
	rest.get('http://localhost:3030/scoops', (req, res, ctx) => {
		return res(
			ctx.json([
				{
					name: 'Chocolate',
					imagePath: '/images/chocolate.png',
				},
				{
					name: 'Vanilla',
					imagePath: '/images/vanilla.png',
				},
			])
		);
	}),
];
