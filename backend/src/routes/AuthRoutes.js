const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const token = require('../utils/token');


const router = express.Router();

// Middleware to check if the user is authenticated
router.post('/', (req, res) => {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
        return res.status(401).json({ error: 'Não possui refresh token' });
    }

    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Token inválido' });
        }

        // Extraia o userId do payload decodificado
        const userId = decoded.id || decoded.userId || decoded.sub;
        if (!userId) {
            return res.status(400).json({ error: 'Payload do token inválido' });
        }

        // Use as funções utilitárias para gerar e definir os tokens
        const accessToken = token.generateAccessToken(userId);
        const newRefreshToken = token.generateRefreshToken(userId);

        token.setAccessTokenCookie(res, accessToken);
        token.setRefreshTokenCookie(res, newRefreshToken);

        return res.json({ accessToken });
    });
});

module.exports = router;