import React, { Component } from 'react'
import { Switch, Route, Link, withRouter } from 'react-router-dom'


import Chat from './chat';
import Detail from './detail';


// Fonts
import '../css/open-sans.css'
import '../css/michroma.css'
import '../css/barlow.css'

// Pure css
import '../css/pure-min.css'
import '../css/grids-responsive-min.css'

// App css
import '../App.css'

import githubLogo from '../icon/GitHub-Mark-Light-32px.png'


// Initialize web3 and set in Redux.
import getWeb3 from '../web3.js'

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
              <a href="https://github.com/MagRelo/signingDemo" target="_blank" rel="noopener noreferrer" className="pure-menu-link">
                <img alt="github logo" className="header-logo" src={githubLogo}></img>
              </a>
            </li>
          </ul>
        </nav>

        <div className="container">
          
          <div style={{gridRow: '1', gridColumn:'1 / 2'}}>            
            <h1>Chat Demo</h1>            

            {this.props.location.pathname !== '/chat' ?               
              <Link to="/chat" className="pure-button pure-button-primary breadcrumb">
                ◀ chat
              </Link>
            :null}            

            <hr></hr>
          </div>
          
          {this.state.loading ?         
                
            <div className="loader">                  
              <div className="spinner"></div>
              <label>loading web3...</label>
              <p>Web3: {this.state.web3 ? '✓' : '✘'} </p>
              <p>Network: {this.state.web3 ? '✓ (' + this.state.network + ')' : '✘'}</p>
              <p>Account: {this.state.account ? this.state.account.substring(0,8) + '...' : '✘'} </p>
            </div>
              
          : 

            <Switch>

              <Route path="/message/:id" 
                render={props =>{

                  return <div style={{gridRow: '2', gridColumn:'1 / 2'}}>
                    <Detail network={this.state.network} id={props.match.params.id}/>
                  </div>                    
                }}>
              </Route>

              <Route path="/chat" 
                render={()=>{
                  return <div style={{gridRow: '2', gridColumn:'1 / 2', overflow: 'scroll'}}>
                    <Chat web3={this.state.web3} account={this.state.account} network={this.state.network}/>
                  </div>                    
                }}>
              </Route>

            </Switch>

          }

        </div>
      </div>
    );
  }
}

const AppWithRouter = withRouter(App)
export default AppWithRouter;

