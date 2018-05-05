import React, { Component } from 'react'

import Checkmark from './checkmark'

let timer = null

class AdminComponent extends Component {
  constructor(props){
    super(props)

    this.state = {
      showTip: false
    }
  }

  componentDidMount(){
    timer = setTimeout(()=>{
      this.setState({showTip: true})
    }, 4000)
  }
  componentWillUnmount(){
    clearTimeout(timer)
  }

  
  render() {
    return(                      
      <div className="loader">                  
        
        {!this.state.showTip ? 
          <div>
            <label>loading...</label>              
            <div className="spinner"></div>        
          </div>
        :null}         

        <p>Web3: <Checkmark boolean={this.props.web3}/> </p>
        <p>Network: <Checkmark boolean={this.props.network}/></p>
        <p>Account: <Checkmark boolean={this.props.account}/></p>
        
        {!this.props.web3 && this.state.showTip ? 
          <p>web3 is not available. This application requires a browser that supports web3.</p>
        :null}
        {this.props.web3 && !this.props.account && this.state.showTip ? 
          <p>Your account is not available. You may need to unlock your account.</p>
        :null}

      </div>
    )
  }
}


export default AdminComponent
