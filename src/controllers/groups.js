import express from 'express';
import errorLogger from '../middleware/logging/error-logger.js';
import {
	getAllGroups,
	getGroup,
	addGroup,
	updateGroup,
	deleteGroup
} from '../services/groups.js';

const groupRouter = express.Router();

groupRouter.get('/', async (req, res) => {
	try {
		const groups = await getAllGroups();
		res.json(groups);
	} catch (err) {
		errorLogger(err, req);
		res.sendStatus(400);
	}
});

groupRouter.get('/:id', async (req, res) => {
	try {
		const group = await getGroup(req.params.id);

		if (!group) {
			errorLogger('Not found', req);
			res.sendStatus(404);
		} else {
			res.json(group);
		}
	} catch (err) {
		errorLogger(err, req);
		res.sendStatus(400);
	}
});

groupRouter.post('/', async (req, res) => {
	try {
		const group = await addGroup(req.body);
		res.json(group);
	} catch (err) {
		errorLogger(err, req);
		res.sendStatus(400);
	}
});

groupRouter.put('/:id', async (req, res) => {
	try {
		await updateGroup(req.params.id, req.body);
		res.sendStatus(200);
	} catch (err) {
		errorLogger(err, req);
		res.sendStatus(400);
	}
});

groupRouter.delete('/:id', async (req, res) => {
	try {
		await deleteGroup(req.params.id);
		res.sendStatus(200);
	} catch (err) {
		errorLogger(err, req);
		res.sendStatus(400);
	}
});

export { groupRouter };
