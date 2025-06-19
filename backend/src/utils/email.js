const nodemailer = require('nodemailer');
const crypto = require('crypto');
const RecuperacaoSenha = require('../models/RecuperacaoSenha');
const ms = require('ms');
require('dotenv').config();


const recovery = {
    token_expires_in: process.env.TOKEN_RECOVERY_PASSWORD_EXPIRES_IN || '1h',
    from: process.env.EMAIL_USER || '',
    pass: process.env.EMAIL_PASSWORD || '',
    fromName: process.env.EMAIL_FROM_NAME || 'Recuperação de Senha',
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: recovery.from,
        pass: recovery.pass
    }
});

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

        // garantir que o token n venha como [object obeject]
        const tokenString = JSON.stringify(token);
        const tokenObj = JSON.parse(tokenString);

        const resetLink = `${process.env.FRONTEND_URL}/recuperar-senha/${tokenObj.token || tokenObj}`;

        const mailOptions = {
            from: `"${recovery.fromName}" <${recovery.from}>`,
            to: email,
            subject: 'Recuperação de Senha',
            html: `
            <div style="max-width: 480px; margin: 40px auto; padding: 32px 24px; border-radius: 12px; background: #f9f9f9; box-shadow: 0 2px 12px rgba(0,0,0,0.07); font-family: Arial, sans-serif; text-align: center;">
                <h1 style="color: #2d7ff9; margin-bottom: 16px;">Recuperação de Senha</h1>
                <p style="font-size: 16px; color: #333; margin-bottom: 24px;">
                Você solicitou a recuperação de senha.<br>
                Clique no botão abaixo para redefinir sua senha:
                </p>
                <a href="${resetLink}" style="display: inline-block; padding: 12px 32px; background: #2d7ff9; color: #fff; border-radius: 6px; text-decoration: none; font-size: 16px; font-weight: bold; margin-bottom: 24px;">
                Redefinir Senha
                </a>
                <p style="font-size: 14px; color: #888; margin-top: 24px;">
                O link é válido por <b>${recovery.token_expires_in}</b>.
                </p>
            </div>
            `
        };

        await transporter.sendMail(mailOptions);

        return true
    
   } catch (error) {
        console.error('Erro ao enviar e-mail:', error);
        return false;
    }
}


module.exports = { sendEmail };