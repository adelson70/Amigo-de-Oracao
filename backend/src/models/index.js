const sequelize = require('../config/database');

// Importar os modelos
const Nome = require('./Nome');

async function sync() {
    try {
        // Testar a conexão com o DATABASE
        await sequelize.authenticate()
            .then(() => {
                console.log('DATABASE: CONECTADO');
            }
            )
            .catch((error) => {
                console.error('DATABASE: DESCONETADO', error);
            });
        
            // Sincronizar os modelos com o DATABASE
        await sequelize.sync({ force: false })
            .then(() => {
                console.log('DATABASE: MODELOS SINCRONIZADOS');
            })
            .catch((error) => {
                console.error('DATABASE: MODELOS NÃO SINCRONIZADOS', error);
            });

    } catch (error) {
        console.error('DATABASE: ERRO', error);
    }
}

module.exports = {
    sync
};

