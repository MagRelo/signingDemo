const initialState = {  
  loading: true,
  connected: false,
  messages: []
}

const chatReducer = (state = initialState, action) => {
  if (action.type === 'CHAT_CONNECTED')
  {    
    return Object.assign({}, state, {
      loading: false,
      connected: true,
      messages: action.payload
    })
  }

  return state
}

export default chatReducer
