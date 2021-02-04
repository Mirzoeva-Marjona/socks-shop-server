const {writeJson, readJson} = require('../util/file.utils');

const FILE_NAME = 'products.json';

function saveProducts(content) {
    writeJson(FILE_NAME, content);
}

function readProductFile() {
    return readJson(FILE_NAME);
}

function getAll() {
    return readProductFile();
}

function get(id) {
    const products = getAll();
    return products.find(products => products.id == id);
}

function add(newProduct) {
    let content = readProductFile();
    const productId = content[content.length - 1].id + 1;
    newProduct.id = productId;

    content.push(newProduct);
    saveProducts(content);
}

function remove(id) {
    let products = getAll();
    let findIndex = -1;
    products.forEach((value, index) => {
        if (value.id == id) {
            findIndex = index;
        }
    });
    products.splice(findIndex, 1);
    saveProducts(products);
}

function edit(newProduct) {
    let products = getAll();
    products = products.map(function callback(product){
        if (newProduct.id == product.id) {
            return newProduct;
        }
        return product;
    })
    saveProducts(products);
}

module.exports = {
    readProductFile,
    add,
    get,
    edit,
    getAll,
    remove
}
