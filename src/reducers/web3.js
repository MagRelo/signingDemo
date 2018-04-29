const initialState = {
  loading: 'pasta',
  instance: null,
  accounts: [],
  network: ''
}

const web3Reducer = (state = initialState, action) => {
  if (action.type === 'WEB3_INITIALIZED')
  {

    console.log('web3 init in redux');
    console.log(action.payload);    
    
    return Object.assign({}, state, {
      loading: false,
      instance: action.payload.instance,
      accounts: action.payload.accounts,
      network: action.payload.network
    })
    
  }

  return state
}

export default web3Reducer
