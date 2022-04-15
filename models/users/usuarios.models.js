import Sequelize from "sequelize";
import instanciar from '../database.js';

const columns = {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    }
    ,
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
}

const options = {
    freezeTableName: true,
    tableName: 'users',
    timeStamps: true,
    createdAt: 'criadoEm',
    updatedAt: 'atualizadoEm',
    version: 'versao'

}


const Usuarios = instanciar.define('users', columns, options);

Usuarios.sync({alter: true})
        .then((response) => console.log(`A schema Usuários foi criada com sucesso! - ${response}`))
        .catch((err)=>{console.log(`${err.message} /${err.code}//${err} -- Ocorreu um error ao criar o usuário`)})

export default Usuarios;