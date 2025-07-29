require('dotenv').config();
const { Sequelize } = require('sequelize');

const database = new Sequelize(
    process.env.DATABASE_URL || 'nome_do_banco',
    {
        dialect: 'postgres',
        protocol: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
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
    } catch (error) {
        console.error('BANCO DE DADOS: ERRO AO FECHAR CONEXÃO', error);
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