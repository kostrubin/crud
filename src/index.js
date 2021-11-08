import express from 'express';
import { router } from './controllers/users.js';
import { PORT, API } from './config/config.js';

const app = express();

app.listen(PORT, () => {
	console.log(`Server for CRUD users service is running on port: ${PORT}`);
});

app.use(express.json());
app.use(API, router);
