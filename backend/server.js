require('dotenv').config();
const http = require('http');
const { connect } = require('./src/config/pg');
const app = require('./app');
const { initSocket } = require('./src/socket');
const { BucketService } = require('./src/services/BucketService');
const { initRedis } = require('./src/redis')

require('./src/models');

const PORT = process.env.PORT || 5000;

// Criar servidor HTTP com o app Express
const server = http.createServer(app);

// Inicializar o socket passando o servidor
initSocket(server);

// Inicializar o Redis
// initRedis()

// Verificar o status do bucket ao iniciar o servidor
// BucketService.status()

// Iniciar o servidor
server.listen(PORT, () => {
  console.log(`SERVIDOR LIGADO NA PORTA ${PORT}`);
  connect();
});