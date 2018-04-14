import React, { Component } from 'react';
// import StayScrolled from 'react-stay-scrolled'

import Chat from './chat.js'

import settingsIcon from './icon/gear-icon.svg'


// Fonts
import './css/open-sans.css'
import './css/michroma.css'
import './css/barlow.css'

import './css/pure-min.css'
import './css/grids-responsive-min.css'
// import 'medium-editor/dist/css/medium-editor.css'
// import 'medium-editor/dist/css/themes/default.css'

import './App.css'

// Initialize web3 and set in Redux.
import getWeb3 from './web3.js'

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      loading: true,
      error: false,
      web3: null,
      network: '',
      account: '',
    }
  }

  // lifecycle
  componentDidMount(){

    // get web3
    getWeb3
      .then(response => {
        this.setState({
          web3: response.web3Instance,
          network: response.network,
          account: response.accounts[0] || '',
          loading: !(!!response.web3Instance && !!response.accounts[0])
        })

      })
      .catch(error => {
        this.setState({ error: true })
      })

  }

  render() {
    return (
      <div className="App">

        <nav className="navbar pure-menu pure-menu-horizontal">
          <div className="logo-holder">
            <div className="logo">
              <div style={{'backgroundColor': '#ff5935', height: '8px'}}></div>
              <div style={{'backgroundColor': 'white', height: '6px'}}></div>
              <div style={{'backgroundColor': '#17799d', height: '9px'}}></div>
            </div>
          </div>

          <a href="/" className="pure-menu-heading pure-menu-link"> Servésa </a>

          <ul className="pure-menu-list navbar-right">
            <li className="pure-menu-item">
                <a href="/" className="pure-menu-link"> G </a>
            </li>
              <li className="pure-menu-item">
                <a href="/" className="pure-menu-link"> M </a>
            </li>
              <li className="pure-menu-item">
                <a href="/" className=" pure-menu-link"> S </a>
            </li>
          </ul>
        </nav>

        <div className="container">
          
          <div style={{gridRow: '1', gridColumn:'1 / 2'}}>
            
            <a href="/">
              <img alt="settings menu icon" className="settings-icon" src={settingsIcon}></img>
            </a>
            <h1>Chat Demo</h1>
            
          </div>
          
          <div style={{gridRow: '2', gridColumn:'1 / 2', overflow: 'hidden'}}>
            {this.state.loading ?         
                
                <div className="loader">                  
                  <div className="spinner"></div>
                  <label>loading web3...</label>
                  <p>Web3: {this.state.web3 ? '✓' : '✘'} </p>
                  <p>Network: {this.state.web3 ? '✓ (' + this.state.network + ')' : '✘'}</p>
                  <p>Account: {this.state.account ? this.state.account.substring(0,8) + '...' : '✘'} </p>
                </div>
                
              : 
                      
                <Chat 
                  web3={this.state.web3} 
                  network={this.state.network} 
                  account={this.state.account}/>
            }
          </div>

        </div>
      </div>
    );
  }
}

export default App;

