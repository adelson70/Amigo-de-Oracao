const { DataTypes, Op } = require('sequelize');
const { database } = require('../config/pg');
const Usuario = require('./Usuario');

const RecuperacaoSenha = database.define('recuperacao_senha', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'usuario', // nome da tabela no banco, ajuste se necessário
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    token: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    expires_at: {
        type: DataTypes.DATE,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'recuperacao_senha',
    timestamps: false
});

// Relacionamento
RecuperacaoSenha.belongsTo(Usuario, { foreignKey: 'user_id', as: 'usuario' });

// Metodos
RecuperacaoSenha.findOrCreateToken = async function (data) {
    const timeNow = new Date();
    const lastToken = await RecuperacaoSenha.findOne({
        where: {
            user_id: data.user_id
        },
        attributes: ['expires_at', 'created_at', 'token'],
        order: [['created_at', 'DESC']],
        limit: 1,
        raw: true
    });
    // Se não houver token ou se o token expirou, cria um novo
    if (!lastToken || lastToken.expires_at <= timeNow) {
        await RecuperacaoSenha.create(data);
        console.log('Novo token criado');
        return data;
    }
    // Se o token ainda é válido, retorna o token existente
    if (lastToken && lastToken.expires_at > timeNow) {
        console.log('Já possui um token válido enviando');
        return lastToken.token;
    }
}

// Método para verificar se o token é válido
RecuperacaoSenha.isValidToken = async function (token) {
    const timeNow = new Date();
    const recovery = await RecuperacaoSenha.findOne({
        where: {
            token,
            expires_at: {
                [Op.gt]: timeNow
            }
        },
        raw: true
    });
    if (!recovery) {
        console.log('Token inválido ou expirado');
        return false;
    }
    return recovery
}

module.exports = RecuperacaoSenha;
