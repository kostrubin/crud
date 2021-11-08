import User from '../models/user.js';
import { users } from '../mock/users.js';

const getAllUsers = () => User.findAll({
	where: { isDeleted: false }
}).then(result => result);

const getDeletedUsers = () => User.findAll({
	where: { isDeleted: true }
}).then(result => console.log(JSON.stringify(result)));

const getUser = userId => users.find(user => userId === user.id);

const addUser = userData => User.create({
	...userData,
	isDeleted: false
});

const updateUser = (id, userData) => {
	const index = users.findIndex(user => user.id === id);

	if (index === -1) {
		return undefined;
	}

	for (const key in userData) {
		if (userData.hasOwnProperty(key)) {
			users[index][key] = userData[key];
		}
	}

	return users[index];
};

const getAutoSuggestUsers = (loginSubstring, limit) => {
	const matchedUsers = users.filter(user => user.login.includes(loginSubstring));

	if (!matchedUsers.length) {
		return undefined;
	}
	return matchedUsers
		.sort((a, b) => a.login > b.login ? 1 : -1)
		.splice(0, limit);
};

const deleteUser = userId => {
	const index = users.findIndex(user => user.id === userId);

	if (index < 0) {
		return undefined;
	}
	return users[index].isDeleted = true;
};

export {
	getAllUsers,
	getDeletedUsers,
	getUser,
	addUser,
	updateUser,
	getAutoSuggestUsers,
	deleteUser
};
