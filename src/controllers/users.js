import express from 'express';
import errorLogger from '../middleware/logging/error-logger.js';
import { schema } from '../middleware/validation/schema.js';
import { validate } from '../middleware/validation/validation.js';
import {
	getAllUsers,
	getDeletedUsers,
	getUser,
	getAutoSuggestUsers,
	addUser,
	updateUser,
	deleteUser
} from '../services/users.js';

const userRouter = express.Router();

userRouter.get('/', async (req, res) => {
	try {
		const users = await getAllUsers();
		res.json(users);
	} catch (err) {
		errorLogger(err, req);
		throw new Error(err);
	}
});

userRouter.get('/deleted', async (req, res) => {
	try {
		const users = await getDeletedUsers();
		res.json(users);
	} catch (err) {
		errorLogger(err, req);
		throw new Error(err);
	}
});

userRouter.get('/search', async (req, res) => {
	try {
		const { loginSubstring, limit } = req.query;
		const foundUsers = await getAutoSuggestUsers(loginSubstring, limit);
		res.send(foundUsers);
	} catch (err) {
		errorLogger(err, req);
		throw new Error(err);
	}
});

userRouter.get('/:id', async (req, res) => {
	try {
		const user = await getUser(req.params.id);

		if (!user) {
			errorLogger('Not found', req);
			res.sendStatus(404);
		} else {
			res.json(user);
		}
	} catch (err) {
		errorLogger(err, req);
		throw new Error(err);
	}
});

userRouter.post('/', validate(schema), async (req, res) => {
	try {
		await addUser(req.body);
		res.sendStatus(200);
	} catch (err) {
		errorLogger(err, req);
		throw new Error(err);
	}
});

userRouter.put('/:id', validate(schema), async (req, res) => {
	try {
		const user = await updateUser(req.params.id, req.body);

		if (!user) {
			errorLogger('Not found', req);
			res.sendStatus(404);
		} else {
			res.sendStatus(200);
		}
	} catch (err) {
		errorLogger(err, req);
		throw new Error(err);
	}
});

userRouter.delete('/:id', async (req, res) => {
	try {
		const user = await deleteUser(req.params.id);

		if (!user) {
			errorLogger('Not found', req);
			res.sendStatus(404);
		} else {
			res.sendStatus(200);
		}
	} catch (err) {
		errorLogger(err, req);
		throw new Error(err);
	}
});

export { userRouter };
