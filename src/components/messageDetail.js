import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import sigUtil from 'eth-sig-util'
import ethUtil  from 'ethereumjs-util'

class DetailComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      message: {},
      verifyStatus: 'Not Verified',
      verified: false
    }
  }

  componentDidMount(){

    // get message
    fetch('/api/message/' + this.props.match.params.id)
      .then(response => {
        return response.json()
      })
      .then(response => {
        this.setState({message: response})
      })
      .catch(error => {
        console.log(error)
        this.setState({error: error})
      })
  }


  verifySignature(){
    
    this.setState({
      verifyStatus: 'calculating...',
      calcing: true
    })

    // pause for dramatic effect...
    setTimeout(()=>{
      
      const userAddress = sigUtil.recoverPersonalSignature({
        data: this.state.message.messageParams,
        sig: this.state.message.signature
      })
      const verified = (userAddress === this.state.message.userAddress)

      this.setState({ 
        verifyStatus: verified ? ' ✓' : 'Sender Not Verified',
        verified: verified,
        calcing: false,
        calcUserAddress: userAddress
      })

    }, 1300)

  }

  decodeHex(messageParams){
    return ethUtil.toBuffer(messageParams).toString('utf8')
  }

  etherScanUrl(network, id){
    let url = 'https://'

    // network
    if(network === 'rinkeby'){
      url += 'rinkeby.'
    }
    if(network === 'kovan'){
      url += 'kovan.'
    }
    if(network === 'ropsten'){
      url += 'ropsten.'
    }

    //host
    url += 'etherscan.io/address/' + id

    return url
  }


  render() {
    return(
      
      <div>

        <div>
          <h1> <Link to="/">Demos</Link>&nbsp;><Link to="/chat"> Chat</Link>&nbsp;> Message </h1>
          <hr/>
        </div>

        <h2>Message Data</h2>    

        <label className="label-upper">Decoded Hex Data</label>
        <div className="message-data">
          <p>{this.decodeHex(this.state.message.messageParams)}</p>
        </div>

        <label className="label-upper">Hex Data</label>
        <div className="message-data">
          <p>{this.state.message.messageParams}</p>
        </div>

        <label className="label-upper">Signature</label>
        <div className="message-data">
          <p>{this.state.message.signature}</p>
        </div>

        <h2>Verify Sender</h2>
        <p>You can calculate the user address that created this message to ensure that it has not been tampered with.</p>

        <label className="label-upper">Reported Sender</label>        
        <div className="message-data">
          <p>{this.state.message.userAddress}</p>
        </div>

        <label className="label-upper">Status</label>
        <div className="message-data">
          <p>{this.state.calcUserAddress}{this.state.verifyStatus}
          </p>
        </div>
            
        <button 
          style={{float: 'right'}}
          className="pure-button pure-button-primary"
          disabled={this.state.verified}
          onClick={this.verifySignature.bind(this)}> Verify
        </button>

      </div>
    )
  }
}


export default DetailComponent
