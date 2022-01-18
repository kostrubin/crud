import express from 'express';
import login from '../services/login.js';

const authRouter = express.Router();

authRouter.post('/', async (req, res) => {
	try {
		const token = await login(req.body.username, req.body.password);
		res.send(token);
	} catch (err) {
		res
			.status(401)
			.send({
				success: false,
				message: 'Bad username/password combination'
			});
	}
});

export { authRouter };
