require('dotenv').config();
const jwt = require('jsonwebtoken');
const ms = require('ms');

const ACESS_TOKEN = {
    secret: process.env.JWT_SECRET,
    expireIn: process.env.JWT_EXPIRES_IN
}
const REFRESH_TOKEN = {
    secret: process.env.JWT_REFRESH_SECRET,
    expireIn: process.env.JWT_REFRESH_EXPIRES_IN
}

const TokenService = {
    generateAccessToken: (usuario) => {
        return jwt.sign({ usuario }, ACESS_TOKEN.secret, { expiresIn: ACESS_TOKEN.expireIn });
    },

    generateRefreshToken: (usuario) => {
        return jwt.sign({ usuario }, REFRESH_TOKEN.secret, { expiresIn: REFRESH_TOKEN.expireIn });
    },

    verifyAccessToken: (token) => {
        return jwt.verify(token, ACESS_TOKEN.secret);
    },

    verifyRefreshToken: (token) => {
        return jwt.verify(token, REFRESH_TOKEN.secret);
    },
    setAccessTokenCookie: (res, token) => {
        res.cookie('access_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: ms(ACESS_TOKEN.expireIn),
            path: '/',
        });
    },

    setRefreshTokenCookie: (res, token) => {
        res.cookie('refresh_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: ms(REFRESH_TOKEN.expireIn),
            path: '/api/refresh',
        });
    }
}


module.exports = TokenService;