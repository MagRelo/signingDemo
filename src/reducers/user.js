import {
  get as getCache, 
  set as setCache, 
  clear as clearCache} from 'money-clip'
import ethUtil  from 'ethereumjs-util'
import moment from 'moment'

import store from '../store'


// Actions
// ---
export function loadSession(){
  return function(dispatch){

    const userAddress = store.getState().user.userAccount

    getCache(userAddress)
      .then(val => {

        // clear the session
        if(!val){                  
          return dispatch({ type: 'SESSION_CLEAR' })
        }

        return dispatch({
          type: 'SESSION_LOAD',
          payload: JSON.parse(val)
        })
      })
  }
}

export function saveSession(duration){
  return function(dispatch){
    
    const web3 = store.getState().web3.instance
    const userAddress = store.getState().user.userAccount

    // calculate expiration
    const expiration = moment().add(duration, 'minutes');

    // prepare the message for signing
    const content = `{"expires": "${expiration.toISOString()}"}`
    const contentHex = ethUtil.bufferToHex(new Buffer(content, 'utf8'))    
    
    // sign message
    web3.currentProvider.sendAsync({
        method: 'personal_sign',
        params: [contentHex, userAddress],
        from: userAddress,
      }, (err, result) => {
        if (err) return console.error(err)
        if (result.error) { return console.log('User denied signature.'); }

        const sessionData = {
          'message': contentHex, 
          'signature': result.result, 
          'duration': duration,
          'expires': expiration.toISOString()     
        }

        // save session to IndexedDB
        const staleAfter = Date.now() + (duration * 60 * 1000)
        setCache(userAddress, JSON.stringify(sessionData), {'staleAfter': staleAfter})
          .then(val => {
            return dispatch({
              type: 'SESSION_LOAD',
              payload: sessionData
            })
          })

      })
  }
}

export function clearSession(){
  return function(dispatch){
    
    const userAddress = store.getState().user.userAccount
    clearCache(userAddress)
      .then(() => {        
        return dispatch({
          type: 'SESSION_CLEAR'
        })
      })    
  }
}



// Reducers
// ---
const initialState = {
  userAccount: '1234',
  avatar: '',
  textColor: 'default',
  bgColor: 'default'  ,
  message: '', 
  signature: '', 
  duration: 0,
  expires: null
}
const userReducer = (state = initialState, action) => {  
  if (action.type === 'WEB3_INITIALIZED'){    
    return Object.assign({}, state, {'userAccount': action.payload.accounts[0]})
  }
  if (action.type === 'SESSION_LOAD'){    
    return Object.assign({}, state, action.payload)
  }
  if (action.type === 'SESSION_CLEAR'){    
    return Object.assign({}, state, {
      message: '', 
      signature: '', 
      duration: 0,
      expires: null
    })    
  }

  return state
}

export default userReducer
