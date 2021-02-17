import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { OrderDetailsProvider } from './contexts/OrderDetails';
import OrderConfirmation from './pages/confirmation/OrderConfirmation';
import OrderEntry from './pages/entry/OrderEntry';
import OrderSummary from './pages/summary/OrderSummary';

type OrderPhase = 'inProgress' | 'review' | 'complete';

export const App: React.FC = () => {
	const [orderPhase, setOrderPhase] = useState<OrderPhase>('inProgress');

	let content: JSX.Element;

	switch (orderPhase) {
		case 'complete':
			content = <OrderConfirmation newOrder={() => setOrderPhase('inProgress')} />;
			break;
		case 'inProgress':
			content = <OrderEntry goToOrderSummary={() => setOrderPhase('review')} />;
			break;
		case 'review':
			content = <OrderSummary goToOrderConfirmation={() => setOrderPhase('complete')} />;
			break;
	}

	return (
		<Container>
			<OrderDetailsProvider>{content}</OrderDetailsProvider>
		</Container>
	);
};

export default App;
