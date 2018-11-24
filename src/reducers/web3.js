const initialState = {
  loading: true,
  instance: null,
  accounts: [],
  network: ''
};

const web3Reducer = (state = initialState, action) => {
  if (action.type === 'WEB3_INITIALIZED') {
    return Object.assign({}, state, {
      loading: false,
      instance: action.payload.instance,
      accounts: action.payload.accounts,
      network: action.payload.network
    });
  }

  if (action.type === 'SHOW_TIP') {
    return Object.assign({}, state, action.payload);
  }

  return state;
};

export default web3Reducer;
