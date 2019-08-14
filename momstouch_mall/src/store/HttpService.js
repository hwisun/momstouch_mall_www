import Axios from 'axios'
import { reaction } from 'mobx';
import { Promise } from 'q';

class HttpService {
    constructor(rootStore) {
        this.rootStore = rootStore;
        this.authStore = rootStore.authStore;
        this.clientId = 'YYvIjmLiRcvrikzjrlIAfQbKurCZdYoxIIDELPxm'

        this.refreshSubscribers = [];
        this.isRefreshingToken = false


        Axios.defaults.baseURL = 'http://localhost:8007';
        Axios.defaults.headers.common['Authorization'] = this.authStore.authToken

        reaction(() => this.authStore.authToken, () => {
            Axios.defaults.headers.common['Authorization'] = this.authStore.authToken
        })

        Axios.interceptors.response.use(response => {
            return response;
        }, originalError => {
            const { config, response } = originalError;
            const originalRequest = config;
            if (response.status === 401) {
                if (this.authStore.refreshToken == null) {
                    alert('로그인이 필요한 서비스입니다.');
                    this.rootStore.history.push('/login');
                } else {
                    if (!this.isRefreshingToken) {
                        this.isRefreshingToken = true;
                        return new Promise((resolve, reject) => {
                            this.refreshToken().then(token => {
                                originalRequest.headers.Authorization = this.authStore.authToken;
                                resolve(Axios(originalRequest));

                                for (let subscriber of this.refreshSubscribers) {
                                    subscriber(token)
                                }
                            }).catch(error => {
                                this.authStore.deleteToken();
                                reject(originalError);
                                alert('로그인이 필요한 서비스입니다.');
                                this.rootStore.history.push('/login');
                                for (let subscriber of this.refreshSubscribers) {
                                    subscriber(null)
                                }
                            }).finally(() => {
                                this.refreshSubscribers = [];
                                this.isRefreshingToken = false;
                            })
                        });
                    }

                    return new Promise((resolve, reject) => {
                        this.refreshSubscribers.push((token) => {
                            if (token == null) {
                                reject(originalError);
                            } else {
                                originalRequest.headers.Authorization = this.authStore.authToken;
                                resolve(Axios(originalRequest));
                            }
                        })
                    })
                }
            }
            return Promise.reject(originalError);
        });
    }

    getGoods(goodId) {
        return Axios.get('/goods/' + goodId + '/')
            .then(response => {
                return response.data;
            })
    }

    getMe() {
        return Axios.get('/me/')
            .then(response => {
                return response.data;
            })
    }

    getMenu() {
        return Axios.get('/menus/').then(response => {
            return response.data;
        })
    }

    indexGoods(menuId) {
        return Axios.get(menuId ? '/menus/' + menuId + '/goods/' : '/goods/')
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

    login(username, password) {
        Axios.post('/o/token/',
            {
                grant_type: 'password',
                client_id: this.clientId,
                username,
                password
            }
        ).then((response) => {
            const token = response.data;
            this.rootStore.authStore.setToken(token);
            this.rootStore.userStore.setUser()
            this.rootStore.history.push('/');
            return token
        })
    }

    purchase(goodsList) {
        const goods = []
        if (goodsList.id) {
            goods.push({
                goods_id: goodsList.id,
                count: 1
            })
        } else {
            console.log(goodsList);
            for (let good of goodsList) {
                goods.push({
                    goods_id: good.goods.id,
                    count: good.count
                })
            }
        }
        return Axios.post('/goods/purchase/', { goods }).then((response) => {
            this.rootStore.history.push('/mygoods');
            return response.data;
        })
    }

    refreshToken() {
        return Axios.post('/o/token/', {
            grant_type: 'refresh_token',
            client_id: this.clientId,
            refresh_token: this.authStore.refreshToken
        }).then(response => {
            const token = response.data;
            this.authStore.setToken(token)
            return token;
        })
    }
}

export default HttpService;