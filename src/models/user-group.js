import sequelize from '../db-access/db.js';
import pkg from 'sequelize';
const { DataTypes } = pkg;
import User from './user.js';
import Group from './group.js';

const UserGroup = sequelize.define('UserGroup', {
	GroupId: {
		type: DataTypes.INTEGER,
		references: {
			model: Group,
			key: 'id'
		}
	},
	UserId: {
		type: DataTypes.INTEGER,
		references: {
			model: User,
			key: 'id'
		}
	}
});

User.belongsToMany(Group, { through: UserGroup });
Group.belongsToMany(User, { through: UserGroup });

await UserGroup.sync();

export default UserGroup;
