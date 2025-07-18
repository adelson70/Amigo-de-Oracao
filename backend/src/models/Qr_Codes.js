const { database } = require('../config/pg');
const { DataTypes } = require('sequelize');

const QrCodes = database.define('QrCodes', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dados: {
        type: DataTypes.BLOB,
        allowNull: false
    }
}, {
    tableName: 'qrcodes',
    timestamps: true,
    underscored: true
});

module.exports = QrCodes;
