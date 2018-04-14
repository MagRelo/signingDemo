import React, { Component } from 'react'

// sockets
import io from 'socket.io-client';
let chatSocket
let intervalId = 0

class FormComponent extends Component {
  constructor(props) {
    super(props)

    // connect to game
    chatSocket = io('http://localhost:8080');

    chatSocket.on('error', this.socketError.bind(this))
    // gameSocket.on('disconnect', this.socketError)
    // gameSocket.on('connect_failed', this.socketError)
    // gameSocket.on('reconnect_failed', this.socketError)
    chatSocket.on('reconnecting', this.reconnectError.bind(this))
    chatSocket.on('connect', data =>{

      chatSocket.emit('requestData')
      console.log('Game connected')
    })

    chatSocket.on('update', this.updateData.bind(this))

    this.state = {
      messages: [],
      formState: 'ready',
      content: '' 
    }
  }

  // lifecycle
  componentDidMount(){
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

  // Form functions
  handleChange(event) {
    event.preventDefault()
    this.setState({[event.target.name]: event.target.value})
  }

  submitMessage(event){
    event.preventDefault()

    const web3 = this.props.web3
    const userAddress = this.props.account
    const content = this.state.content

    const msgParams = [
      {
        name: 'content',
        type: 'string',
        value: content
      }
    ]

    console.group('Digital Signature');
    console.log('Message:')
    console.dir(msgParams)

    web3.currentProvider.sendAsync({
        method: 'eth_signTypedData',
        params: [msgParams, userAddress],
        from: userAddress,
      }, function (err, result) {
        if (err) return console.error(err)
        if (result.error) return console.error(result.error.message)

        console.log('Signature: ')
        console.log(result.result)
        console.groupEnd();

        // send to server
        chatSocket.emit('message', {
          message: msgParams,
          signature: result.result
        })
      })

    this.setState({content: ''})

  }

  render() {
    return(

      <div style={{
        height: '100%', 
        gridRow: '2', 
        gridColumn:'1 / 2',
        display: 'grid', 
        gridTemplateColumns: '1fr', 
        gridTemplateRows: '1fr auto'}}>

        <div className="grey-border" style={{gridRow: '1', gridColumn:'1 / 2', overflow: 'scroll'}}>

          <ul className="chat-list">          
            {this.state.messages.map( message => {
              return <li key={message._id}>                  
                  <label>
                    {message.userAddress.substring(0,8)}
                  </label>
                  {message.content}
                </li>
            })}          
          </ul>
          
        </div>

        <div style={{gridRow: '2', gridColumn:'1 / 2'}}>

          <form className="pure-form chat-form">
            <textarea 
              rows="4"
              className="pure-input"
              placeholder="type here..."
              value={this.state.content}
              name="content"
              onChange={this.handleChange.bind(this)}/>

            <button 
              style={{float: 'right', marginTop: '0.5em'}} 
              className="pure-button pure-button-primary pure-button-xlarge"
              disabled={!this.state.content}
              onClick={this.submitMessage.bind(this)}>Send</button>

          </form>

        </div>

      </div>
    )
  }
}


export default FormComponent
