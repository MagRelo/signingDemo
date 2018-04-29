import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { BrowserRouter, Switch, Route } from 'react-router-dom'


import registerServiceWorker from './registerServiceWorker';

// Initialize web3
import getWeb3 from './web3.js'

// Routing Components
import App from './App';
import Chat from './components/chat';
import Detail from './components/messageDetail';
import Account from './components/account';
import Home from './components/home';
import Admin from './components/adminPanel';


// redux stote
import appStore from './store'

ReactDOM.render(
  <Provider store={appStore}>    
    <BrowserRouter>    
      <App>
        <Switch>
          <Route path="/admin" component={Admin}></Route>
          <Route path="/chat" component={Chat}></Route>
          <Route path="/message/:id" component={Detail}></Route>
          <Route path="/account" component={Account}></Route>
          <Route component={Home}></Route>
        </Switch>
      </App>
    </BrowserRouter>
  </Provider>

, document.getElementById('root'));

registerServiceWorker();


