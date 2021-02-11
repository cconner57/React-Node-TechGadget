import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import { saveShippingAddress } from '../actions/cartActions';

const ShippingScreen = ({ history }) => {
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;

	const [address, setAddress] = useState(shippingAddress.address);
	const [city, setCity] = useState(shippingAddress.city);
	const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
	const [country, setCountry] = useState(shippingAddress.country);

	const dispatch = useDispatch();

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(saveShippingAddress({ address, city, postalCode, country }));
		history.push('/payment');
	};

	return (
		<div className='ShippingContainer'>
			<CheckoutSteps step1 step2 />
			<form onSubmit={submitHandler}>
				<h1>Shipping</h1>
				<label htmlFor='address'>Address</label>
				<input
					id='address'
					type='text'
					placeholder='Enter address'
					value={address}
					required
					onChange={(e) => setAddress(e.target.value)}
				/>
				<label htmlFor='city'>City</label>
				<input
					id='city'
					type='text'
					placeholder='Enter city'
					value={city}
					required
					onChange={(e) => setCity(e.target.value)}
				/>
				<label htmlFor=''>Postal Code</label>
				<input
					id='postalCode'
					type='text'
					placeholder='Enter postal code'
					value={postalCode}
					required
					onChange={(e) => setPostalCode(e.target.value)}
				/>
				<label htmlFor='country'>Country</label>
				<input
					id='country'
					type='text'
					placeholder='Enter country'
					value={country}
					required
					onChange={(e) => setCountry(e.target.value)}
				/>
				<button type='submit'>Continue</button>
			</form>
		</div>
	);
};

export default ShippingScreen;
