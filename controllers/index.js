const { Router } = require('express');
const productController = require('./product-controller')
const router = new Router();
const api = require('./api/index');

router.use('/', productController);
router.use('/api', api);

module.exports = router;
