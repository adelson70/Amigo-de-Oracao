const express = require('express');
const ExampleController = require('../controllers/ExampleController');
const ExampleMiddleware = require('../middlewares/ExampleMiddleware');

const router = express.Router();

router.post('/adicionar', ExampleController.store);
router.get('/buscar', ExampleController.index);
router.get('/buscar/:nomeId', ExampleController.show);
router.get('/example', ExampleMiddleware, ExampleController.example);
router.put('/alterar/:nomeId', ExampleController.update);
router.delete('/remover/:nomeId', ExampleController.destroy);

module.exports = router;

