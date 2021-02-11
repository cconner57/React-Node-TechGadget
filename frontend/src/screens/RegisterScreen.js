import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { register } from '../actions/userActions';

const RegisterScreen = ({ location, history }) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [message, setMessage] = useState(null);

	const dispatch = useDispatch();

	const userRegister = useSelector((state) => state.userRegister);
	const { loading, error, userInfo } = userRegister;

	const redirect = location.search ? location.search.split('=')[1] : '/';

	useEffect(() => {
		if (userInfo) {
			history.push(redirect);
		}
	}, [history, userInfo, redirect]);

	const submitHandler = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setMessage('Passwords do not match');
		} else {
			dispatch(register(name, email, password));
		}
	};

	return (
		<div className='SignupContainer'>
			{message && <Message>{message}</Message>}
			{error && <Message>{error}</Message>}
			{loading && <Loader />}
			<form onSubmit={submitHandler}>
				<h1>Sign Up</h1>
				<label htmlFor='name'>Name</label>
				<input
					type='name'
					id='name'
					placeholder='Enter name'
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<label htmlFor='email'>Email Address</label>
				<input
					type='email'
					id='email'
					placeholder='Enter email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<label htmlFor='password'>Password</label>
				<input
					type='password'
					id='password'
					placeholder='Enter password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<label htmlFor='confirmPassword'>Confirm Password</label>
				<input
					type='password'
					id='confirmPassword'
					placeholder='Confirm password'
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
				/>
				<button type='submit'>Register</button>
				<h2>
					Have an Account?{' '}
					<Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
						Login
					</Link>
				</h2>
			</form>
		</div>
	);
};

export default RegisterScreen;