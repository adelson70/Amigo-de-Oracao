require('dotenv').config();
const token = require('../utils/token');
const UsuarioService = require('../services/UsuarioService');
const bcrypt = require('bcrypt');

const UsuarioController = {
  login: async (req, res) => {
    try {
      const { email, senha } = req.body;

      const usuario = await UsuarioService.login(email, senha);

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
          nome: usuario.nome,
          email: usuario.email
        }
      });

    } catch (error) {
      res.status(500).json({ error: 'Login failed' });
    }
  },

  logout: async (req, res) => {
    try {
      token.clearRefreshTokenCookie(res);
      token.clearAccessTokenCookie(res);
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
      res.status(200).json({ message: 'success' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve user data' });
    }
  },

  info: async (req, res) => {
    try {
      const { id } = req.user
      const usuario = await UsuarioService.getById(id);
      if (!usuario) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json({
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email
        
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve user info' });
    }
  },

  update: async (req, res) => {
    try {
      const { senha } = req.body;
      const { id } = req.user;

      const dataUpdate = { id };

      if (typeof senha === 'string' && senha.trim().length > 0) {
        dataUpdate.senha = await bcrypt.hash(senha, 10)
      }

      const response = await UsuarioService.update(dataUpdate);

      res.status(200).json({ message: response.message });
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Failed to update user' });
    }
  },

  esqueciMinhaSenha: async (req, res) => {
    try {
      const { email } = req.body;

      const response = await UsuarioService.esqueciMinhaSenha(email);

      res.status(200).json({ message: response.message, status: response.status || 200 });
    } catch (error) {
      res.status(500).json({ error: 'Failed to send password reset link' });
    }
  },

  redefinirSenha: async (req, res) => {
    try {
      const { token } = req.params;
      const { senha } = req.body;

      if (!token) {
        return res.status(400).json({ error: 'Token are required' });
      }

      const response = await UsuarioService.redefinirSenha(token, senha);

      if (response.error) {
        return res.status(400).json({ error: response.error });
      }

      res.status(200).json({ message: response.message, status: response.status || 200});
    } catch (error) {
      res.status(500).json({ error: 'Failed to reset password' });
    }
  },

  verificarTokenEsqueciMinhaSenha: async (req, res) => {
    try {
      const { token } = req.params;

      if (!token) {
        return res.status(400).json({ error: 'Token is required' });
      }

      const isValid = await UsuarioService.verificarTokenEsqueciMinhaSenha(token);

      if (!isValid) {
        return res.status(400).json({ error: 'Invalid or expired token' });
      }

      res.status(200).json({ message: 'Token_is_valid' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to verify token' });
    }
  }
  
};

module.exports = UsuarioController;