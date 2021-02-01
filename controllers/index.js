const { Router } = require('express');
const productController = require('./product.controller')
const router = new Router();

router.use('/', productController);

module.exports = router;
