const express = require('express');
const SalaController = require('../controllers/SalaController');
const Auth = require('../middlewares/AuthMiddleware');

const router = express.Router();

router.post('/create', Auth, SalaController.create);
router.get('/list', Auth, SalaController.list);
router.get('/qr-code/:token', Auth, SalaController.getQRCode);
router.delete('/:token', Auth, SalaController.delete);

module.exports = router;