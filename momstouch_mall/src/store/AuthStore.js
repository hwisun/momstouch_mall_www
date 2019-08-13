import { observable, computed, action } from 'mobx';

export default class AuthStore {
    @observable authToken = null;

    constructor(rootStore) {
        this.rootStore = rootStore;
        this.authToken = localStorage.getItem('auth_token');
    }

    @action
    setToken(token) {
        this.authToken = token.token_type + ' ' + token.access_token;
        localStorage.setItem('auth_token', this.authToken);
    }

    @action
    deleteToken() {
        // this.rootStore.cartStore.clearCartMons();
        localStorage.removeItem('auth_token');
        this.authToken = null;
    }

    @computed get isLoggedIn() {
        return this.authToken != null;
    }
}
