import express from 'express';
import { router } from './routes.js';

const PORT = process.env.port || 3000;
const app = express();

app.listen(PORT, () => {
	console.log(`Server for CRUD users service is running on port: ${PORT}`);
});

app.use(express.json());
app.use('/users', router);
