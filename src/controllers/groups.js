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
		throw new Error(err);
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
		throw new Error(err);
	}
});

groupRouter.post('/', async (req, res) => {
	try {
		await addGroup(req.body);
		res.sendStatus(200);
	} catch (err) {
		errorLogger(err, req);
		throw new Error(err);
	}
});

groupRouter.put('/:id', async (req, res) => {
	try {
		const group = await updateGroup(req.params.id, req.body);

		if (!group) {
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

groupRouter.delete('/:id', async (req, res) => {
	try {
		const group = 		await deleteGroup(req.params.id);

		if (!group) {
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

export { groupRouter };
