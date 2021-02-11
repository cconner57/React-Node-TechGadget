import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Rating from '../components/Rating';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Meta from '../components/Meta';
import {
	listProductDetails,
	createProductReview,
} from '../actions/productActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';

const ProductScreen = ({ history, match }) => {
	const [qty, setQty] = useState(1);
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState('');

	const dispatch = useDispatch();

	const productDetails = useSelector((state) => state.productDetails);
	const { loading, error, product } = productDetails;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const productReviewCreate = useSelector((state) => state.productReviewCreate);
	const {
		success: successProductReview,
		loading: loadingProductReview,
		error: errorProductReview,
	} = productReviewCreate;

	useEffect(() => {
		if (successProductReview) {
			setRating(0);
			setComment('');
		}
		if (!product._id || product._id !== match.params.id) {
			dispatch(listProductDetails(match.params.id));
			dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
		}
	}, [dispatch, match, successProductReview, product]);

	const addToCartHandler = () => {
		history.push(`/cart/${match.params.id}?qty=${qty}`);
	};

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			createProductReview(match.params.id, {
				rating,
				comment,
			})
		);
	};

	return (
		<>
			{loading ? (
				<Loader />
			) : error ? (
				<Message>{error}</Message>
			) : (
				<>
					<Meta title={product.name} />
					<div className='ProductContainer'>
						<div className='ProductOverview'>
							<img src={product.image} alt={product.name} />
							<div className='ProductDescription'>
								<h2 className='ProductTitle'>{product.name}</h2>
								<Rating
									value={product.rating}
									text={`${product.numReviews} reviews`}
								/>
								<h3 className='ProductPrice'>Price: ${product.price}</h3>
								<h3>Description: {product.description}</h3>
								{product.countInStock > 0 && (
									<div className='ProductQty'>
										<h3>Quantity</h3>
										<select
											value={qty}
											onChange={(e) => setQty(e.target.value)}>
											{[...Array(product.countInStock).keys()].map((x) => (
												<option key={x + 1} value={x + 1}>
													{x + 1}
												</option>
											))}
										</select>
									</div>
								)}
								<button
									onClick={addToCartHandler}
									className='btn-block'
									type='button'
									disabled={product.countInStock === 0}>
									Add To Cart
								</button>
							</div>
						</div>
						<div className='ProductReviewSection'>
							<div className='ProductReviews'>
								<h2>Reviews</h2>
								{product.reviews.length === 0 && <Message>No Reviews</Message>}
								{product.reviews.map((review) => (
									<div key={review._id}>
										<strong>{review.name}</strong>
										<Rating value={review.rating} />
										<p>{review.createdAt.substring(0, 10)}</p>
										<p>{review.comment}</p>
									</div>
								))}
							</div>
							<div className='ProductReviewSignin'>
								<h2>Write a Customer Review</h2>
								{successProductReview && (
									<Message variant='success'>
										Review submitted successfully
									</Message>
								)}
								{loadingProductReview && <Loader />}
								{errorProductReview && (
									<Message variant='danger'>{errorProductReview}</Message>
								)}
								{userInfo ? (
									<form className='CustomerReview' onSubmit={submitHandler}>
										<div className='SelectContainer'>
											<label htmlFor='rating'>Rating</label>
											<select
												id='rating'
												value={rating}
												onChange={(e) => setRating(e.target.value)}>
												<option value=''>Select...</option>
												<option value='1'>1 - Poor</option>
												<option value='2'>2 - Fair</option>
												<option value='3'>3 - Good</option>
												<option value='4'>4 - Very Good</option>
												<option value='5'>5 - Excellent</option>
											</select>
										</div>
										<div className='CommentContainer'>
											<label htmlFor='comment'>Comment</label>
											<textarea
												id='comment'
												value={comment}
												onChange={(e) => setComment(e.target.value)}></textarea>
										</div>
										<button disabled={loadingProductReview} type='submit'>
											Submit
										</button>
									</form>
								) : (
									<Message>
										Please <Link to='/login'>sign in</Link> to write a review{' '}
									</Message>
								)}
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default ProductScreen;
