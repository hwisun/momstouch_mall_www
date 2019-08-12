import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React from 'react';

import './App.css';
import Home from './main/Home';
import Header from './main/Header';

import Footer from './main/Footer';
import Detail from './main/Detail';

function App() {
  return (
    <Router>
      <div id='container'>
      <Header />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/menu/:menuId' component={Home} />
        <Route exact path='/goods/:goodsId' component={Detail} />
      </Switch>
      <Footer />
      </div>
    </Router>
  );
}

export default App;
