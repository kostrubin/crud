import sequelize from '../db-access/db.js';
import pkg from 'sequelize';
const { DataTypes } = pkg;

const User = sequelize.define('User', {
	login: {
		type: DataTypes.STRING
	},
	password: {
		type: DataTypes.STRING
	},
	age: {
		type: DataTypes.INTEGER
	},
	isDeleted: {
		type: DataTypes.BOOLEAN
	}
});

await User.sync();

export default User;
