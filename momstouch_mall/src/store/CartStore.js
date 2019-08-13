import { observable, action, computed } from "mobx";
import Axios from 'axios'

export default class CartStore {
    @observable cartGoods = [];

    constructor(rootStore) {
        let cartGoods = localStorage.getItem('cart_mons');
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
        const goods = [];
        let URL = this.rootStore.BASE_URL + '/lists/purchase/';
        for (let good of this.cartGoods) {
            goods.push({
                goods_id: good.goods.id,
                count: good.count
            })
        }
        Axios.post(
            URL,
            {
                goods
            },
            {
                headers: {
                    'Authorization': this.rootStore.authStore.authToken
                }
            }
        ).then((response) => {
            this.clearCartGoods();
        }).catch((error) => {
            console.log(error);
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