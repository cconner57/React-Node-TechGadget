import bcrypt from 'bcryptjs';

const users = [
	{
		name: 'Admin User',
		email: 'admin@example.com',
		password: bcrypt.hashSync('123456', 10),
		isAdmin: true,
	},
	{
		name: 'James Smith',
		email: 'james@example.com',
		password: bcrypt.hashSync('123456', 10),
	},
	{
		name: 'Maria Garcia',
		email: 'maria@example.com',
		password: bcrypt.hashSync('123456', 10),
	},
];

export default users;
