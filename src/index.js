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
import serviceLogger from './middleware/logging/service-logger.js';
import unhandledLogger from './middleware/logging/unhandled-logger.js';


const app = express();

app.listen(PORT, () => {
	console.log(`Server for CRUD users service is running on port: ${PORT}`);
});

app
	.use(express.json())
	.use(serviceLogger)
	.use(USER_API, userRouter)
	.use(GROUP_API, groupRouter)
	.use(USER_GROUP_API, userGroupRouter);

process
	.on('unhandledRejection', (reason, p) => {
		unhandledLogger(reason, p);
	})
	.on('uncaughtException', err => {
		unhandledLogger(err);
	});

