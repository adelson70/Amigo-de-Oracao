const express = require('express');
const router = express.Router();

const ExampleMiddleware = require('../middlewares/ExampleMiddleware')
const ExampleRoutes = require('./ExampleRoutes');

router.use(ExampleMiddleware)
router.use('/', ExampleRoutes);

module.exports = router;

