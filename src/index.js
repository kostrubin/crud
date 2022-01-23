import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { authRouter } from './controllers/auth.js';
import { userRouter } from './controllers/users.js';
import { groupRouter } from './controllers/groups.js';
import { userGroupRouter } from './controllers/user-groups.js';
import {
	AUTH,
	USER_API,
	GROUP_API,
	USER_GROUP_API
} from './api/api.js';
import serviceLogger from './middleware/logging/service-logger.js';
import unhandledLogger from './middleware/logging/unhandled-logger.js';
import checkToken from './middleware/auth/auth.js';

export const app = express();

app.listen(process.env.PORT, () => {
	console.log(`Server for CRUD users service is running on port: ${process.env.PORT}`);
});

app
	.use(express.json())
	.use(serviceLogger)
	.use(cors())
	.use(AUTH, authRouter)
	.use(checkToken)
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

