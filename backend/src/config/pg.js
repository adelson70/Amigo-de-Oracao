require('dotenv').config();
const { Sequelize } = require('sequelize');

const database = new Sequelize(
    process.env.DB_NAME || 'nome_do_banco',
    process.env.DB_USER || 'dev',
    process.env.DB_PASSWORD || 'dev123',
    {
        host: process.env.DB_HOST || '192.168.124.194',
        port: process.env.DB_PORT || 5433,
        dialect: 'postgres',
        logging: false,
        define: {
            timestamps: true,
            underscored: true,
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
    }
);
async function connect() {
    try {
        await database.authenticate();
        console.log('BANCO DE DADOS: CONECTADO COM SUCESSO');
    } catch (error) {
        console.error('BANCO DE DADOS: ERRO AO CONECTAR', error);
    }
}
async function close() {
    try {
        await database.close();
        console.log('BANCO DE DADOS: CONEXÃO FECHADA COM SUCESSO');
    } catch (error) {
        console.error('BANCO DE DADOS: ERRO AO FECHAR CONEXÃO', error);
    }
}

module.exports = {
    database,
    connect,
    close
};