const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const { sendEmail } = require('../utils/email');
const RecuperacaoSenha = require('../models/RecuperacaoSenha');
require('dotenv').config();

const messages = {
  email_atualizado: 'Nome atualizado com sucesso',
  senha_atualizada: 'Senha atualizada com sucesso',
  sem_campos_para_atualizar: 'Sem campos para atualizar',
  email_e_senha_atualizados: 'Nome e senha atualizados com sucesso',
}

const UsuarioService = {
  async login(emailLogin, senhaLogin) {
    try {
        // Verifica se o usuário existe
        const usuario = await Usuario.findOne({ where: { email: emailLogin }, raw: true });

        if (!usuario) return null;

        const { id, nome, senha, email } = usuario || {};

        // Verifica a senha
        const senhaCorreta = await bcrypt.compare(senhaLogin, senha);
        
        if (!senhaCorreta) return null;

       return {id, nome, email}
        
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

      const { id, nome, email } = usuario;

      return { id, nome, email };
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
  },

  async esqueciMinhaSenha(email) {
    try {
      // Verifica se o usuário existe
      const usuario = await Usuario.findOne({ where: { email }, raw: true });

      if (!usuario) return { message: 'Usuário não encontrado' };

      const reponse = await sendEmail(usuario)      

      if (!reponse) {
        return { message: 'Erro ao enviar e-mail de redefinição de senha.', status:'error' };
      }

      return { message: 'Instruções para redefinir a senha foram enviadas para o seu e-mail.', status: 'success' };
    } catch (error) {
      console.error('Error during esqueciMinhaSenha:', error);
      throw error;
    }
  },

  async redefinirSenha(token, novaSenha) {
    try {
      // Verifica se o token é válido
      const tokenValido = await RecuperacaoSenha.isValidToken(token);

      if (!tokenValido) return { message: 'Token inválido ou expirado.', status: 400 };

      if (!novaSenha || novaSenha.trim().length === 0) {
        return true
      }

      // Atualiza a senha do usuário
      const hashedPassword = await bcrypt.hash(novaSenha, 10);
      await Usuario.update({ senha: hashedPassword }, { where: { id: tokenValido.user_id } });

      return { message: 'Senha redefinida com sucesso.' };
    } catch (error) {
      console.error('Error during redefinirSenha:', error);
      throw error;
    }
  }

}

module.exports = UsuarioService;

