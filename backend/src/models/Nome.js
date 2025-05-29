const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Definir o modelo de Faixa
const Nome = sequelize.define('Nome', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    timestamps: true, // Adiciona createdAt e updatedAt
});

module.exports = Nome;

