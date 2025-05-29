
const { Sequelize } = require('sequelize');

// Configuração do banco de dados SQLite
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './src/database/database.sqlite', // Caminho para o arquivo do banco de dados
    logging: false, // Desabilita logs do Sequelize
});

module.exports = sequelize;

