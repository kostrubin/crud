import express from 'express';
import { schema } from './validation/schema.js';
import { validate } from './validation/validation.js';
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
	const users = await getAllUsers();

	return res.json(users);
});

userRouter.get('/deleted', async (req, res) => {
	const users = await getDeletedUsers();

	return res.json(users);
});

userRouter.get('/search', async (req, res) => {
	const { loginSubstring, limit } = req.query;
	const foundUsers = await getAutoSuggestUsers(loginSubstring, limit);

	if (foundUsers === undefined) {
		res
			.status(404)
			.send('No match');
	}

	res.send(foundUsers);
});

userRouter.get('/:id', async (req, res) => {
	const user = await getUser(req.params.id);

	if (user === undefined) {
		res
			.status(404)
			.json({ message: `User with id ${req.params.id} not found` });
	} else {
		res.json(user);
	}
});

userRouter.post('/', validate(schema), async (req, res) => {
	await addUser(req.body);
	res.sendStatus(200);
});

userRouter.put('/:id', validate(schema), async (req, res) => {
	await updateUser(req.params.id, req.body);
	res.sendStatus(200);
});

userRouter.delete('/:id', async (req, res) => {
	await deleteUser(req.params.id);
	res.sendStatus(200);
});

export { userRouter };
