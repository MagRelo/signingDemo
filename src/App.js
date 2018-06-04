import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Link, NavLink } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

// Fonts
import './css/open-sans.css';
import './css/michroma.css';
import './css/barlow.css';

// Pure css
import './css/pure-min.css';
import './css/grids-responsive-min.css';

// App css
import './App.css';

// routing
import Home from './components/home';
import List from './components/list';
import Account from './components/account';
import Contract from './components/contract';
import Create from './components/forms/createForm';

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
              <NavLink
                className="pure-menu-link"
                to="/account"
                activeStyle={{ color: '#FF5934' }}
              >
                My Account
              </NavLink>
            </li>
            <li className="pure-menu-item">
              <NavLink
                className="pure-menu-link"
                to="/search"
                activeStyle={{ color: '#FF5934' }}
              >
                Search
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="container">
          <Switch>
            <Route path="/profile/mattlovan" component={Contract} />
            <Route path="/team/12309" component={Contract} />

            <Route path="/contract/:id" component={Contract} />
            <Route path="/search" component={List} />
            <Route path="/create" component={Create} />
            <Route path="/account" component={Account} />
            <Route component={Home} />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    web3: state.web3.instance,
    account: state.web3.accounts[0] || '',
    network: state.web3.network
  };
};

export default withRouter(connect(mapStateToProps)(App));
