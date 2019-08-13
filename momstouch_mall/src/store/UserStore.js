import { observable, computed, action } from 'mobx'
import Axios from 'axios';

export default class UserStore {
    @observable user = [];

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @action
    setUser() {
        let URL = this.rootStore.BASE_URL + '/me/';
        Axios.get(
            URL,
            {
                headers: {
                    'Authorization': this.rootStore.authStore.authToken
                }
            }
        ).then((response) => {
            this.user = response.data;
        })
    }
}
