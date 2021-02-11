import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import Loader from './Loader';
import Message from './Message';
import { listTopProducts } from '../actions/productActions';

const ProductCarousel = () => {
	const [current, setCurrent] = useState(0);

	const dispatch = useDispatch();

	const productTopRated = useSelector((state) => state.productTopRated);
	const { loading, error, products } = productTopRated;

	useEffect(() => {
		dispatch(listTopProducts());
	}, [dispatch]);

	useEffect(() => {
		const intervalId = setInterval(() => {
			setCurrent(current === products.length - 1 ? 0 : current + 1);
		}, 5000);
		return () => clearInterval(intervalId);
	}, [current, products]);

	return loading ? (
		<Loader />
	) : error ? (
		<Message variant='danger'>{error}</Message>
	) : (
		<div className='Carousel'>
			{products[0] && (
				<AnimatePresence exitBeforeEnter>
					<motion.div
						className='Carousel-Item'
						key={products[current]._id}
						initial={{ opacity: 0, x: 400 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0, x: -400 }}
						transition={{ duration: 1 }}>	
						<Link to={`/product/${products[current]._id}`}>
							<div className='Carousel-Title'>
								<h2>{products[current].name}</h2>
							</div>
							<img src={products[current].image} alt={products[current].name} />
						</Link>
					</motion.div>
				</AnimatePresence>
			)}
		</div>
	);
};

export default ProductCarousel;
