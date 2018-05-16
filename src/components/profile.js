import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { loadSession, saveSession, clearSession } from '../reducers/user';

import MessageForm from './messageForm';

const rowGrid = {
  display: 'grid',
  gridTemplateRows: '1fr',
  gridTemplateColumns: '1fr 1fr 1fr',
  margin: '0.5em 0 1em'
};

const dummyData = {
  name: 'Matt Lovan',
  position: 'Web Architect',
  intro: 'Available for consulting. Fullstack (Node, React, MongoDB, Postgres)',
  contract: {},
  web3: {}
};

class ProfileComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alert: false,
      error: '',
      messages: []
    };
  }

  componentDidMount() {
    this.props.loadSession();
    this.setState(dummyData);
  }

  logout() {
    this.setState({ messages: [], noMessages: false });
    this.props.clearSession();
  }

  createSession(duration) {
    this.setState({ alert: false });
    this.props.saveSession(duration);
  }

  getMessages() {
    // clear data
    this.setState({
      alert: false,
      error: '',
      messages: []
    });

    const servesaHeader = JSON.stringify({
      message: this.props.message,
      signature: this.props.signature
    });

    return fetch('/api/user/preferences', {
      method: 'GET',
      headers: { 'x-servesa': servesaHeader }
    }).then(response => {
      if (response.status === 401) {
        this.props.clearSession();
        return this.setState({ alert: true, error: '' });
      }

      return response.json().then(responseBody => {
        this.setState({
          messages: responseBody,
          noMessages: !responseBody.length
        });
      });
    });
  }

  render() {
    return (
      <div>
        <h1>
          <img
            src="https://pbs.twimg.com/profile_images/934866609352658944/5kUvOvnZ_400x400.jpg"
            alt="profile"
            style={{ maxHeight: '100px', marginRight: '0.5em' }}
          />
          {this.state.name}
          <label
            style={{ fontSize: 'initial', marginLeft: '0.5em' }}
            className="label-upper"
          >
            {this.state.position}
          </label>
        </h1>
        <hr />
        <p>{this.state.intro}</p>

        <div style={rowGrid}>
          <div>
            <h2>Profile</h2>
            <ul>
              <li>Biography</li>
              <li>Social links</li>
              <li>Projects</li>
              <li>Publications</li>
              <li>Work History</li>
            </ul>
          </div>
          <div>
            <h2>History & Reviews</h2>
          </div>

          <div />

          <div />
        </div>

        <hr />

        <div style={rowGrid}>
          <div>
            <h2>Schedule</h2>
          </div>

          <div />

          <div>
            <h2>Contact</h2>
            <MessageForm />
          </div>
        </div>

        <hr />

        <div style={rowGrid}>
          <div>
            <h2>Token Holders</h2>
            <table className="pure-table">
              <thead>
                <tr>
                  <th>Address</th>
                  <th>Tokens</th>
                  <th>Priority</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>0x987s987...</td>
                  <td>120</td>
                  <td>#30</td>
                </tr>
                <tr>
                  <td>0xFA9AC03...</td>
                  <td>45</td>
                  <td>#210</td>
                </tr>
                <tr>
                  <td>0x0AB37B...</td>
                  <td>30</td>
                  <td>#320</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <h2>Contract Status</h2>
            <p>Current Token Rate: 0.01 ETH ($87)</p>
            <p>Tokens outstanding: 175</p>
            <p>
              <label htmlFor="">Quanitity</label>
              <input type="text" />
            </p>

            <button className="pure-button pure-button-primary">
              Buy Tokens
            </button>
          </div>

          <div>
            <h2>Token Holder</h2>
            <p>Your tokens: 65</p>
            <p>Cash-out value: 3.2 ETH</p>
            <p>
              <label htmlFor="">Quanitity</label>
              <input type="text" />
            </p>

            <button className="pure-button pure-button-primary">
              Sell Tokens
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    web3: state.web3.instance,
    account: state.web3.accounts[0]
  };
};
const mapDispatchToProps = dispatch => {
  return {
    saveSession: duration => {
      dispatch(saveSession(duration));
    },
    loadSession: () => {
      dispatch(loadSession());
    },
    clearSession: () => {
      dispatch(clearSession());
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProfileComponent);
