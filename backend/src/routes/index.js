const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');

const ExampleMiddleware = require('../middlewares/ExampleMiddleware')
const UsuarioRoutes = require('./UsuarioRoutes');
const QrCodeRoutes = require('./QrCodeRoutes');
const AuthRoutes = require('./AuthRoutes');
const SalaRoutes = require('./SalaRoutes');

router.use(ExampleMiddleware)
router.use(cookieParser());
router.use('/refresh', AuthRoutes);
router.use('/qr-code', QrCodeRoutes);
router.use('/usuario', UsuarioRoutes);
router.use('/sala', SalaRoutes);

module.exports = router;

