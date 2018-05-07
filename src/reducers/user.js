import {
  get as getCache, 
  set as setCache, 
  del as clearCache} from '../util/money-clip'
import ethUtil  from 'ethereumjs-util'
import moment from 'moment'

import store from '../store'


// Actions
// ---
export function loadPreferences(){
  return function(dispatch){

    const userAddress = store.getState().user.userAccount
    getCache('prefs-' + userAddress)
      .then(val => {

        // if no 'val' then we don't have a session or it has 
        //  expired => clear out the rest of the session data
        if(!val){                  
          return dispatch({ type: 'LOCAL_PREFS_CLEAR' })
        }

        return dispatch({
          type: 'LOCAL_PREFS_LOAD',
          payload: JSON.parse(val)
        })
      })
  }
}
export function savePreferences(preferences){
  return function(dispatch){

    const userAddress = store.getState().user.userAccount
    setCache('prefs-' + userAddress, JSON.stringify(preferences))
      .then(val => {
        return dispatch({
          type: 'LOCAL_PREFS_LOAD',
          payload: preferences
        })
      })
  }
}
export function clearPreferences(){
  return function(dispatch){

    const userAddress = store.getState().user.userAccount
    clearCache('prefs-' + userAddress)
      .then(val => {
        return dispatch({ type: 'LOCAL_PREFS_CLEAR' })
      })
  }
}



export function savePreferences_server(preferences){
  return function(dispatch){
    
    const web3 = store.getState().web3.instance
    const userAddress = store.getState().user.userAccount

    // prepare the message for signing
    const content = JSON.stringify(preferences)
    const contentHex = ethUtil.bufferToHex(new Buffer(content, 'utf8'))    
    
    // sign message
    web3.currentProvider.sendAsync({
        method: 'personal_sign',
        params: [contentHex, userAddress],
        from: userAddress,
      }, (err, result) => {
        if (err) return console.error(err)
        if (result.error) { return console.log('User denied signature.'); }

        const servesaHeader = {
          'message': contentHex, 
          'signature': result.result
        }

        // fetch
        return fetch('/api/user/preferences', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'x-servesa': JSON.stringify(servesaHeader)
          },
          body: JSON.stringify(preferences)
        })
        .then(response => response.json())
        .then(responseBody => {
          return dispatch({
            type: 'SERVER_PREFS_LOAD',
            payload: responseBody
          })
        })        

      })
  }
}


export function clearPreferences_server(){
  return function(dispatch){
    const web3 = store.getState().web3.instance
    const userAddress = store.getState().user.userAccount

    // prepare the message for signing
    const content = JSON.stringify({action: 'delete user'})
    const contentHex = ethUtil.bufferToHex(new Buffer(content, 'utf8'))    
    
    // sign message
    web3.currentProvider.sendAsync({
        method: 'personal_sign',
        params: [contentHex, userAddress],
        from: userAddress,
      }, (err, result) => {
        if (err) return console.error(err)
        if (result.error) { return console.log('User denied signature.'); }

        const servesaHeader = {
          'message': contentHex, 
          'signature': result.result
        }

        // fetch
        return fetch('/api/user/delete', {
          method: 'DELETE',
          headers: {
            'x-servesa': JSON.stringify(servesaHeader)
          }
        })
        .then(response => response.json())
        .then(responseBody => {
          return dispatch({
            type: 'SERVER_PREFS_CLEAR'
          })
        })        

      })
  }
}



export function loadSession(){
  return function(dispatch){

    const userAddress = store.getState().user.userAccount
    getCache('session-' + userAddress)
      .then(val => {

        // if no 'val' then we don't have a session or it has 
        //  expired => clear out the rest of the session data
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

export function clearSession(){
  return function(dispatch){
    
    const userAddress = store.getState().user.userAccount
    clearCache('session-' + userAddress)
      .then(() => {        
        return dispatch({ type: 'SESSION_CLEAR' })
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
        setCache('session-' + userAddress, JSON.stringify(sessionData), {'staleAfter': staleAfter})
          .then(val => {
            return dispatch({
              type: 'SESSION_LOAD',
              payload: sessionData
            })
          })

      })
  }
}


// Reducers
// ---
const initialState = {
  userAccount: '',
  text: 'medium',
  theme: 'light', 
  clientSaved: false, 
  message: '', 
  signature: '', 
  duration: 0,
  expires: null  
}

const userReducer = (state = initialState, action) => {  
  if (action.type === 'WEB3_INITIALIZED'){    
    return Object.assign({}, state, {'userAccount': action.payload.accounts[0]})
  }
  
  if (action.type === 'LOCAL_PREFS_LOAD'){    
    return Object.assign({}, state, action.payload, {clientSaved: true})
  }
  if (action.type === 'LOCAL_PREFS_CLEAR'){    
    return Object.assign({}, state, action.payload, {
      clientSaved: false,
      theme: 'light',
      text: 'medium'
    })
  }

  if (action.type === 'SERVER_PREFS_LOAD'){    
    return Object.assign({}, state, action.payload, {serverSaved: true})
  }
  if (action.type === 'SERVER_PREFS_CLEAR'){    
    return Object.assign({}, state, {serverSaved: false})
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
