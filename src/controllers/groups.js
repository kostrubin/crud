import express from 'express';
import {
	getAllGroups,
	getGroup,
	addGroup,
	updateGroup,
	deleteGroup
} from '../services/groups.js';

const groupRouter = express.Router();

groupRouter.get('/', async (req, res) => {
	const users = await getAllGroups();

	return res.json(users);
});

groupRouter.get('/:id', async (req, res) => {
	const user = await getGroup(req.params.id);

	if (user === undefined) {
		res
			.status(404)
			.json({ message: `User with id ${req.params.id} not found` });
	} else {
		res.json(user);
	}
});

groupRouter.post('/', async (req, res) => {
	await addGroup(req.body);
	res.sendStatus(200);
});

groupRouter.put('/:id', async (req, res) => {
	await updateGroup(req.params.id, req.body);
	res.sendStatus(200);
});

groupRouter.delete('/:id', async (req, res) => {
	await deleteGroup(req.params.id);
	res.sendStatus(200);
});

export { groupRouter };
