import React, { Component } from 'react'
import {Link} from 'react-router-dom'

import MessageList from './messageList'
import MessageForm from './messageForm';

// sockets
import io from 'socket.io-client';
let chatSocket
let intervalId = 0

class ChatContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      messages: [],
      content: '' 
    }
  }

  // lifecycle
  componentWillMount(){

    // connect message sockets
    chatSocket = io('/');
    chatSocket.on('connect', data =>{ console.log('chat connected')})
    chatSocket.on('update', this.updateData.bind(this))

    chatSocket.on('reconnecting', this.reconnectError.bind(this))
    chatSocket.on('error', this.socketError.bind(this))
    chatSocket.on('disconnect', this.socketError.bind(this))
    chatSocket.on('connect_failed', this.socketError.bind(this))
    chatSocket.on('reconnect_failed', this.socketError.bind(this))
  
  }
  componentWillUnmount() {
    chatSocket.disconnect()
  }

  // socket handlers
  updateData(data){
    this.setState({messages: data})
  }
  socketError(error){
    console.log(error)
    this.setState({error: error})
  }  
  reconnectError(data){
    if(data > 5){
      chatSocket.disconnect()
      clearInterval(intervalId)
      console.log('disconnecting')
    } else {
      console.log('reconnection attempts: ', data)
    }
  }

  emitMessage(message, signature, content){
    chatSocket.emit('message', {
      message: message,
      signature: signature,
      content: content
    })
  }

  render() {
    return(

      <div style={{
        display: 'grid',
        gridTemplateRows: 'auto 1fr auto',
        height: '100%'
      }}>

        <div>
          <h1> <Link to="/">Demos</Link>&nbsp;> Chat </h1>
          <hr/>
        </div>
        
                        
        <MessageList list={this.state.messages}/>
          
        <MessageForm emitMessage={this.emitMessage.bind(this)}/>
        
      </div>
    )
  }
}

export default ChatContainer
