import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import registerServiceWorker from './registerServiceWorker';

// Initialize web3
// eslint-disable-next-line
import getWeb3 from './web3.js'

// Routing Components
import App from './App';
import Chat from './components/messageContainer';
import Detail from './components/messageDetail';
import Account from './components/account';
import Login from './components/login';
import Home from './components/home';
import Admin from './components/adminPanel';


// redux stote
import appStore from './store'

ReactDOM.render(
  <Provider store={appStore}>    
    <BrowserRouter>    
      <App>
        <Switch>
          <Route path="/preferences" component={Account}></Route>
          
          <Route path="/chat" component={Chat}></Route>
          <Route path="/message/:id" component={Detail}></Route>

          <Route path="/admin" component={Admin}></Route>

          <Route path="/sessions" component={Login}></Route>
          <Route component={Home}></Route>
        </Switch>
      </App>
    </BrowserRouter>
  </Provider>

, document.getElementById('root'));

registerServiceWorker();


