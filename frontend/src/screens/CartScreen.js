import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../actions/cartActions';

const CartScreen = ({ match, location, history }) => {
	const productId = match.params.id;

	const qty = location.search ? Number(location.search.split('=')[1]) : 1;

	const dispatch = useDispatch();

	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;

	useEffect(() => {
		if (productId) {
			dispatch(addToCart(productId, qty));
		}
	}, [dispatch, productId, qty]);

	const removeFromCartHandler = (id) => {
		dispatch(removeFromCart(id));
	};

	const checkoutHandler = () => {
		history.push('/login?redirect=shipping');
	};

	return (
		<>
			<div className='Cart'>
				<h1>Shopping Cart</h1>
				{cartItems.length === 0 ? (
					<Message>Cart is empty</Message>
				) : (
					<>
						{cartItems.map((item) => (
							<div className='Cart-Item' key={item.product}>
								<img src={item.image} alt={item.name} />
								<Link to={`/product/${item.product}`}>{item.name}</Link>
								<h2>${item.price}</h2>
								<div>
									<select
										value={item.qty}
										onChange={(e) =>
											dispatch(addToCart(item.product, Number(e.target.value)))
										}>
										{[...Array(item.countInStock).keys()].map((x) => (
											<option key={x + 1} value={x + 1}>
												{x + 1}
											</option>
										))}
									</select>
									<button
										type='submit'
										onClick={() => removeFromCartHandler(item.product)}>
										<i className='fas fa-trash'></i>
									</button>
								</div>
							</div>
						))}
					</>
				)}
			</div>
			<div className='CartTotal'>
				<h2>
					Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
				</h2>
				<h2>
					$
					{cartItems
						.reduce((acc, item) => acc + item.qty * item.price, 0)
						.toFixed(2)}
				</h2>
				<button
					type='submit'
					disabled={cartItems.length === 0}
					onClick={checkoutHandler}>
					Proceed To Checkout
				</button>
			</div>
		</>
	);
};

export default CartScreen;
