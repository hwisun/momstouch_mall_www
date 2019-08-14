import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react'
import * as serviceWorker from './serviceWorker';
import { Router } from 'react-router-dom'

import './index.css';
import App from './App';
import RootStore from './store/RootStore';

const rootStore = new RootStore();

ReactDOM.render(
    <Router history={rootStore.history}>
        <Provider
            rootStore={rootStore}
            httpService={rootStore.httpService}>
            <App />
        </Provider>
    </Router>,
    document.getElementById('root')
);

serviceWorker.unregister();
