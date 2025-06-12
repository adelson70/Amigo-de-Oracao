const jwt = require('jsonwebtoken');
const { verifyTokenParticipante } = require('../utils/token');
require('dotenv').config();

const AuthParticipanteMiddleware = (req, res, next) => {
    const tokenParticipante = req.cookies && req.cookies.token_participante;

    if (!tokenParticipante) {
        console.log('Middleware: Token de participante não fornecido');
        return res.status(401).json({ error: 'Token de participante não fornecido' });
    }

    try {
        const decoded = verifyTokenParticipante(tokenParticipante);
        req.participante = decoded.participante
        return next(); 
    } catch (error) {
        console.error('Middleware: Erro ao verificar token de participante:', error);
        return res.status(401).json({ error: 'Token de participante inválido' });
    }
}

module.exports = AuthParticipanteMiddleware;