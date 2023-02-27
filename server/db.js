import { Sequelize } from 'sequelize';
// подключение к бд
import dotenv from 'dotenv';

const env = dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
});

export default sequelize;