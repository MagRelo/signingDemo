import React, { Component } from 'react'

class AdminComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      content: '' 
    }
  }

  render() {
    return(                      
      <div className="loader">                  
        
        <div className="spinner"></div>

        <label>loading web3...</label>
        <p>Web3: {this.props.web3 ? '✓' : '✘'} </p>
        <p>Network: {this.props.web3 ? '✓ (' + this.props.web3.network + ')' : '✘'}</p>
        <p>Account: {this.props.account ? this.props.account.substring(0,8) + '...' : '✘'} </p>

      </div>
    )
  }
}


export default AdminComponent
