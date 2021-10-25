import express from 'express';
import {
	getAllUsers,
	getDeletedUsers,
	getUser,
	getAutoSuggestUsers,
	addUser,
	updateUser,
	deleteUser
} from "./controllers.js";

const router = express.Router();

router.get('/', (req, res) => {
	res.json(getAllUsers());
});

router.get('/deleted', (req, res) => {
	res.json(getDeletedUsers());
});

router.get('/search', (req, res) => {
	const {loginSubstring, limit} = req.query;
	const foundUsers = getAutoSuggestUsers(loginSubstring, limit);
	
	if (foundUsers === undefined) {
		res
			.status(404)
			.send('No match')
	}
	
	res.send(foundUsers);
});

router.get('/:id', (req, res) => {
	const user = getUser(req.params.id);
	
	if (user === undefined) {
		res
			.status(404)
			.json({message: `User with id ${req.params.id} not found`});
	} else {
		res.json(user);
	}
});

router.post('/', (req, res) => {
	addUser(req.body);
	
	res.sendStatus(200);
});

router.put('/:id', (req, res) => {
	const user = updateUser(req.params.id, req.body);
	
	if (user === undefined) {
		res
			.status(404)
			.send(`User ${req.params.id} not found`);
	} else {
		res.json(user);
	}
});

router.delete('/:id', (req, res) => {
	const user = deleteUser(req.params.id);
	
	if (user === undefined) {
		res
			.status(404)
			.send(`User ${req.params.id} not found`);
	} else {
		res.send(`User ${req.params.id} was deleted`);
	}
});

export { router };
