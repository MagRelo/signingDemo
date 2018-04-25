import React, { Component } from 'react'
import {Link} from 'react-router-dom'

import MessageList from './messageList.js'
import ChatForm from './chatForm';

// sockets
import io from 'socket.io-client';
let chatSocket
let intervalId = 0

class FormComponent extends Component {
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
    chatSocket.on('connect', data =>{ console.log('Game connected')})
    chatSocket.on('update', this.updateData.bind(this))

    chatSocket.on('reconnecting', this.reconnectError.bind(this))
    chatSocket.on('error', this.socketError.bind(this))
    chatSocket.on('disconnect', this.socketError.bind(this))
    chatSocket.on('connect_failed', this.socketError.bind(this))
    chatSocket.on('reconnect_failed', this.socketError.bind(this))
  
  }
  componentWillUnmount() {
    // chatSocket.disconnect()
  }

  // socket handlers
  updateData(data){
    // console.log(data)
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

  render() {
    return(


      <div>

        <h1>
          <Link to="/">Home</Link> &nbsp;> Chat
        </h1>
        <hr/>

        <MessageList list={this.state.messages}/>

        {this.state.formOpen ? 
          <div>
            <button className="pure-button" onClick={()=>{this.setState({formOpen: !this.state.formOpen})}}>close</button>
            <ChatForm web3={this.props.web3} account={this.props.account}/>
          </div>
        :
          <button className="pure-button pure-button-primary compose-button" onClick={()=>{this.setState({formOpen: !this.state.formOpen})}}>compose</button>
        }
        
      </div>
    )
  }
}


export default FormComponent
