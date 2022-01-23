import Group from '../models/group.js';

const getAllGroups = async () => {
	const result = await Group.findAll();

	return result.map(it => it.dataValues);
};

const getGroup = async groupId => await Group.findOne({
	where: { id: groupId }
});

const addGroup = async groupData => {
	return Group.create({ ...groupData });
};

const updateGroup = async (id, groupData) => {
	await Group.update(
		{ ...groupData },
		{ where: { id } }
	);
};

const deleteGroup = async groupId => {
	await Group.destroy({
		force: true,
		where: { id: groupId }
	});
};

export {
	getAllGroups,
	getGroup,
	addGroup,
	updateGroup,
	deleteGroup
};
