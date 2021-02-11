import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { login } from '../actions/userActions';

const LoginScreen = ({ location, history }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { loading, error, userInfo } = userLogin;

	const redirect = location.search ? location.search.split('=')[1] : '/';

	useEffect(() => {
		if (userInfo) {
			history.push(redirect);
		}
	}, [history, userInfo, redirect]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(login(email, password));
	};

	return (
		<div className='LoginContainer'>
			{error && <Message>{error}</Message>}
			{loading && <Loader />}
			<form onSubmit={submitHandler}>
				<h1>Sign In</h1>
				<label htmlFor='email'>Email</label>
				<input
					type='email'
					placeholder='Enter email'
					value={email}
					id='email'
					onChange={(e) => setEmail(e.target.value)}
				/>

				<label htmlFor='password'>Password</label>
				<input
					type='password'
					placeholder='Enter password'
					value={password}
					id='password'
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button type='submit'>
					Sign In
				</button>
				<h2>
					New Customer?{' '}
					<Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
						Register
					</Link>
				</h2>
			</form>
		</div>
	);
};

export default LoginScreen;
