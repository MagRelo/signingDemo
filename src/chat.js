import React, { Component } from 'react'

import settingsIcon from './icon/gear-icon.svg'

// sockets
import io from 'socket.io-client';
let chatSocket
let intervalId = 0

const loremIpsum = `Lorem ipsum dolor sit amet, deserunt gloriatur consetetur nam ut, harum numquam ex vim. Pri tale iisque oportere ad, ius fabulas scaevola ei. Ad est omnium nonumes. Mea postulant reprimique in, in euismod accusata moderatius vim, mel atqui quaerendum no.
Ad ridens numquam vis, putant tritani minimum eum no. Cum at aeterno consectetuer. Eu vim adhuc audiam prompta. Mea alia graeci eu, verear commodo ad vis.`
const hindiIpsum = `आधुनिक सभिसमज विशेष अपनि नवंबर सके। तकनिकल वास्तव यायेका बारे स्थिति हुआआदी भाषाओ जागरुक अन्तरराष्ट्रीयकरन करती चुनने नाकर विकसित हार्डवेर अर्थपुर्ण बाटते डाले। जाने पासपाई विभाजन परिभाषित ब्रौशर जागरुक दर्शाता बनाकर कलइस सभीकुछ दर्शाता केन्द्रित आजपर बढाता`
const chineseIpsum = `点志友池達図獲正終罪業定越運左強。栄線日市賀暮第北能聞局悪意。最場告量全巨毛芸草歳数宿帯。査橋見正図身敵文提弁行止高政集覧厳記一愛。古囲少軽計民済載指三文流細。報費井調変克広同思際上田勢古手対括。取囲北受気売早匿属歩篠熱空港転断無。北抗届題企州無交犯理文質負般十当間浜。志計要見将職朝善質玉格更`


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
    this.scrollToBottom();
  }
  componentDidUpdate() {
    this.scrollToBottom();
  }
  componentWillUnmount() {
    chatSocket.disconnect()
  }

  // https://stackoverflow.com/questions/37620694/how-to-scroll-to-bottom-in-react
  scrollToBottom() {
    this.el.scrollIntoView({ behavior: 'smooth' });
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

    if(event.target.value === 'li:'){
      event.target.value = loremIpsum
    }
    if(event.target.value === 'hi:'){
      event.target.value = hindiIpsum
    }   
    if(event.target.value === 'ci:'){
      event.target.value = chineseIpsum
    }   

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


  // <a href="/">
  //   <img alt="settings menu icon" className="settings-icon" src={settingsIcon}></img>
  // </a>


  render() {
    return(

      <div style={{
        height: '100%', 
        gridRow: '2', 
        gridColumn:'1 / 2',
        display: 'grid', 
        gridTemplateColumns: '1fr', 
        gridTemplateRows: '1fr auto auto'}}>

        <div className="grey-border" style={{gridRow: '1', gridColumn:'1 / 2', overflow: 'scroll'}}>

          <ul id="message-list" className="chat-list">          
            {this.state.messages.map( message => {
              return <li key={message._id}>                  
                  <label className="account-label">
                    {message.userAddress.substring(0,8)}
                  </label>
                  {message.content}
                </li>
            })}          
          </ul>

          <div ref={el => { this.el = el; }} />
          
        </div>

        <div className="grey-border top" style={{gridRow: '2', gridColumn:'1 / 2', padding: '0.5em', marginTop: '0.5em'}}>

          <span>Account: </span>
          <label className="account-label">
            {this.props.account.substring(0,8)}
          </label>

        </div>

        <div style={{gridRow: '3', gridColumn:'1 / 2'}}>

          <form className="pure-form chat-form">

            <textarea 
              rows="4"
              className="pure-input"
              placeholder="(type li:, hi:, or ci: for lorum ipsum)"
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
