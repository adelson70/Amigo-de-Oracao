const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const token = require('../utils/token');


const router = express.Router();

router.post('/', (req, res) => {
    const { refresh_token } = req.cookies;

    if (!refresh_token) {
        return res.status(401).json({ error: 'Não possui refresh token' });
    }

    jwt.verify(refresh_token, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Token inválido' });
        }

        const usuario = decoded.usuario
        
        // Extraia o userId do payload decodificado
        if (!usuario) {
            return res.status(400).json({ error: 'Payload do token inválido' });
        }

        // Use as funções utilitárias para gerar e definir os tokens
        const accessToken = token.generateAccessToken(usuario);
        const newRefreshToken = token.generateRefreshToken(usuario);

        token.setAccessTokenCookie(res, accessToken);
        token.setRefreshTokenCookie(res, newRefreshToken);

        return res.json({ accessToken });
    });
});

module.exports = router;