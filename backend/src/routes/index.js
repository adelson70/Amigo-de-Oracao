const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const LimiterMiddleware = require('../middlewares/LimiterMiddleware');

const ExampleMiddleware = require('../middlewares/ExampleMiddleware')
const UsuarioRoutes = require('./UsuarioRoutes');
const QrCodeRoutes = require('./QrCodeRoutes');
const AuthRoutes = require('./AuthRoutes');
const SalaRoutes = require('./SalaRoutes');
const { limiter, limiterLogin } = LimiterMiddleware;

router.use(ExampleMiddleware)
router.use(cookieParser());
router.use('/refresh', limiterLogin, AuthRoutes);
router.use('/qr-code', limiter, QrCodeRoutes);
router.use('/usuario', limiterLogin, UsuarioRoutes);
router.use('/sala', limiter, SalaRoutes);

module.exports = router;

