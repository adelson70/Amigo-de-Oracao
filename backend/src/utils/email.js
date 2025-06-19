const nodemailer = require('nodemailer');
const crypto = require('crypto');
const RecuperacaoSenha = require('../models/RecuperacaoSenha');
const ms = require('ms');
require('dotenv').config();


const recovery = {
    token_expires_in: process.env.TOKEN_RECOVERY_PASSWORD_EXPIRES_IN || '1h',
    from: process.env.EMAIL_FROM || '',
    host: process.env.EMAIL_HOST || '',
    port: process.env.EMAIL_PORT || 587,
    user: process.env.EMAIL_USER || '',
    pass: process.env.EMAIL_PASSWORD || ''
}

const sendEmail = async (usuario) => {
    try {
        const tokenRecovery = crypto.randomBytes(32).toString('hex');
        const expiresAt = new Date(Date.now() + ms(recovery.token_expires_in));
        const { id: userId, email } = usuario;

        const data = {
            user_id: Number(userId),
            token: tokenRecovery,
            expires_at: expiresAt
        };

        const token = await RecuperacaoSenha.findOrCreateToken(data);
        
        if (!token) {
            console.error('Erro ao criar token de recuperação');
            return false;
        }

        const resetLink = `${process.env.FRONTEND_URL}/recuperar-senha/${token}`;

        console.log('Link de recuperação:', resetLink);



        return true
    
   } catch (error) {
        console.error('Erro ao enviar e-mail:', error);
        return false;
    }
}


module.exports = { sendEmail };