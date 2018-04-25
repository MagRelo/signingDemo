import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import ethUtil  from 'ethereumjs-util'


class AdminComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      content: '' 
    }
  }

  // lifecycle
  componentWillMount(){ 
  }
  componentWillUnmount() {
  }

  // Form functions
  submitMessage(event){
    event.preventDefault()

    const web3 = this.props.web3
    const userAddress = this.props.account
    const content = this.state.content

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

    this.setState({content: ''})
  }

  render() {
    return(
      <div>

        <h1>
          <Link to="/">Home</Link> &nbsp;> Admin Panel          
        </h1>        
        <hr/>

        <form className="pure-form">

          <fieldset>
            <label>Restart Server</label>
            <button
              className="pure-button pure-button-primary"
              disabled={!this.state.content}
              onClick={this.submitMessage.bind(this)}>Restart
            </button>
          </fieldset>

          <fieldset>
            <label>Redeploy Code</label>
            <button
              className="pure-button pure-button-primary"
              disabled={!this.state.content}
              onClick={this.submitMessage.bind(this)}>Redeploy
            </button>
          </fieldset>

          <fieldset>
            <label>Stop server</label>
            <button
              className="pure-button pure-button-primary"
              disabled={!this.state.content}
              onClick={this.submitMessage.bind(this)}>Stop
            </button>
          </fieldset>

        </form>

      </div>
    )
  }
}


export default AdminComponent
