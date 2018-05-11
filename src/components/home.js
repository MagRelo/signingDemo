import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HomeComponent extends Component {
  render() {
    return (
      <div className="home">
        <h1>Digital Signature Demos</h1>

        <hr />
        <p>
          Digital signatures can be used in place of email and password logins
          to reduce the amount of personal data is collected and stored.
        </p>

        <h3>
          {' '}
          <Link to="/chat"> Post signed messages</Link>{' '}
        </h3>
        <p className="demo-description">Live chat with verifiable messages</p>

        <h3>
          <Link to="/admin">Admin panel</Link>
        </h3>
        <p className="demo-description">
          Use signed messages to restrict access to a server API without
          requiring the user to login.
        </p>

        <h3>
          <Link to="/preferences">User preferences</Link>
        </h3>
        <p className="demo-description">
          Use the user's public key to remember their preferences without
          requiring the user to login.
        </p>

        <h3>
          <Link to="/sessions"> Sessions</Link>
        </h3>
        <p className="demo-description">
          Create a session token to let users "login" without needing an email
          or password.
        </p>
        <h3>
          <Link to="/possesion"> Chain of possesion</Link>
        </h3>
        <p className="demo-description">
          Create a list of signatures to prove the chain of possesion of a
          message.
        </p>
      </div>
    );
  }
}

export default HomeComponent;
