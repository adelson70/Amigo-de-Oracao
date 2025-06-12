const jwt = require('jsonwebtoken');
require('dotenv').config();

let io;

const initSocket = (server) => {
  io = require('socket.io')(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
      // credentials: true,
    },
  });

  // io.use((socket, next) => {
  //   const token = socket.handshake.auth?.token;

  //   console.log('SOCKET: Tentativa de conexão com token:', token);
  //   console.log('SOCKET: Headers:', socket.handshake);
    
  //   if (!token) {
  //     console.log('SOCKET: Token não fornecido');
  //     return next(new Error('Token não fornecido'));
  //   }

  //   try {
  //     const user = jwt.verify(token, process.env.JWT_SECRET);
  //     console.log('SOCKET: Token verificado com sucesso', user);
  //     socket.user = user;
  //     next();

  //   } catch (error) {
  //     console.error('SOCKET: Erro ao verificar token:', error);
  //     return next(new Error('Token inválido'));
  //   }

  //   console.log('SOCKET: Middleware de conexão');
  //   next();
  // });
  
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