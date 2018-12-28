const initialState = {
  web3Ready: false,
  accountsReady: false,
  contractsReady: true,
  contractDataReady: false,
  networkReady: true,

  showTip: false,
  instance: null,
  accounts: [],
  network: '',
  balance: 0
};

const web3Reducer = (state = initialState, action) => {
  if (action.type === 'WEB3_INITIALIZED') {
    return Object.assign({}, state, {
      web3Ready: true,
      instance: action.payload.instance,
      network: action.payload.network,
      // networkReady: action.payload.network === 'pragma-testnet',
      accounts: action.payload.accounts,
      accountsReady: !!action.payload.accounts.length,
      balance: action.payload.balance
    });
  }

  // if (action.type === 'UPDATE_DATA') {
  //   return Object.assign(
  //     {},
  //     state,
  //     { contractDataReady: true },
  //     action.payload.contracts
  //   );
  // }

  // if (action.type === 'CONTRACTS_INITIALIZED') {
  //   return Object.assign({}, state, {
  //     monetaryPolicy: action.payload.monetaryPolicy,
  //     priceFeed: action.payload.priceFeed,
  //     bondAuction: action.payload.bondAuction,

  //     fifs: action.payload.fifs,
  //     registry: action.payload.registry,
  //     resolver: action.payload.resolver,
  //     reverseregistry: action.payload.reverseregistry,
  //     reverseresolver: action.payload.reverseresolver,
  //     contractsReady: true
  //   });
  // }

  if (action.type === 'SHOW_TIP') {
    return Object.assign({}, state, action.payload);
  }

  return state;
};

export default web3Reducer;
