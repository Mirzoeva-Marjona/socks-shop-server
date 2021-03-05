const { Router } = require('express');
const productController = require('./product-controller')
const homeController = require('./home.controller')
const router = new Router();
const api = require('./api/index');


router.use('/admin', productController);
router.use('/api', api);

router.use('/', homeController);

module.exports = router;
