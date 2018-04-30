import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import ethUtil  from 'ethereumjs-util'

import MessageList from './messageList'
import MessageForm from './messageForm';


import composeIcon from '../icon/compose-outline.svg'

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



  submitMessage(content){

    const web3 = this.props.web3
    const userAddress = this.props.account

    const msg = ethUtil.bufferToHex(new Buffer(content, 'utf8'))
    const params = [msg, userAddress]

    console.group('Digital Signature');
    console.log('Message:')
    console.dir(params)

    web3.currentProvider.sendAsync({
        method: 'personal_sign',
        params: params,
        from: userAddress,
      }, function (err, result) {
        if (err) return console.error(err)
        if (result.error) return console.error(result.error.message)

        console.log('Signature: ')
        console.log(result.result)
        console.groupEnd();

        // send to server
        console.log('fetch!');        
        
      })

    this.setState({formOpen: false})
  }

  render() {
    return(


      <div style={{
        display: 'grid',
        gridColumn: '1fr',
        gridRow: 'auto 1fr auto'}}>

        <h1>
          <Link to="/">Home</Link>&nbsp;> Chat          
        </h1>
                        
        <MessageList list={this.state.messages}/>
          
        <MessageForm 
          web3={this.props.web3} 
          account={this.props.account} 
          submit={this.submitMessage.bind(this)}/>
        
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    web3: state.web3.instance,
    account: state.web3.accounts[0] || ''
  }
}
export default connect(mapStateToProps)(ChatContainer)
