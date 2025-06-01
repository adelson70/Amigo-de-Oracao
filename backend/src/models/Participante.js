const { database } = require('../config/pg');
const { DataTypes } = require('sequelize');

const Participante = database.define('Participante', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'participante',
    timestamps: true,
    underscored: true
});

Participante.associate = (models) => {
    Participante.belongsTo(models.Sala, {
        foreignKey: 'token',
        targetKey: 'token',
        as: 'sala'
    });
};

module.exports = Participante;
