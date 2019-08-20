import { Route, Switch } from 'react-router-dom';
import React from 'react';

import './App.css';
import Home from './main/Home';
import Header from './main/Header';

import Footer from './main/Footer';
import Detail from './main/Detail';
import Login from './main/Login';
import MyGoods from './main/MyGoods';
import MyCart from './main/MyCart';
import PromiseTest from './promise/PromiseTest';
import MyHistory from './main/MyHistory';

function App() {
  return (
      <div id='container'>
      <Header />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/menu/:menuId' component={Home} />
        <Route exact path='/goods/:goodsId' component={Detail} />
        <Route exact path='/mygoods' component={MyGoods} />
        <Route exact path='/mycart' component={MyCart} />
        <Route exact path='/myhistory' component={MyHistory} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/promise-test' component={PromiseTest} />
      </Switch>
      <Footer />
      </div>
  );
}

export default App;
