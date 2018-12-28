import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

// import registerServiceWorker from './registerServiceWorker';
// registerServiceWorker();

// Initialize web3
// eslint-disable-next-line
import { loadWeb3 } from './state/init/web3';
import { startTipTimer } from './state/init/timer.js';

// Routing Components
import App from './App';

// redux stote
import appStore from './state/store';

// init
// load data
async function init() {
  // connect to server, get contract info
  // await initSockets();

  // load web3
  await loadWeb3();

  // connect contracts to web3
  // await initContracts();

  // wait 4 seconds for everything to load, then show a tip
  startTipTimer();
}
init();

ReactDOM.render(
  <Provider store={appStore}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,

  document.getElementById('root')
);
