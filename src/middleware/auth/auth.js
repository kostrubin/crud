import jwt from 'jsonwebtoken';
import { SECRET } from '../../config/config.js';

export default function checkToken(req, res, next) {
	const token = req.headers['x-access-token'];

	if (!token) {
		return res.status(401).send({
			success: false,
			message: 'No token provided'
		});
	}

	return jwt.verify(token, SECRET, (err) => {
		if (err) {
			return res.status(403).send({
				success: false,
				message: 'Failed to authenticate token'
			});
		}

		return next();
	});
}
