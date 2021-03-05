const url_1 =  require('../assets/img/socks_1.png');
const url_2 =  require('../assets/img/socks_2.png');
const url_3 =  require('../assets/img/socks_3.png');
const url_4 =  require('../assets/img/socks_4.png');
const url_5 =  require('../assets/img/socks_5.png');
const url_6 =  require('../assets/img/socks_6.png');
const url_7 =  require('../assets/img/socks_7.png');
const url_8 =  require('../assets/img/socks_8.png');

export class StorageService {
    loadProducts() : Map<number, Product> {
        const products = new Map([
            [1, {
                img: url_1.default,
                name: "Носки. Устрицы",
                price: 299
            } as Product],
            [2, {
                img: url_2.default,
                name: "Носки. Мартин",
                price: 299
            } as Product],
            [3, {
                img: url_3.default,
                name: "Носки. Кальмары",
                price: 299
            } as Product],
            [4, {
                img: url_4.default,
                name: "Носки. Голуби",
                price: 299
            } as Product],
            [5, {
                img: url_5.default,
                name: "Носки. Геометрия",
                price: 299
            } as Product],
            [6, {
                img: url_6.default,
                name: "Носки. Суши",
                price: 299
            } as Product],
            [7, {
                img: url_7.default,
                name: "Носки. Моллюски",
                price: 299
            } as Product],
            [8, {
                img: url_8.default,
                name: "Носки. Зебра",
                price: 299
            } as Product]
        ]);
        return products;
    }

    loadPurchase(): Map<string, Purchase> {
        if (localStorage.getItem("basket") == null) {
            const map = new Map();
            localStorage.setItem("basket", JSON.stringify(Array.from(map.entries())));
        }
        const basketJson = localStorage.getItem("basket");
        const basketMap = new Map(JSON.parse(basketJson)) as Map<string, Purchase>;
        return basketMap;
    }

    savePurchase(basketMap: Map<string, Purchase>) {
        localStorage.setItem("basket", JSON.stringify(Array.from(basketMap.entries())));
    }

    loadDailyDiscount() {
        return 0.1;
    }

    loadDailyDiscountProducts() {
        return [1, 3, 7];
    }
}
