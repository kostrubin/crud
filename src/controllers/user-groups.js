import express from 'express';
import { addUsersToGroup } from '../services/user-groups.js';

const userGroupRouter = express.Router();

userGroupRouter.post('/', async (req, res) => {
	if (!req.body.groupId || !req.body.userIds || !req.body.userIds.length) {
		res
			.status(404)
			.json({ message: 'Invalid parameters. Integer groupId and userIds array are expected' });
	}
	await addUsersToGroup(req.body.groupId, req.body.userIds);
	res.sendStatus(200);
});

export { userGroupRouter };
