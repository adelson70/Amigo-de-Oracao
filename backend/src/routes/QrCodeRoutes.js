const express = require('express');
const QrCodeController = require('../controllers/QrCodeController');

const router = express.Router();

router.post('/:token', QrCodeController.store);
router.get('/:token', QrCodeController.show);

module.exports = router;