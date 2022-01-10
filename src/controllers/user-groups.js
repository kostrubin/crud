import express from 'express';
import { addUsersToGroup } from '../services/user-groups.js';
import errorLogger from '../middleware/logging/error-logger.js';

const userGroupRouter = express.Router();

userGroupRouter.post('/', async (req, res) => {
	try {
		const { groupId, userIds } = req.body;

		if (!groupId || !userIds || !userIds.length) {
			errorLogger('Wrong parameters', req);
			res.sendStatus(404);
		} else {
			await addUsersToGroup(groupId, userIds);
			res.sendStatus(200);
		}
	} catch (err) {
		errorLogger(err, req);
		throw new Error(err);
	}
});

export { userGroupRouter };
