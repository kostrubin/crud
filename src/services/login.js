import User from '../models/user.js';
import jwt from 'jsonwebtoken';

export default async function login(username, password) {
	if (!username || !password) {
		throw new Error('Empty login or password');
	}

	const user = await User.findOne({
		where: {
			login: username,
			password,
			isDeleted: false
		}
	});

	if (!user) {
		throw new Error('Not found');
	}

	return jwt.sign(
		{ id: user.id },
		process.env.SECRET,
		{ expiresIn: 60 }
	);
}
