import sequelize from '../db-access/db.js';
import pkg from 'sequelize';
const { DataTypes } = pkg;

const Group = sequelize.define('Group', {
	name: {
		type: DataTypes.STRING
	},
	permissions: {
		type: DataTypes.ARRAY(DataTypes.STRING)
	}
});

await Group.sync();

export default Group;
