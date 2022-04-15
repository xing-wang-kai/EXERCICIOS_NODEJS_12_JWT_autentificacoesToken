import Sequelize from 'sequelize';
import 'dotenv/config';

const instanciar = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT
    }
)

export default instanciar;