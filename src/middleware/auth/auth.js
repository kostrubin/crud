import jwt from 'jsonwebtoken';

export default function checkToken(req, res, next) {
	const token = req.headers['x-access-token'];

	if (!token) {
		return res.status(401).send('No token provided');
	}

	return jwt.verify(token, process.env.SECRET, (err) => {
		if (err) {
			return res.status(403).send('Failed to authenticate token');
		}

		return next();
	});
}
