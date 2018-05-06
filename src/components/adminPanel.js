import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import ethUtil  from 'ethereumjs-util'



class AdminComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      alert: false,
      error: ''
    }
  }

  // Sign message and send to server
  submitAction(event){
    event.preventDefault()

    const web3 = this.props.web3
    const userAddress = this.props.account    

    // prepare the message for signing
    const content = `{"action": "${event.target.name}"}`
    const contentAsHex = ethUtil.bufferToHex(new Buffer(content, 'utf8'))    
    
    // sign message
    web3.currentProvider.sendAsync({
        method: 'personal_sign',
        params: [contentAsHex, userAddress],
        from: userAddress,
      }, (err, result) => {
        if (err) return console.error(err)
        if (result.error) {   
          return this.setState({alert: true, error: "User denied signature."})
        }
        
        const servesaHeader = JSON.stringify({
          message: contentAsHex,
          signature: result.result
        })
          
        return fetch('/api/messages/delete', {
          method: 'POST',
          headers: {'x-servesa': servesaHeader}
        })
        .then(response => {
          if(response.status === 401){
            return this.setState({alert: true, caption: '401 - Unauthorized'})
          }

          return this.setState({alert: true, caption: 'sucess!'})
        })
        
      })    
  }

  render() {
    return(
      <div>

        <h1>
          <Link to="/">Demos</Link> &nbsp;> Admin Panel          
        </h1>

        <hr/>

        <div>
          <button
              name="delete"
              type="button"
              className="pure-button pure-button-primary"
              onClick={this.submitAction.bind(this)}>Delete all messages
            </button>
        </div>

        {this.state.alert ? 

          <div style={{border: 'solid lightgray 1px', marginTop: '1em', padding: '0.5em'}}>            
            <h3>{this.state.caption}</h3>
            <button 
              className="pure-button"
              onClick={()=>{this.setState({alert: false})}}>Ok
            </button>
          </div>        

        :null}

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
export default connect(mapStateToProps)(AdminComponent)
