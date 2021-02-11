import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
	return (
		<div className='CheckoutSteps'>
			<div>
				{step1 ? (
					<Link to='/login'>
						<h2>Sign In</h2>
					</Link>
				) : (
					<h2 disabled>Sign In</h2>
				)}
			</div>
			<div>
				{step2 ? (
					<Link to='/shipping'>
						<h2>Shipping</h2>
					</Link>
				) : (
					<h2 disabled>Shipping</h2>
				)}
			</div>
			<div>
				{step3 ? (
					<Link to='/payment'>
						<h2>Payment</h2>
					</Link>
				) : (
					<h2 disabled>Payment</h2>
				)}
			</div>
			<div>
				{step4 ? (
					<Link to='/placeorder'>
						<h2>Place Order</h2>
					</Link>
				) : (
					<h2 disabled>Place Order</h2>
				)}
			</div>
		</div>
	);
};

export default CheckoutSteps;
