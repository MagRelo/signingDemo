import React, { Component } from 'react'

class AdminComponent extends Component {

  render() {
    return(                      
      <div className="loader">                  
        
        <label>loading...</label>      
        
        <div className="spinner"></div>        

        {!this.props.web3 ? 
          <div>
            <p>Web3: ✘ </p>
            <p>web3 is not available. This site requires a browser that supports web3</p>
          </div> 
        :null}

        {this.props.web3 && !this.props.account ? 
          <div>
            <p>Web3: {this.props.web3 ? '✓' : '✘'} </p>
            <p>Network: {this.props.web3 ? '✓ (' + this.props.network + ')' : '✘'}</p>
            <p>Account: {this.props.account ? this.props.account.substring(0,8) + '...' : '✘'} </p>
            <p>Your account is not available. You may need to unlock your account.</p>
          </div> 
        :null}

      </div>
    )
  }
}


export default AdminComponent
