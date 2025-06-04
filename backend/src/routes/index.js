const express = require('express');
const router = express.Router();

const ExampleMiddleware = require('../middlewares/ExampleMiddleware')
const QrCodeRoutes = require('./QrCodeRoutes');

router.use(ExampleMiddleware)
router.use('/qr-code', QrCodeRoutes);

module.exports = router;

