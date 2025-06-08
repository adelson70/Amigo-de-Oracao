const { database } = require('../config/pg');
const { DataTypes } = require('sequelize');

const Sala = database.define('Sala', {
    token: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    limite: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'aberta'
    }
}, {
    tableName: 'sala',
    timestamps: true,
    underscored: true
});

Sala.associate = (models) => {
    Sala.belongsTo(models.Usuario, {
        foreignKey: 'user_id',
        as: 'usuario'
    });

    Sala.hasMany(models.Participante, {
        foreignKey: 'token',
        sourceKey: 'token',
        as: 'participantes'
    });

    Sala.hasMany(models.Sorteio, {
        foreignKey: 'token',
        sourceKey: 'token',
        as: 'sorteios'
    });
};

module.exports = Sala;
