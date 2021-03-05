import {StorageService} from "./storage_service";
import {ProductRow} from "./product_row";

export class BasketComponent {
    content: any;
    basketMap: Map<string, Purchase>;
    totalCountField: any;
    basketItemsFrame: any;
    basketTotalField: any;
    closeBasketButton: any;
    closeFunction: any;
    storage: StorageService;

    set purchaseMap(map) {
        this.basketMap = map;
        this.update();
    }

    get purchaseMap() {
        return this.basketMap;
    }

    constructor(wrapper: any, storage: StorageService) {
        this.storage = storage;
        const template = document.getElementById("basketComponent");
        // @ts-ignore
        const content = document.importNode(template.content, true);

        this.basketItemsFrame = content.querySelector(".js-basket-items");
        this.basketTotalField = content.querySelector(".js-basket-total");
        this.closeBasketButton = content.querySelector(".js-close-basket");
        this.totalCountField = document.querySelector(".js-product-count");

        this.closeBasketButton.onclick = () => this.closeFunction();
        wrapper.appendChild(content);
    }

    update() {
        this.basketItemsFrame.innerHTML = "";
        this.basketMap = this.storage.loadPurchase();
        const basket = this.basketMap;
        let productList = [];
        basket.forEach((purchase, id) => {
            const product = this.storage.loadProducts().get(purchase.productId);
            const purchaseInfo = {
                productId: purchase.productId,
                count: purchase.quantity,
                size: purchase.size,
                idRow: id,
            }
            const productInfo = {...product, ...purchaseInfo}
            productList.push(productInfo);
        })

        let priceDiscounter = (discount) => {
            return (discountProducts) => {
                return productList.map(productInfo => {
                    if (discountProducts.includes(productInfo.productId)) {
                        productInfo.price -= productInfo.price * discount;
                    }
                    return productInfo;
                });
            }
        }

        let dailyPriceDiscounter = priceDiscounter(this.storage.loadDailyDiscount());
        productList = dailyPriceDiscounter(this.storage.loadDailyDiscountProducts());
        productList.forEach(productInfo => {
            const productRow = new ProductRow(this.basketItemsFrame, productInfo);
            productRow.removeProduct = this.removeProduct;
            productRow.productRowAmountChanged = this.productRowAmountChanged;
        });

        this.updateTotalCounter();
        this.updateTotalPrice(productList);
    }

    productRowAmountChanged = (productInfo) => {
        let oldPurchase = this.basketMap.get(productInfo.idRow);
        oldPurchase.quantity = productInfo.count;
        this.storage.savePurchase(this.basketMap);
        this.update();
    }

    addProductToBasket(productId, socksSize) {
        const productIdSize = productId + socksSize;
        if (this.basketMap.has(productIdSize)) {
            let productInBasket = this.basketMap.get(productIdSize);
            productInBasket.quantity++;
        } else {
            this.basketMap.set(productIdSize, {
                productId: productId,
                quantity: 1,
                size: socksSize
            })
        }

        this.storage.savePurchase(this.basketMap);
        this.updateTotalCounter();
    }

    updateTotalCounter = () => {
        this.basketMap = this.storage.loadPurchase();
        let count = 0;

        this.purchaseMap.forEach(countProduct => {
            count += Number(countProduct.quantity);
        })
        console.log(count);
        this.totalCountField.innerHTML = count;
    }

    updateTotalPrice = (productList: ProductInfo[]) => {
        let totalPrice = 0;
        for (let productInfo of productList) {
            totalPrice += Math.ceil(productInfo.count * productInfo.price);
        }
        this.basketTotalField.innerHTML = `Итого: ${totalPrice} руб.`;
    }

    removeProduct = (productId: string) => {
        this.basketMap.delete(productId);
        this.storage.savePurchase(this.basketMap);
        this.update();
    }
}
