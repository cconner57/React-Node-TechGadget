import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder } from '../actions/orderActions';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import { USER_DETAILS_RESET } from '../constants/userConstants';

const PlaceOrderScreen = ({ history }) => {
	const dispatch = useDispatch();

	const cart = useSelector((state) => state.cart);

	if (!cart.shippingAddress.address) {
		history.push('/shipping');
	} else if (!cart.paymentMethod) {
		history.push('/payment');
	}
	const addDecimals = (num) => {
		return (Math.round(num * 100) / 100).toFixed(2);
	};

	cart.itemsPrice = addDecimals(
		cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
	);
	cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100);
	cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
	cart.totalPrice = (
		Number(cart.itemsPrice) +
		Number(cart.shippingPrice) +
		Number(cart.taxPrice)
	).toFixed(2);

	const orderCreate = useSelector((state) => state.orderCreate);
	const { order, success, error } = orderCreate;

	useEffect(() => {
		if (success) {
			history.push(`/order/${order._id}`);
			dispatch({ type: USER_DETAILS_RESET });
			dispatch({ type: ORDER_CREATE_RESET });
		}
		// eslint-disable-next-line
	}, [history, success]);

	const placeOrderHandler = () => {
		dispatch(
			createOrder({
				orderItems: cart.cartItems,
				shippingAddress: cart.shippingAddress,
				paymentMethod: cart.paymentMethod,
				itemsPrice: cart.itemsPrice,
				shippingPrice: cart.shippingPrice,
				taxPrice: cart.taxPrice,
				totalPrice: cart.totalPrice,
			})
		);
	};

	return (
		<div className='PlaceOrderContainer'>
			<CheckoutSteps step1 step2 step3 step4 />
			<div className='OrderOverview'>
				<div className='ItemOverview'>
					<h2>Order Items</h2>
					{cart.cartItems.length === 0 ? (
						<Message>Your cart is empty</Message>
					) : (
						<div className='OrderItemList'>
							{cart.cartItems.map((item, index) => (
								<div className='OrderItem' key={index}>
									<img src={item.image} alt={item.name} />
									<Link to={`/product/${item.product}`}>{item.name}</Link>
									<h2>
										{item.qty} x ${item.price} = ${item.qty * item.price}
									</h2>
								</div>
							))}
						</div>
					)}
				</div>
				<div className='ShippingPayment'>
					<div className='ShippingDetails'>
						<div className='OrderShipping'>
							<h1>Shipping</h1>
							<h2>Address:</h2>
							<p>
								{cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
								{cart.shippingAddress.postalCode},{' '}
								{cart.shippingAddress.country}
							</p>
						</div>
						<div className='PaymentMethod'>
							<h1>Payment Method</h1>
							<div>
								<h2>Method: </h2>
								<p>{cart.paymentMethod}</p>
							</div>
						</div>
					</div>
					<div className='OrderSummary'>
						<h1>Order Summary</h1>
						<div>
							<strong>Items:</strong> <h2>${cart.itemsPrice}</h2>
						</div>
						<div>
							<strong>Shipping:</strong> <h2>${cart.shippingPrice}</h2>
						</div>
						<div>
							<strong>Tax:</strong> <h2>${cart.taxPrice}</h2>
						</div>
						<div>
							<strong>Total:</strong> <h2>${cart.totalPrice}</h2>
						</div>
					</div>
				</div>
				{error && <Message>{error}</Message>}
				<button
					type='button'
					disabled={cart.cartItems === 0}
					onClick={placeOrderHandler}>
					Place Order
				</button>
			</div>
		</div>
	);
};

export default PlaceOrderScreen;
