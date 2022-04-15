import Sequelize from "sequelize";
import instanciar from '../database.js';

const columns = {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    conteúdo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    
}

const options = {
    freezeTableName: true,
    tableName:  'posts',
    timeStamps: true,
    criatedAt: 'criadoEm',
    updatedAt: 'atualizadoEm',
    version: 'versao'

}

const Posts = instanciar.define('posts', columns, options);

Posts.sync({alter: true}).then((response) => console.log(`A schema Usuários foi criada com sucesso! - ${response}`)).catch((err)=>{console.log(`${err.message} -- Ocorreu um error ao criar o usuário`)})

export default Posts;