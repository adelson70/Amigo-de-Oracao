const express = require('express');
const UsuarioController = require('../controllers/UsuarioController');
const Auth = require('../middlewares/AuthMiddleware');

const router = express.Router();

router.post('/login', UsuarioController.login);
router.post('/logout', Auth, UsuarioController.logout);
router.post('/register', UsuarioController.register);
router.post('/esqueci-minha-senha', UsuarioController.esqueciMinhaSenha);
router.post('/esqueci-minha-senha/:token', UsuarioController.redefinirSenha);
router.get('/me', Auth, UsuarioController.me);
router.get('/info', Auth, UsuarioController.info);
router.put('/update', Auth, UsuarioController.update);


module.exports = router;