const { database } = require('../config/pg');
const { DataTypes } = require('sequelize');

const Sorteio = database.define('Sorteio', {
    token: {
        type: DataTypes.STRING,
        allowNull: false
    },
    meu_nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nome_amigo: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'sorteio',
    timestamps: true,
    underscored: true
});

Sorteio.associate = (models) => {
    Sorteio.belongsTo(models.Sala, {
        foreignKey: 'token',
        targetKey: 'token',
        as: 'sala'
    });
};

module.exports = Sorteio;
