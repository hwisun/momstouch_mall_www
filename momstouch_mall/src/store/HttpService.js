import Axios from 'axios'
import { reaction } from 'mobx';

class HttpService {
    constructor(rootStore) {
        this.rootStore = rootStore;
        this.authStore = rootStore.authStore;

        Axios.defaults.baseURL = 'http://localhost:8007';
        Axios.defaults.headers.common['Authorization'] = this.authStore.authToken

        reaction(() => this.authStore.authToken, () => {
            Axios.defaults.headers.common['Authorization'] = this.authStore.authToken
        })

    }

    getMe() {
        return Axios.get('/me/')
            .then(response => {
                return response.data;
            })
    }

    indexGoods() {
        return Axios.get('/items/')
            .then(response => {
                return response.data;
            })
    }

    indexMyGoods() {
        return Axios.get('/me/goods/')
            .then(response => {
                return response.data;
            })
    }
}

export default HttpService;