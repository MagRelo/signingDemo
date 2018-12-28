import store from '../store';
import Web3 from 'web3';

export async function loadWeb3() {
  // Wait for loading completion to avoid race conditions with web3 injection timing.
  window.addEventListener('load', async function(dispatch) {
    var web3;

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof window.web3 !== 'undefined') {
      console.log('Injected web3 detected.');
      // Use Mist/MetaMask's provider.
      web3 = new Web3(window.web3.currentProvider);
    } else {
      console.log('No web3 instance injected, using Local web3.');
      var provider = new Web3.providers.HttpProvider('http://localhost:8545');
      web3 = new Web3(provider);
    }

    if (!web3._provider.isConnected) {
      return console.log('no web3 connection!');
    }

    // set network
    let networkId = await web3.eth.net.getId();
    let network = 'unknown';
    switch (networkId.toString()) {
      case '1':
        network = 'mainnet';
        break;
      case '2':
        network = 'morden';
        break;
      case '3':
        network = 'ropsten';
        break;
      case '4':
        network = 'rinkeby';
        break;
      case '42':
        network = 'kovan';
        break;
      case '654321':
        network = 'pragma-testnet';
        break;
      default:
        network = 'unknown (local?)';
    }

    // get accounts
    let accounts = await web3.eth.getAccounts();
    let balance = 0;
    if (accounts[0]) {
      balance = await web3.eth.getBalance(accounts[0]);
    }

    store.dispatch({
      type: 'WEB3_INITIALIZED',
      payload: {
        instance: web3,
        network: network,
        accounts: accounts,
        balance: balance
      }
    });
  });
}
