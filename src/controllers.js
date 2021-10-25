import { v1 as uuidv1 } from 'uuid';
import { users } from './users.js';

const getAllUsers = () => users.filter(user => !user.isDeleted);

const getDeletedUsers = () => users.filter(user => user.isDeleted);

const getUser = userId => users.find(user => userId == user.id);

const addUser = userData => users.push({
	...userData,
	id: uuidv1(),
	isDeleted: false
});

const updateUser = (id, userData) => {
	const index = users.findIndex(user => user.id == id);
	
	if (index === -1) {
		return undefined;
	}
	
	for (let key in userData) {
		users[index][key] = userData[key];
	}
	
	return users[index];
};

const getAutoSuggestUsers = (loginSubstring, limit) => {
	const matchedUsers = users.filter(user => user.login.includes(loginSubstring));
	
	if (!matchedUsers.length) {
		return undefined;
	} else {
		return matchedUsers
			.sort((a, b) => a.login > b.login ? 1 : -1)
			.splice(0, limit);
	}
};

const deleteUser = userId => {
	const index = users.findIndex(user => user.id == userId);
	
	if (index < 0) {
		return undefined;
	} else {
		return users[index].isDeleted = true;
	}
};

export {
	getAllUsers,
	getDeletedUsers,
	getUser,
	addUser,
	updateUser,
	getAutoSuggestUsers,
	deleteUser
}
