const {writeJson, readJson} = require('../util/file.utils');

const fileName = 'products.json';

function saveProducts(content) {
    writeJson(fileName, content);
}

function readProductFile() {
    return readJson(fileName);
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

function edit(product) {
    let products = getAll();
    let findIndex = -1;
    products.forEach((value, index) => {
        let id = product.id;
        if (value.id == id) {
            findIndex = index;
        }
    });
    products[findIndex] = product;
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
