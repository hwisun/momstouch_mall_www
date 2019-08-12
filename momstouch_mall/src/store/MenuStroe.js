import { observable, action, computed } from "mobx";
import Axios from 'axios'

export default class MenuStore {
    @observable menuList = [];

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @action
    getMenuList() {
        console.log('getMenuList');
        let URL = this.rootStore.BASE_URL + '/menus/';
        Axios.get(
            URL
        ).then(response => {
            this.menuList = response.data;
        })
    }
}