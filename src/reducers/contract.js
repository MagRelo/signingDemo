import store from '../store';
import ethUtil from 'eth-sig-util';
const contract = require('truffle-contract');

// import ServesaContract from '../../build/contracts/Servesa.json';
// import ServesaFactory from '../../build/contracts/ServesaFactory.json';
const ServesaFactory = {};
const ServesaContract = {};

const initialState = {
  loading: true,
  connected: false,
  messages: []
};

export function createContract(contractOptions) {
  const web3 = store.getState().web3.web3Instance;
  const userAddress = web3.eth.accounts[0];
  const config = store.getState().contracts.config;
  const deployedFactoryAddress = config.deployedFactoryAddress;

  return function(dispatch) {
    // "loading" display
    // dispatch(requestSent());

    // send analytics
    // dispatch(sendEvent('create', { contractOptions: contractOptions }));

    if (!!web3 || !!userAddress) {
      return 'Error';
    }

    const factoryInstance = contract({ abi: ServesaFactory.abi });
    factoryInstance.setProvider(web3.currentProvider);
    factoryInstance.defaults({ from: userAddress });
    factoryInstance
      .at(deployedFactoryAddress)
      .then(instance => {
        // Create contract on Ethereum
        return instance.newContract(
          userAddress,
          contractOptions.contractName,
          contractOptions.contractAvatarUrl,
          contractOptions.ownerCanBurn,
          contractOptions.ownerCanSpend,
          contractOptions.maxTokens,
          web3.toWei(contractOptions.tokenBasePrice, 'ether'),
          contractOptions.tokenPriceExponentDivisor,
          contractOptions.tokenPriceLinearDivisor
        );
      })
      .then(result => {
        // Create contract on Servesa search
        console.log('Contract Address:', result.receipt.logs[0].address);

        return fetch('/api/contract/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            deployedAddress: result.receipt.logs[0].address,
            deployedNetwork: 'Testing?',
            contractOptions: contractOptions
          })
        });
      })
      .then(rawResponse => {
        if (rawResponse.status !== 200) {
          throw new Error(rawResponse.text);
        }
        return rawResponse.json();
      })
      .then(searchResults => {
        // Redirect home.
        // return browserHistory.push('/contract/list');
      })
      .catch(error => {
        console.log(error.message);
        // return browserHistory.push('/contract/list');
      });
  };
}

export function buyTokens(contractAddress, payment) {
  return function(dispatch) {
    const web3 = store.getState().web3.instance;
    const userAddress = store.getState().user.userAccount;

    const contractInstance = contract({ abi: ServesaContract.abi });
    contractInstance.defaults({ from: userAddress });
    contractInstance.setProvider(web3.currentProvider);
    contractInstance
      .at(contractAddress)
      .then(instance => {
        return instance.buy({ value: payment });
      })
      .then(result => {
        result.inError = false;
        console.log(result);
        // dispatch(requestComplete(result))
      })
      .catch(error => {
        error.inError = true;
        console.log(error);
        // dispatch(requestComplete(error))
      });
  };
}

export function sellTokens(contractAddress, tokensToSell) {
  return function(dispatch) {
    const web3 = store.getState().web3.instance;
    const userAddress = store.getState().user.userAccount;

    const contractInstance = contract({ abi: ServesaContract.abi });
    contractInstance.defaults({ from: userAddress });
    contractInstance.setProvider(web3.currentProvider);
    contractInstance
      .at(contractAddress)
      .then(instance => {
        return instance.sell(parseInt(tokensToSell, 10));
      })
      .then(result => {
        result.inError = false;
        console.log(result);
        // dispatch(requestComplete(result));
      })
      .catch(error => {
        error.inError = true;
        console.log(error);
        // dispatch(requestComplete(error));
      });
  };
}

export function tranferTokens(contractAddress, tokensToTransfer) {
  return function(dispatch) {
    const web3 = store.getState().web3.instance;
    const userAddress = store.getState().user.userAccount;

    const contractInstance = contract({ abi: ServesaContract.abi });
    contractInstance.defaults({ from: userAddress });
    contractInstance.setProvider(web3.currentProvider);
    contractInstance
      .at(contractAddress)
      .then(instance => {
        return instance.transfer(parseInt(tokensToTransfer, 10));
      })
      .then(result => {
        result.inError = false;
        console.log(result);
        // dispatch(requestComplete(result))
      })
      .catch(error => {
        error.inError = true;
        console.log(error);
        // dispatch(requestComplete(error))
      });
  };
}

export function sendMessage(contractAddress, message) {
  return function(dispatch) {
    const web3 = store.getState().web3.instance;
    const userAddress = store.getState().user.userAccount;

    const msg = ethUtil.bufferToHex(new Buffer(this.state.content, 'utf8'));

    // sign message
    web3.currentProvider.sendAsync(
      {
        method: 'personal_sign',
        params: [msg, userAddress],
        from: userAddress
      },
      (err, result) => {
        if (err) return console.error(err);
        if (result.error) {
          return console.log('User denied signature.');
        }

        console.log('TODO: send to server');

        return dispatch({
          type: 'MESSAGE_SENT',
          payload: {}
        });
      }
    );
  };
}

const contractReducer = (state = initialState, action) => {
  if (action.type === 'CREATING_CONTRACT') {
    return Object.assign({}, state, {
      loading: false,
      connected: true,
      messages: action.payload
    });
  }
  if (action.type === 'CONTRACT_CREATED') {
    return Object.assign({}, state, {
      loading: false,
      connected: true,
      messages: action.payload
    });
  }
  if (action.type === 'BUYING_TOKENS') {
    return Object.assign({}, state, {
      loading: false,
      connected: true,
      messages: action.payload
    });
  }
  if (action.type === 'TOKENS_BOUGHT') {
    return Object.assign({}, state, {
      loading: false,
      connected: true,
      messages: action.payload
    });
  }
  if (action.type === 'SELLING_TOKENS') {
    return Object.assign({}, state, {
      loading: false,
      connected: true,
      messages: action.payload
    });
  }
  if (action.type === 'TOKENS_SOLD') {
    return Object.assign({}, state, {
      loading: false,
      connected: true,
      messages: action.payload
    });
  }
  if (action.type === 'TRANSFERRRING_TOKENS') {
    return Object.assign({}, state, {
      loading: false,
      connected: true,
      messages: action.payload
    });
  }
  if (action.type === 'TOKENS_TRANSFERRED') {
    return Object.assign({}, state, {
      loading: false,
      connected: true,
      messages: action.payload
    });
  }

  return state;
};

export default contractReducer;
