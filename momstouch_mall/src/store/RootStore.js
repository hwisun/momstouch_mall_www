import GoodStore from './GoodStore'
import MenuStore from './MenuStroe'

export default class RootStore {
    constructor() {
        this.BASE_URL = 'http://localhost:8007';
        this.goodStore = new GoodStore(this);
        this.menuStore = new MenuStore(this);
    }
}