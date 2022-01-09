import Group from '../models/group.js';

const getAllGroups = async () => {
	const result = await Group.findAll();

	return result.map(it => it.dataValues);
};

const getGroup = async groupId => await Group.findOne({
	where: { id: groupId }
});

const addGroup = async groupData => Group.create({ ...groupData });

const updateGroup = async (id, groupData) => {
	try {
		await Group.update(
			{ ...groupData },
			{ where: { id } }
		);
	} catch (err) {
		throw new Error(err);
	}
};

const deleteGroup = async groupId => {
	try {
		await Group.destroy({
			force: true,
			where: { id: groupId }
		});
	} catch (err) {
		throw new Error(err);
	}
};

export {
	getAllGroups,
	getGroup,
	addGroup,
	updateGroup,
	deleteGroup
};
