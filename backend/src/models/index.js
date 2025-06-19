const { database } = require('../config/pg');

// Importar os modelos
const Usuario = require('./Usuario');
const Sala = require('./Sala');
const Sorteio = require('./Sorteio');
const Participante = require('./Participante');
const RecuperacaoSenha = require('./RecuperacaoSenha');

// Objeto que contém todos os modelos
const models = {
    Usuario,
    Sala,
    Sorteio,
    Participante,
    RecuperacaoSenha
};

// Aplicar associações se existirem
Object.values(models)
    .filter(model => typeof model.associate === 'function')
    .forEach(model => {
        model.associate(models);
    });

// Sincronizar o banco
database.sync({ alter: true })
    .then(() => {
        console.log('BANCO DE DADOS: TABELAS SINCRONIZADAS COM SUCESSO');
    })
    .catch((error) => {
        console.error('BANCO DE DADOS: ERRO AO SINCRONIZAR AS TABELAS', error);
    });

// Exportar os modelos e a conexão
module.exports = {
    ...models,
};
