import * as $ from "jquery";
import {StorageService} from "./storage_service";
import {BasketComponent} from "./basket_component";
import '../assets/styles/base.less';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const preloaderOpen = () => {
    $('.js-loader, .js-overlay').removeClass('js-hidden');
    $('.js-loader').slideUp(500).slideDown(500);
}

const preloaderClose = () => {
    $('.js-loader').slideUp(500).slideDown(500).delay(1000);
    $('.js-loader').addClass('js-hidden');
}

$('.js-open-basket').click(function (event) {
    preloaderOpen();
    sleep(2000).then(() => {
        preloaderClose();
        showBasket();
    });
});

const showBasket = () => {
    basketComponent.update();
    $('.js-basket').removeClass('js-hidden');
    console.log("open basket");
}

const closeBasket = () => {
    console.log("close basket");
    $('.js-basket, .js-overlay, .js-loader').addClass("js-hidden");
}

const initProductCards = () => {
    $('.js-add-to-basket').click(function (event) {
        console.log("add to basket");

        const productId = $(this).parent('.js-product-card').data('product-id');
        console.log(productId);

        const socksSize = $(this).parent('.js-product-card').find('select').val();
        console.log(socksSize);
        const SIZE_TEXT = "Размер"
        if (socksSize === SIZE_TEXT) {
            $('.js-notification, .js-overlay').removeClass('js-hidden');
        } else {
            basketComponent.addProductToBasket(productId, socksSize);
        }
    })
}

$('.js-overlay').click(function (event) {
    $('.js-basket, .js-notification, .js-overlay, .js-loader').addClass("js-hidden");
})

const creatProductCard = (product: Product) => {
    // @ts-ignore
    const clone = productCard.content.cloneNode(true);
    $(clone).find(".js-product-card").data('product-id', product.id);
    $(clone).find(".js-product-img").attr("src", product.img);
    $(clone).find(".js-product-name").text(product.name);
    $(clone).find(".js-product-price").text(product.price);
    return clone;
}

const showProductCards = () => {
    const products = storage.loadProducts();

    products.forEach((product, id) => {
        product.id = id;
        const card = creatProductCard(product);
        console.log(product)
        $(".js-product-cards-container").append(card);
    })
}

const storage = new StorageService();
const wrapper = document.documentElement;
const basketComponent = new BasketComponent(wrapper, storage);
basketComponent.closeFunction = closeBasket;
basketComponent.purchaseMap = storage.loadPurchase();

showProductCards();
initProductCards();
