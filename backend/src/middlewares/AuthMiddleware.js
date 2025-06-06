const jwt = require('jsonwebtoken');
require('dotenv').config();

const AuthMiddleware = (req, res, next) => {
    const accessToken = req.cookies && req.cookies.access_token;

    if (!accessToken) {
        return res.status(401).json({ error: 'Acesso negado. Token não fornecido.' });
    }

    jwt.verify(accessToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Token inválido.' });
        }

        req.user = decoded;
        next();
    });
}

module.exports = AuthMiddleware;