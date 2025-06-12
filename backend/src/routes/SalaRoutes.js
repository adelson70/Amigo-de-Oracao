const express = require('express');
const SalaController = require('../controllers/SalaController');
const Auth = require('../middlewares/AuthMiddleware');
const AuthParticipant = require('../middlewares/AuthParticipanteMiddleware');

const router = express.Router();

router.post('/create', Auth, SalaController.create);
router.get('/list', Auth, SalaController.list);
router.get('/qr-code/:token', Auth, SalaController.getQRCode);
router.get('/verify-token/:token', SalaController.verifyToken);
router.post('/join', SalaController.join);
router.get('/is-participante', AuthParticipant, SalaController.isParticipante);
router.delete('/:token', Auth, SalaController.delete);

module.exports = router;