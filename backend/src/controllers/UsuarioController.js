require('dotenv').config();
const token = require('../utils/token');
const UsuarioService = require('../services/UsuarioService');

const UsuarioController = {
  login: async (req, res) => {
    try {
      const { nome, senha } = req.body;
      
      const usuario = await UsuarioService.login(nome, senha);

      if (!usuario) {
        return res.status(401).json({ error: 'credenciais_invalidas' });
      }

      const accessToken = token.generateAccessToken(usuario);
      const refreshToken = token.generateRefreshToken(usuario);
      token.setAccessTokenCookie(res, accessToken);
      token.setRefreshTokenCookie(res, refreshToken);

      return res.status(200).json({
        message: 'Login successful',
        accessToken,
        refreshToken,
        usuario: {
          id: usuario.id,
          nome: usuario.nome
        }
      });

    } catch (error) {
      res.status(500).json({ error: 'Login failed' });
    }
  },

  logout: async (req, res) => {
    try {
      // Implement logout logic here
      res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
      res.status(500).json({ error: 'Logout failed' });
    }
  },

  register: async (req, res) => {
    try {
      // Implement registration logic here
      res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
      res.status(500).json({ error: 'Registration failed' });
    }
  },

  me: async (req, res) => {
    try {
      // Implement user retrieval logic here
      res.status(200).json({ message: 'User data retrieved successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve user data' });
    }
  }
  
};

module.exports = UsuarioController;