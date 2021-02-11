import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
	listProducts,
	deleteProduct,
	createProduct,
} from '../actions/productActions';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';

const ProductListScreen = ({ history, match }) => {
	const pageNumber = match.params.pageNumber || 1;

	const dispatch = useDispatch();

	const productList = useSelector((state) => state.productList);
	const { loading, error, products } = productList;

	const productDelete = useSelector((state) => state.productDelete);
	const {
		loading: loadingDelete,
		error: errorDelete,
		success: successDelete,
	} = productDelete;

	const productCreate = useSelector((state) => state.productCreate);
	const {
		loading: loadingCreate,
		error: errorCreate,
		success: successCreate,
		product: createdProduct,
	} = productCreate;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	useEffect(() => {
		dispatch({ type: PRODUCT_CREATE_RESET });

		if (!userInfo || !userInfo.isAdmin) {
			history.push('/login');
		}

		if (successCreate) {
			history.push(`/admin/product/${createdProduct._id}/edit`);
		} else {
			dispatch(listProducts('', pageNumber));
		}
	}, [
		dispatch,
		history,
		userInfo,
		successDelete,
		successCreate,
		createdProduct,
		pageNumber,
	]);

	const deleteHandler = (id) => {
		if (window.confirm('Are you sure')) {
			dispatch(deleteProduct(id));
		}
	};

	const createProductHandler = () => {
		dispatch(createProduct());
	};

	return (
		<>
			<div>
				<h1>Products</h1>
				<button className='my-3' onClick={createProductHandler}>
					<i className='fas fa-plus'></i> Create Product
				</button>
			</div>
			{loadingDelete && <Loader />}
			{errorDelete && <Message>{errorDelete}</Message>}
			{loadingCreate && <Loader />}
			{errorCreate && <Message>{errorCreate}</Message>}
			{loading ? (
				<Loader />
			) : error ? (
				<Message>{error}</Message>
			) : (
				<>
					<table>
						<thead>
							<tr>
								<th>ID</th>
								<th>NAME</th>
								<th>PRICE</th>
								<th>CATEGORY</th>
								<th>BRAND</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{products.map((product) => (
								<tr key={product._id}>
									<td>{product._id}</td>
									<td>{product.name}</td>
									<td>${product.price}</td>
									<td>{product.category}</td>
									<td>{product.brand}</td>
									<td>
										<Link to={`/admin/product/${product._id}/edit`}>
											<button variant='light' className='btn-sm'>
												<i className='fas fa-edit'></i>
											</button>
										</Link>
										<button
											variant='danger'
											className='btn-sm'
											onClick={() => deleteHandler(product._id)}>
											<i className='fas fa-trash'></i>
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</>
			)}
		</>
	);
};

export default ProductListScreen;
