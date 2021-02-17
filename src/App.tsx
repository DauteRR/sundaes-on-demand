import React from 'react';
import { Container } from 'react-bootstrap';
import { OrderDetailsProvider } from './contexts/OrderDetails';
import OrderEntry from './pages/entry/OrderEntry';

export const App: React.FC = () => {
	return (
		<Container>
			<OrderDetailsProvider>
				<OrderEntry />
			</OrderDetailsProvider>
		</Container>
	);
};

export default App;
