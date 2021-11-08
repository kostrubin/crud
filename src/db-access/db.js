import { Sequelize } from 'sequelize';
import { DB_PORT } from '../config/config.js';

const sequelize = new Sequelize('postgres', 'admin', 'admin', {
	host: 'localhost',
	port: DB_PORT,
	dialect: 'postgres'
});

export default sequelize;
