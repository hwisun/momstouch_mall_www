import { observable, action, computed } from "mobx";
import Axios from 'axios'

export default class goodStore {
    @observable goodsList = [];
    @observable goods = [];
    @observable myGoodsList = [];

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @action
    getGoodsList(menuId) {
        console.log('getGoodsList');
        
        let URL = this.rootStore.BASE_URL +'/goods/';
        if (menuId) {
            URL = this.rootStore.BASE_URL + '/menus/' + menuId + '/goods/';
        }
        Axios.get(
            URL
        ).then(response => {
            this.goodsList = response.data;
        })
    }

    @action
    getGoods(goodsId) {
        console.log('getGoods');

        let URL = this.rootStore.BASE_URL + '/goods/' + goodsId+'/';
        Axios.get(
            URL
        ).then(response => {
            this.goods = response.data;
            //console.log(response.data);
            
        })
    }

    @action
    getMyGoods() {
        let URL = this.rootStore.BASE_URL + '/me/goods/';
        Axios.get(
            URL,
            {
                headers: {
                    'Authorization': this.rootStore.authStore.authToken
                }
            }
        )
            .then(response => {
                this.myGoodsList = response.data;
            });
    }

    @action
    onPurchase() {
        const goods = [];
        let URL = this.rootStore.BASE_URL + '/goods/purchase/';
        goods.push({
            goods_id: this.goods.id,
            count: 1
        })
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
            this.rootStore.history.push('/mygoods')
        }).catch((error) => {
            console.log(error);
        })
    }
}