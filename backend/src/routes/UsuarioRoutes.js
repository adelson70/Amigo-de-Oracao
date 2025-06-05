const express = require('express');
const UsuarioController = require('../controllers/UsuarioController');
const Auth = require('../middlewares/AuthMiddleware');

const router = express.Router();

router.post('/login', UsuarioController.login);
router.post('/logout', Auth, UsuarioController.logout);
router.post('/register', UsuarioController.register);
router.get('/me', Auth, UsuarioController.me);

module.exports = router;