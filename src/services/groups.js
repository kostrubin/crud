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
	if (!await getGroup(id)) {
		return null;
	}

	await Group.update(
		{ ...groupData },
		{ where: { id } }
	);
};

const deleteGroup = async groupId => {
	if (!await getGroup(groupId)) {
		return null;
	}

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
