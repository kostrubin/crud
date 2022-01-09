import sequelize from '../db-access/db.js';
import UserGroup from '../models/user-group.js';
import Group from '../models/group.js';

const addUsersToGroup = async (groupId, userIds) => {
	const transaction = await sequelize.transaction();
	try {
		const group = await Group.findOne({
			where: { id: groupId }
		});
		for (const user of userIds) {
			await UserGroup.create({
				GroupId: group.id,
				UserId: user
			});
		}
		await transaction.commit();
	} catch (err) {
		await transaction.rollback();
		throw new Error(err);
	}
};

export { addUsersToGroup };
