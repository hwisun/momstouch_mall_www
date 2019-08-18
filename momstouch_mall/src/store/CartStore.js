import { observable, action, computed } from "mobx";
import Axios from 'axios'

export default class CartStore {
    @observable cartGoods = [];

    constructor(rootStore) {
        let cartGoods = localStorage.getItem('cart_goods');
        if (cartGoods == null || cartGoods.length < 1) {
            cartGoods = [];
        } else {
            cartGoods = JSON.parse(cartGoods);
        }
        this.cartGoods = cartGoods;
        this.rootStore = rootStore;
    }

    @action
    addGoodsToCart(goods) {
        let isAdded = false;
        for (let cartGood of this.cartGoods) {
            if (cartGood.goods.id === goods.id) {
                cartGood.count++;
                isAdded = true;
                break;
            }
        }
        if (!isAdded) {
            this.cartGoods.push({
                goods: goods,
                count: 1
            })
        }
        this.saveCartGoods();
    }

    @action
    purchaseCartGoods() {
        this.rootStore.httpService.purchase(this.cartGoods)
        .then(response => {
            this.clearCartGoods();
        })
    }

    @computed
    get cartGoodsCount() {
        return this.cartGoods.length;
    }

    @action
    clearCartGoods() {
        this.cartGoods = [];
        this.saveCartGoods();
    }

    saveCartGoods() {
        localStorage.setItem('cart_goods', JSON.stringify(this.cartGoods))
    }
}