let io;

const initSocket = (server) => {
  io = require('socket.io')(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });
  
  console.log('SOCKET: INICIALIZADO');

  io.on('connection', (socket) => {
    console.log('SOCKET: CLIENTE CONECTADO', socket.id);

    socket.on('disconnect', (reason) => {
      console.log('SOCKET: CLIENTE DESCONECTADO', socket.id, 'Motivo:', reason);
    });

    // Exemplo de evento personalizado
    socket.on('mensagem', (data) => {
      console.log('Mensagem recebida:', data);
      io.emit('resposta', {message: 'pong'});
    });

  });
};

const getIO = () => {
  if (!io) {
    throw new Error('Socket.io não foi inicializado!');
  }
  return io;
};

module.exports = { initSocket, getIO };