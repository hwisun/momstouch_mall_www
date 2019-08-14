import GoodStore from './GoodStore'
import MenuStore from './MenuStroe'
import AuthStore from './AuthStore';
import UserStore from './UserStore';
import CartStore from './CartStore';
import HttpService from './HttpService';
import { createBrowserHistory } from 'history'

export default class RootStore {
    constructor() {
        this.history = createBrowserHistory();
        this.BASE_URL = 'http://localhost:8007';
        this.goodStore = new GoodStore(this);
        this.menuStore = new MenuStore(this);
        this.authStore = new AuthStore(this);
        this.userStore = new UserStore(this);
        this.cartStore = new CartStore(this);
        this.httpService = new HttpService(this);
    }
}