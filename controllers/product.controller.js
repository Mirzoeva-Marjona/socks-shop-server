const { Router } = require('express');
const {getAll, add, get, edit} = require('../model/product.repository');

const router = new Router();

router.get('/', async (_request, response) => {
    const products = getAll();
    console.log('getProducts');
    response.render('pages/index.ejs', {products: products});
});

router.get('/create', async (_request, response) => {
    response.render('pages/new.product.ejs');
});

router.post('/create', async (_request, response) => {
    let product = _request.body;
    console.log(product);
    add(product);
    response.redirect('/');
});

router.get('/edit', async (_request, response) => {
    const productId = _request.query.id;
    let product = get(productId);
    response.render("pages/edit.product.ejs", {product});
});

router.post('/edit', async (_request, response) => {
    const product = _request.body;
    edit(product);
    response.redirect("/");
});

module.exports = router;
