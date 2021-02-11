import React from 'react';
import { Link, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SearchBox from './SearchBox';
import { logout } from '../actions/userActions';

const Header = () => {
	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const logoutHandler = () => {
		dispatch(logout());
	};

	return (
		<div className='Nav-Container'>
			<Link to='/' className='Logo'>
				<h1>TechGadget</h1>
			</Link>
			<Route render={({ history }) => <SearchBox history={history} />} />
			<nav>
				<Link to='/cart' className='Cart-Icon'>
					<h5>
						<i className='fas fa-shopping-cart'></i> Cart
					</h5>
				</Link>
				{userInfo ? (
					<div className='username'>
						<h5>{userInfo.name},&nbsp;</h5>
						{/* <Link to='/profile'>
							<h5>Profile</h5>
						</Link> */}
						<h5 onClick={logoutHandler}>Logout</h5>
					</div>
				) : (
					<Link to='/login' className='Signin'>
						<h5>
							<i className='fas fa-user'></i> Sign In
						</h5>
					</Link>
				)}
				{/* {userInfo && userInfo.isAdmin && (
					<NavDropdown title='Admin' id='adminmenu'>
						<Link to='/admin/userlist'>
							<NavDropdown.Item>Users</NavDropdown.Item>
						</Link>
						<Link to='/admin/productlist'>
							<NavDropdown.Item>Products</NavDropdown.Item>
						</Link>
						<Link to='/admin/orderlist'>
							<NavDropdown.Item>Orders</NavDropdown.Item>
						</Link>
					</NavDropdown>
				)} */}
			</nav>
		</div>
	);
};

export default Header;
