import React from 'react';
import { Alert } from 'react-bootstrap';
import { Variant } from 'react-bootstrap/esm/types';

export interface AlertBannerProps {
	message?: string;
	variant?: Variant;
}

export const AlertBanner: React.FC<AlertBannerProps> = ({
	message = 'An unexpected error occurred',
	variant = 'danger',
}) => {
	return <Alert variant={variant}>{message}</Alert>;
};

export default AlertBanner;
