const {add, get, remove, edit, getAll} = require('./model/product.repository');
const  {getInput} = require('./util/console.utils');

function firstItem() {
    let products = getAll();
    products.forEach(element => console.log(`ID товара: ${element.id}, 
            Название товара: ${element.name},
            Цена: ${element.price},
            Ссылка на картинку: ${element.img}`));
    console.log('-------------------------------------------------------');
}

async function secondItem() {
    console.log("Введите название товара");
    let answer = await getInput();
    const productName = answer;

    console.log("Введите ссылку на картинку товара");
    answer = await getInput();
    const productImg = answer;

    console.log("Введите цену товара");
    answer = await getInput();
    const productPrice = answer;

    const newProduct = {
        img: productImg,
        name: productName,
        price: productPrice,
    }

    add(newProduct);
}

async function thirdItem() {
    console.log("Введите id товара, который хотите изменить");
    let answer = await getInput();
    const changeProduct = answer;
    if (get(answer)) {
        let product = get(answer);

        console.log(`Введите новое название товара (${product.name})`);
        answer = await getInput();
        if (answer != '') {
            product.name = answer;
        }

        console.log(`Введите новую ссылку на картинку товара (${product.img})`);
        answer = await getInput();
        if (answer != '') {
            product.img = answer;
        }

        console.log(`Введите новую цену товара (${product.price})`);
        answer = await getInput();
        if (answer != '') {
            product.price = answer;
        }
        edit(product);
        console.log(product);
    } else {
        console.log("Товар с данным id не найден");
    }
}

async function fourthItem() {
    console.log("Введите id товара, который хотите удалить");
    let answer = await getInput();
    if (get(answer)) {
        remove(answer);
    } else {
        console.log("Товар с данным id не найден");
    }
}

module.exports = {firstItem, secondItem, thirdItem, fourthItem};
