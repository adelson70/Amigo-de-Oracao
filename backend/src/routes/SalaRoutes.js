const express = require('express');
const SalaController = require('../controllers/SalaController');
const Auth = require('../middlewares/AuthMiddleware');

const router = express.Router();

router.post('/create', Auth, SalaController.create);
router.get('/list', Auth, SalaController.list);
router.get('/:id', Auth, SalaController.getById); //pensando se vou usar
router.put('/:id', Auth, SalaController.update); //pensando se vou usar
router.delete('/:token', Auth, SalaController.delete);

module.exports = router;