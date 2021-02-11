import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUser } from '../actions/userActions';
import { USER_UPDATE_RESET } from '../constants/userConstants';

const UserEditScreen = ({ match, history }) => {
	const userId = match.params.id;

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [isAdmin, setIsAdmin] = useState(false);

	const dispatch = useDispatch();

	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, user } = userDetails;

	const userUpdate = useSelector((state) => state.userUpdate);
	const {
		loading: loadingUpdate,
		error: errorUpdate,
		success: successUpdate,
	} = userUpdate;

	useEffect(() => {
		if (successUpdate) {
			dispatch({ type: USER_UPDATE_RESET });
			history.push('/admin/userlist');
		} else {
			if (!user.name || user._id !== userId) {
				dispatch(getUserDetails(userId));
			} else {
				setName(user.name);
				setEmail(user.email);
				setIsAdmin(user.isAdmin);
			}
		}
	}, [dispatch, history, userId, user, successUpdate]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(updateUser({ _id: userId, name, email, isAdmin }));
	};

	return (
		<>
			<Link to='/admin/userlist'>
				Go Back
			</Link>
			<div>
				<h1>Edit User</h1>
				{loadingUpdate && <Loader />}
				{errorUpdate && <Message>{errorUpdate}</Message>}
				{loading ? (
					<Loader />
				) : error ? (
					<Message>{error}</Message>
				) : (
					<form onSubmit={submitHandler}>
						<label>Name</label>
						<input
							type='name'
							placeholder='Enter name'
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>

						<label>Email Address</label>
						<input
							type='email'
							placeholder='Enter email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<input
							type='checkbox'
							label='Is Admin'
							checked={isAdmin}
							onChange={(e) => setIsAdmin(e.target.checked)}
						/>
						<button type='submit'>Update</button>
					</form>
				)}
			</div>
		</>
	);
};

export default UserEditScreen;
