import { observable, action, computed } from "mobx";
import Axios from 'axios'

export default class goodStore {
    @observable goodsList = [];

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @action
    getGoodsList(menuId) {
        console.log('getGoodsList');
        console.log(menuId);
        
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
}