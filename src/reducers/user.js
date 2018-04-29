const initialState = {
  userAccount: '1234',
  sessionData: null,
  textColor: 'default',
  bgColor: 'default'
}

const userReducer = (state = initialState, action) => {
  if (action.type === 'WEB3_INITIALIZED')
  {    
    return Object.assign({}, state, {
      userAccount: action.payload.accounts[0]      
    })    
  }

  return state
}

export default userReducer
