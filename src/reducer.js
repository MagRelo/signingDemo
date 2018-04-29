import { combineReducers } from 'redux'

// import { routerReducer } from 'react-router-redux'
import web3Reducer from './reducers/web3'
import chatReducer from './reducers/chat'
import userReducer from './reducers/user'
// user

const reducer = combineReducers({
  // routing: routerReducer,
  chat: chatReducer,
  web3: web3Reducer,
  user: userReducer
})

export default reducer
