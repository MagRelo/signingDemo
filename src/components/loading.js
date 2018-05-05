import React, { Component } from 'react'

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

        {!this.props.web3 ? 
          <div>
            <p>Web3: ✘ </p>
            {this.state.showTip ? 
              <p>web3 is not available. This site requires a browser that supports web3.</p>
            :null}            
          </div> 
        :null}

        {this.props.web3 && !this.props.account ? 
          <div>
            <p>Web3: {this.props.web3 ? '✓' : '✘'} </p>
            <p>Network: {this.props.web3 ? '✓ (' + this.props.network + ')' : '✘'}</p>
            <p>Account: {this.props.account ? this.props.account.substring(0,8) + '...' : '✘'} </p>

            {this.state.showTip ? 
              <p>Your account is not available. You may need to unlock your account.</p>
            :null}
            
          </div> 
        :null}

      </div>
    )
  }
}


export default AdminComponent
