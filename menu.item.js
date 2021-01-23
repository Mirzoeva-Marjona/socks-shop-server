const {saveProduct, readProductFile, getInput} = require('./file');

async function firstItem() {
    let content = readProductFile();
    content.forEach(element => console.log(`ID товара: ${element.id}, 
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

    let content = readProductFile();
    const productId = content[content.length - 1].id + 1;

    const newProduct = {
        id: productId,
        img: productImg,
        name: productName,
        price: productPrice,
    }
    content.push(newProduct);
    saveProduct(content);
}

async function thirdItem() {
    let content = readProductFile();
    console.log("Введите id товара, который хотите изменить");
    let answer = await getInput();
    const changeProduct = answer;
    let findIndex = -1;
    content.forEach((value, index) => {
        if (value.id == changeProduct) {
            findIndex = index;
        }
    });
    if (findIndex == -1) {
        console.log("Товар с данным id не найден");
    } else {
        let product = content[findIndex];
        console.log(`Введите новое название товара (${product.name})`);
        answer = await getInput();
        if (answer != '') {
            content[findIndex].name = answer;
        }

        console.log(`Введите новую ссылку на картинку товара (${product.img})`);
        answer = await getInput();
        if (answer != '') {
            content[findIndex].img = answer;
        }

        console.log(`Введите новую цену товара (${product.price})`);
        answer = await getInput();
        if (answer != '') {
            content[findIndex].price = answer;
        }
        saveProduct(content);
        console.log(content[findIndex]);
    }
}

async function fourthItem() {
    let content = readProductFile();
    console.log("Введите id товара, который хотите удалить");
    let answer = await getInput();
    const changeProduct = answer;
    let findIndex = -1;
    content.forEach((value, index) => {
        if (value.id == changeProduct) {
            findIndex = index;
        }
    });
    if (findIndex == -1) {
        console.log("Товар с данным id не найден");
    } else {
        content.splice(findIndex, 1);
        saveProduct(content);
    }
}

module.exports = {firstItem, secondItem, thirdItem, fourthItem};
