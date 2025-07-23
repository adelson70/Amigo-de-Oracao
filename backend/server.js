require('dotenv').config();
const http = require('http');
const { connect } = require('./src/config/pg');
const app = require('./app');
const { initSocket } = require('./src/socket');

require('./src/models');

const PORT = process.env.PORT || 5000;

// Criar servidor HTTP com o app Express
const server = http.createServer(app);

// Inicializar o socket passando o servidor
initSocket(server);

// Iniciar o servidor
server.listen(PORT, () => {
  console.log(`SERVIDOR LIGADO NA PORTA ${PORT}`);
  connect();
});