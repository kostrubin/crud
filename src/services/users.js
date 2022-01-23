import User from '../models/user.js';
import pkg from 'sequelize';
const { Op } = pkg;


const getAllUsers = async () => {
	const result = await User.findAll({
		where: { isDeleted: false }
	});

	return result.map(it => it.dataValues);
};

const getDeletedUsers = async () => {
	const result = await User.findAll({
		where: { isDeleted: true }
	});

	return result.map(it => it.dataValues);
};

const getUser = async userId => await User.findOne({
	where: { id: userId }
});

const addUser = async userData => User.create({
	...userData,
	isDeleted: false
});

const updateUser = async (id, userData) => {
	await User.update(
		{ ...userData },
		{ where: { id } }
	);
};

const getAutoSuggestUsers = async (loginSubstring, limit) => {
	return await User.findAll({
		where: {
			login: {
				[Op.like]: `%${loginSubstring}%`
			}
		},
		limit
	});
};

const deleteUser = async userId => {
	await User.update(
		{ isDeleted: true },
		{ where: { id: userId } }
	);
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
