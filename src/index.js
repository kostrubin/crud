import express from 'express';
import { userRouter } from './controllers/users.js';
import { groupRouter } from './controllers/groups.js';
import { userGroupRouter } from './controllers/user-groups.js';
import {
	PORT,
	USER_API,
	GROUP_API,
	USER_GROUP_API
} from './config/config.js';

const app = express();

app.listen(PORT, () => {
	console.log(`Server for CRUD users service is running on port: ${PORT}`);
});

app.use(express.json());
app.use(USER_API, userRouter);
app.use(GROUP_API, groupRouter);
app.use(USER_GROUP_API, userGroupRouter);
