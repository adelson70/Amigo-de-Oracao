const { database } = require('../config/pg');
const { DataTypes } = require('sequelize');


const Usuario = database.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
}, {
    tableName: 'usuario',
    timestamps: true,
    underscored: true
});

Usuario.associate = (models) => {
    Usuario.hasMany(models.Sala, {
        foreignKey: 'user_id',
        as: 'salas'
    });
};

module.exports = Usuario;
