import React, { Component } from 'react'

// Fonts
import './css/open-sans.css'
import './css/michroma.css'
import './css/barlow.css'

// Pure css
import './css/pure-min.css'
import './css/grids-responsive-min.css'

// App css
import './App.css'
import githubLogo from './icon/GitHub-Mark-Light-32px.png'

class App extends Component {
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
              <a href="https://github.com/MagRelo/signingDemo" target="_blank" rel="noopener noreferrer" className="pure-menu-link">
                <img alt="github logo" className="header-logo" src={githubLogo}></img>
              </a>
            </li>
          </ul>
        </nav>

        <div className="container">
          
          {this.props.web3 ?         
                
            <div className="loader">                  
              <div className="spinner"></div>
              <label>loading web3...</label>
              <p>Web3: {this.props.web3.instance ? '✓' : '✘'} </p>
              <p>Network: {this.props.web3 ? '✓ (' + this.props.web3.network + ')' : '✘'}</p>
              <p>Account: {this.props.web3.account ? this.props.web3.account.substring(0,8) + '...' : '✘'} </p>
            </div>
              
          : 

            <div>{this.props.children}</div>

          }          

        </div>
      </div>
    );
  }
}

export default App;

