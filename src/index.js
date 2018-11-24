import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';

// Initialize web3
// eslint-disable-next-line
import getWeb3 from './web3.js';
import { startTipTimer } from './timer.js';

// Routing Components
import App from './App';

// redux stote
import appStore from './store';

// init
startTipTimer();

ReactDOM.render(
  <Provider store={appStore}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,

  document.getElementById('root')
);

registerServiceWorker();
