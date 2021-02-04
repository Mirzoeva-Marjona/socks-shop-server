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
    const product = _request.body;
    console.log(_request.body);
    add(product);
    response.redirect('/');
});

router.get('/edit', async (_request, response) => {
    const productId = _request.query.id;
    if (productId) {
        let product = get(productId);
        response.render("pages/edit.product.ejs", {product});
    } else {
        response.render("pages/page.not.found.ejs");
    }
});

router.post('/edit', async (_request, response) => {
    const product = _request.body;
    edit(product);
    response.redirect("/");
});

module.exports = router;
