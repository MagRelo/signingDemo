import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HomeComponent extends Component {
  render() {
    return (
      <div className="home">
        <h1>Fluid Teams</h1>

        <hr />

        <h2>Advantages for pricipals:</h2>
        <ul>
          <li>Only pay for the time that you use</li>
          <li>Maintain long-term relationships with employees</li>
          <li>Build tacit knowledge in the organization</li>
          <li>Find and retain employees before they are needed</li>
        </ul>

        <h2>Advantages for agents:</h2>
        <ul>
          <li>Flexibility in scheduling</li>
          <li>Steady stream of income</li>
          <li>Maintain long-term relationships with employers</li>
        </ul>

        <h2>Demo</h2>
        <p>
          <Link to="search">I'm an employer – search for talent</Link>
        </p>
        <p>
          <Link to="search">I'm a contractor – build my profile</Link>
        </p>
      </div>
    );
  }
}

export default HomeComponent;
