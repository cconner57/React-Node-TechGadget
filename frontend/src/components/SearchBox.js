import React, { useState } from 'react';

const SearchBox = ({ history }) => {
	const [keyword, setKeyword] = useState('');

	const submitHandler = (e) => {
		e.preventDefault();
		if (keyword.trim()) {
			history.push(`/search/${keyword}`);
		} else {
			history.push('/');
		}
	};

	return (
		<form className='Search' onSubmit={submitHandler} inline>
			<input
				type='text'
				name='q'
				onChange={(e) => setKeyword(e.target.value)}
				placeholder='Search Products...'
			/>
			<button type='submit'>
				<i className='fas fa-search'/>
			</button>
		</form>
	);
};

export default SearchBox;
