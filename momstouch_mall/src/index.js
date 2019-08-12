import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react'
import * as serviceWorker from './serviceWorker';

import './index.css';
import App from './App';
import RootStore from './store/RootStore';

const rootStore = new RootStore();

ReactDOM.render(
    <Provider rootStore={rootStore}>
        <App />
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();
