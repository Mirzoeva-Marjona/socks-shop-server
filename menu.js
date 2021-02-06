const {firstItem, secondItem, thirdItem, fourthItem} = require('./menu-item');
const  {rl, getInput} = require('./util/console.utils');

async function menu() {
    infLoop:
        while (true) {
            console.log("Меню:\n" +
                "1. Вывести список товаров\n" +
                "2. Добавить новый товар\n" +
                "3. Изменить товар\n" +
                "4. Удалить товар\n" +
                "5. Выход\n");
            let answer = await getInput();

            switch (answer) {
                case "1":
                    await firstItem();
                    break;
                case "2":
                    await secondItem();
                    break;
                case "3":
                    await thirdItem();
                    break;
                case "4":
                    await fourthItem();
                    break;
                case "5":
                    break infLoop;
                default:
                    console.log("Некорректный ввод");
                    break;
            }
        }
    rl.close();
}

module.exports = {menu};
