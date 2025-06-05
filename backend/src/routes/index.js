const express = require('express');
const router = express.Router();

const ExampleMiddleware = require('../middlewares/ExampleMiddleware')
const UsuarioRoutes = require('./UsuarioRoutes');
const QrCodeRoutes = require('./QrCodeRoutes');
const AuthRoutes = require('./AuthRoutes');

router.use(ExampleMiddleware)
router.use('/refresh',AuthRoutes);
router.use('/qr-code', QrCodeRoutes);
router.use('/usuario', UsuarioRoutes);

module.exports = router;

