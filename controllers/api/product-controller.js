const { Router } = require('express');
const {getAll, add, get, edit, remove} = require('../../model/product.repository');

const router = new Router();

router.get('/', async (_request, response) => {
    let products = getAll();
    response.json(products);
});

router.get('/:id', async (_request, response) => {
    let id = _request.params.id;
    let product = get(id);
    if (product) {
        response.json(product);
    } else {
        response.sendStatus(404);
    }
});

router.post('/', async (_request, response) => {
    const product = _request.body;
    add(product);
    response.sendStatus(201);
});

router.patch('/:id', async (_request, response) => {
    let id = _request.params.id;
    let newProduct = _request.body;
    let product = get(id);
    if (product) {
        if (newProduct.name) {
            product.name = newProduct.name;
        }
        if (newProduct.img) {
            product.img = newProduct.img;
        }
        if (newProduct.sex) {
            product.sex = newProduct.sex;
        }
        if (newProduct.price) {
            product.price = newProduct.price;
        }
        edit(product);
        response.sendStatus(200);
    } else {
        response.sendStatus(404);
    }
});

router.put('/:id', async (_request, response) => {
    let id = _request.params.id;
    let product = _request.body;
    product.id = id;
        if (get(id)) {
        edit(product);
        response.sendStatus(200);
    } else {
        response.sendStatus(404);
    }
});

router.delete('/:id', async (_request, response) => {
    let id = _request.params.id;
    if (get(id)) {
        remove(id);
        response.sendStatus(200);
    } else {
        response.sendStatus(404);
    }
})

module.exports = router;
