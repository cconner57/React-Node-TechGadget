import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {
	return (
		<div className='Product'>
			<Link to={`/product/${product._id}`}>
				<img className='Product-Image' src={product.image} alt={product.name} />
			</Link>

			<div className='Product-Info'>
				<Link className='Product-Name' to={`/product/${product._id}`}>
					<h3>{product.name}</h3>
				</Link>

				<div className='Product-Rating'>
					<Rating
						value={product.rating}
						text={`${product.numReviews} reviews`}
					/>
					<h3 className='Product-Price'>${product.price}</h3>
				</div>
			</div>
		</div>
	);
};

export default Product;
