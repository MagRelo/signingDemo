import { combineReducers } from 'redux';

import web3Reducer from './reducers/web3';
import contractReducer from './reducers/contract';
import userReducer from './reducers/user';

const reducer = combineReducers({
  contract: contractReducer,
  web3: web3Reducer,
  user: userReducer
});

export default reducer;
