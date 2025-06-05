const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
require('dotenv').config();

const UsuarioService = {
  async login(nomeLogin, senhaLogin) {
    try {
        // Verifica se o usuário existe
        const usuario = await Usuario.findOne({ where: { nome: nomeLogin }, raw: true });

        
        if (!usuario) return null;

        const { id, nome, senha } = usuario || {};

        // Verifica a senha
        const senhaCorreta = await bcrypt.compare(senhaLogin, senha);
        
        if (!senhaCorreta) {
            throw new Error('Senha incorreta');
        }

       return {id, nome}
        
    }
    catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  }

}

module.exports = UsuarioService;

