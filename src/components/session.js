import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { loadSession, saveSession, clearSession } from '../reducers/user';

const buttonGrid = {
  display: 'grid',
  gridTemplateRows: '1fr',
  gridTemplateColumns: '1fr 1fr 1fr',
  margin: '0.5em 0 1em'
};

class LoginComponent extends Component {
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
          <Link to="/">Demos</Link>&nbsp;> Sessions
        </h1>
        <hr />
        <p> The user can create a session token for themselves. </p>

        <h2>User Session</h2>
        <p>Status: {this.props.expires ? 'Active' : 'Not active'}</p>
        {this.props.expires ? (
          <p>Expires: {moment(this.props.expires).format('llll')}</p>
        ) : null}

        {this.props.expires ? (
          <div>
            <button
              name="90"
              type="button"
              className="pure-button"
              onClick={this.logout.bind(this)}
            >
              {' '}
              logout
            </button>
          </div>
        ) : (
          <div />
        )}

        <hr />
        <button
          name="90"
          type="button"
          className="pure-button pure-button-primary"
          onClick={this.getMessages.bind(this)}
        >
          Get User Messages
        </button>

        <ul>
          {this.state.messages.map(message => {
            return <li key={message._id}>{message.content}</li>;
          })}
        </ul>

        {this.state.noMessages ? (
          <label>(No data found. Post a message on the 'message' demo.)</label>
        ) : null}

        {this.state.alert ? (
          <div
            style={{
              border: 'solid pink 1px',
              padding: '0.5em',
              marginTop: '1em'
            }}
          >
            <h3>401 - Unauthorized</h3>
            <p>You must create a session to view this content:</p>

            <div>
              <label className="label-upper">Session Length</label>
            </div>

            <div style={buttonGrid}>
              <button
                name="1"
                type="button"
                className="pure-button pure-button-primary"
                onClick={this.createSession.bind(this, 1)}
              >
                1 minute
              </button>
              <button
                name="30"
                type="button"
                className="pure-button pure-button-primary"
                onClick={this.createSession.bind(this, 30)}
              >
                30 minutes
              </button>
              <button
                name="90"
                type="button"
                className="pure-button pure-button-primary"
                onClick={this.createSession.bind(this, 90)}
              >
                90 minutes
              </button>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    expires: state.user.expires,
    message: state.user.message,
    signature: state.user.signature
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
export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
