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
import Home from './components/home';
import Preferences from './components/preferences';
import Admin from './components/adminPanel';
import Session from './components/session';
import Message from './components/messageContainer';
import Detail from './components/messageDetail';

// redux stote
import appStore from './store'

ReactDOM.render(
  <Provider store={appStore}>    
    <BrowserRouter>    
      <App>
        <Switch>
          <Route path="/preferences" component={Preferences}></Route>        
          <Route path="/chat" component={Message}></Route>
          <Route path="/message/:id" component={Detail}></Route>
          <Route path="/admin" component={Admin}></Route>
          <Route path="/sessions" component={Session}></Route>
          <Route component={Home}></Route>
        </Switch>
      </App>
    </BrowserRouter>
  </Provider>

, document.getElementById('root'));

registerServiceWorker();


