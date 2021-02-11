import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../actions/cartActions';

const PaymentScreen = ({ history }) => {
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;

	if (!shippingAddress.address) {
		history.push('/shipping');
	}

	const [paymentMethod, setPaymentMethod] = useState('PayPal');

	const dispatch = useDispatch();

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(savePaymentMethod(paymentMethod));
		history.push('/placeorder');
	};

	return (
		<div className='PaymentContainer'>
			<CheckoutSteps step1 step2 step3 />
			<form onSubmit={submitHandler}>
				<h1>Payment Method</h1>
				<h2>Select Method</h2>
				<div className='PaymentType'>
					<input
						type='radio'
						label='PayPal or Credit Card'
						id='PayPal'
						name='paymentMethod'
						value='PayPal'
						checked
						onChange={(e) => setPaymentMethod(e.target.value)}
					/>
					<label htmlFor='PayPal'>PayPal</label>
				</div>
				<div className='PaymentType'>
					<input
						type='radio'
						label='Stripe'
						id='Stripe'
						name='paymentMethod'
						value='Stripe'
						disabled
						onChange={(e) => setPaymentMethod(e.target.value)}
					/>
					<label disabled htmlFor='Stripe'>Stripe</label>
				</div>
				<button type='submit'>Continue</button>
			</form>
		</div>
	);
};

export default PaymentScreen;
