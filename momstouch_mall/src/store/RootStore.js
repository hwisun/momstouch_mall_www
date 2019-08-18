import AuthStore from './AuthStore';
import CartStore from './CartStore';
import HttpService from './HttpService';
import { createBrowserHistory } from 'history'

export default class RootStore {
    constructor() {
        this.history = createBrowserHistory();
        this.BASE_URL = 'http://localhost:8007';
        this.authStore = new AuthStore(this);
        this.cartStore = new CartStore(this);
        this.httpService = new HttpService(this);
    }
}