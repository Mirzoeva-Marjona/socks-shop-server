const { Router } = require('express');
const {getAll, add, get, edit} = require('../model/product.repository');

const router = new Router();

router.get('/', (_request, response) => {
    const products = getAll();
    console.log('getProducts');
    response.render('home/home.ejs'
        // , {products: products}
        );
});

module.exports = router;
