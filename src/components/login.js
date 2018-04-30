import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import ethUtil  from 'ethereumjs-util'



class LoginComponent extends Component {
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

        // send to server
        console.log('fetch!');                
      })

  }

  render() {
    return(
      <div>

        <h1>
          <Link to="/">Home</Link>&nbsp;> Login         
        </h1>

        <hr/>

        {this.state.alert ? 

          <div style={{border: 'solid pink 1px', padding: '0.5em'}}>            
            <p>{this.state.error}</p>
            <button 
              className="pure-button"
              onClick={()=>{this.setState({alert: false})}}>Ok
            </button>
          </div>        

        :null}

        <h2>Create Session Token</h2>

        <form className="pure-form">
        <fieldset>
            <button
              name="10"
              type="button"
              className="pure-button pure-button-primary"
              onClick={this.submitAction.bind(this)}>10 minutes
            </button>
          </fieldset>
          <fieldset>
            <button
              name="30"
              type="button"
              className="pure-button pure-button-primary"
              onClick={this.submitAction.bind(this)}>30 minutes
            </button>
          </fieldset>
          <fieldset>
            <button
              name="90"
              type="button"
              className="pure-button pure-button-primary"
              onClick={this.submitAction.bind(this)}>90 minutes
            </button>
          </fieldset>

        </form>

      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    web3: state.web3.instance,
    account: state.web3.accounts[0] || '',
    userSession: state.user.sessionData
  }
}
export default connect(mapStateToProps)(LoginComponent)
