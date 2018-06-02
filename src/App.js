import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import Loader from './components/loading.js';

// Fonts
import './css/open-sans.css';
import './css/michroma.css';
import './css/barlow.css';

// Pure css
import './css/pure-min.css';
import './css/grids-responsive-min.css';

// App css
import './App.css';
import githubLogo from './icon/GitHub-Mark-Light-32px.png';

// routing
import Home from './components/home';
import Contract from './components/contract';
import List from './components/list';
import Create from './components/create';
import Account from './components/account';

class App extends Component {
  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
          <div className="logo-holder">
            <div className="logo">
              <div style={{ backgroundColor: '#ff5935', height: '8px' }} />
              <div style={{ backgroundColor: 'white', height: '6px' }} />
              <div style={{ backgroundColor: '#17799d', height: '9px' }} />
            </div>
          </div>

          <Link className="pure-menu-heading pure-menu-link" to="/">
            Servésa
          </Link>

          <ul className="pure-menu-list navbar-right">
            <li className="pure-menu-item">
              <Link className="pure-menu-link" to="/account">
                My Account
              </Link>
            </li>
            <li className="pure-menu-item">
              <Link className="pure-menu-link" to="/search">
                Search
              </Link>
            </li>
          </ul>
        </nav>

        <div className="container" style={{ fontSize: this.props.fontSize }}>
          {!this.props.web3 || !this.props.account ? (
            <Loader
              web3={this.props.web3}
              account={this.props.account}
              network={this.props.network}
            />
          ) : (
            <Switch>
              <Route path="/profile/mattlovan" component={Contract} />
              <Route path="/team/12309" component={Contract} />

              <Route path="/contract/:id" component={Contract} />
              <Route path="/search" component={List} />
              <Route path="/create" component={Create} />
              <Route path="/account" component={Account} />
              <Route component={Home} />
            </Switch>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    web3: state.web3.instance,
    account: state.web3.accounts[0] || '',
    network: state.web3.network,
    fontSize: state.user.text,
    theme: state.user.theme
  };
};

export default withRouter(connect(mapStateToProps)(App));
