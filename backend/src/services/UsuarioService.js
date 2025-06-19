const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
require('dotenv').config();

const messages = {
  nome_atualizado: 'Nome atualizado com sucesso',
  senha_atualizada: 'Senha atualizada com sucesso',
  sem_campos_para_atualizar: 'Sem campos para atualizar',
  nome_e_senha_atualizados: 'Nome e senha atualizados com sucesso',
}

const UsuarioService = {
  async login(nomeLogin, senhaLogin) {
    try {
        // Verifica se o usuário existe
        const usuario = await Usuario.findOne({ where: { nome: nomeLogin }, raw: true });

        
        if (!usuario) return null;

        const { id, nome, senha } = usuario || {};

        // Verifica a senha
        const senhaCorreta = await bcrypt.compare(senhaLogin, senha);
        
        if (!senhaCorreta) return null;

       return {id, nome}
        
    }
    catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  },

  async getById(usuarioId) {
    try {
      // Busca o usuário pelo ID
      const usuario = await Usuario.findOne({ where: { id: usuarioId }, raw: true });

      if (!usuario) return null;

      const { id, nome } = usuario;

      return { id, nome };
    } catch (error) {
      console.error('Error during getById:', error);
      throw error;
    }
  },

  async update(data) {
    try {
      const { id } = data;
      let message

      // Verifica se o usuário existe
      const usuario = await Usuario.findOne({ where: { id }, raw: true });

      if (!usuario) return null;

      // Atualiza os dados do usuário
      const updateFields = {};
      if ('senha' in data) {
        updateFields.senha = data.senha
        message = messages.senha_atualizada;
      };

      if (!Object.keys(updateFields).length) return { message: messages.sem_campos_para_atualizar };

      await Usuario.update(updateFields, { where: { id } });

      return {message}
    } catch (error) {
      console.error('Error during update:', error);
      throw error;
    }
  }

}

module.exports = UsuarioService;

