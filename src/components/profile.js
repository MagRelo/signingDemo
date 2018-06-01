import React, { Component } from 'react';
import { connect } from 'react-redux';

import MessageForm from './messageForm';
import BuyForm from './buyForm';
import SellForm from './sellForm';

import Chart from './chart';
import Indicator from './indicator';

const rowGrid = {
  display: 'grid',
  gridTemplateRows: '1fr',
  gridTemplateColumns: '1fr 1fr',
  margin: '0.5em 0 1em'
};

const dummyData = {
  name: 'Matt Lovan',
  position: 'Web Developer',
  avatar:
    'https://pbs.twimg.com/profile_images/934866609352658944/5kUvOvnZ_400x400.jpg',
  intro: 'Available for consulting. Fullstack (Node, React, MongoDB, Postgres)',
  social: [
    { type: 'twitter', url: 'https://twitter.com' },
    { type: 'facebook', url: 'https://facebook.com' }
  ],
  media: [
    { type: 'medium', url: 'https://medium.com' },
    { type: 'youtube', url: 'https://youtube.com' }
  ],
  projects: [
    { type: 'medium', url: 'https://github.com/asdf' },
    { type: 'youtube', url: 'https://github.com/party' }
  ],
  tokenDemand: 87,
  demandHistory: [],
  tokenAvailability: 65,
  availabilityHistory: [],
  tokenActivity: 64,
  activityHistory: [],
  tokenChurn: 28,
  churnHistrory: [],
  basePrice: 80.0,
  totalSupply: 400,
  currentPrice: 105.05,
  currentSupply: 300
};

class ProfileComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alert: false,
      error: '',
      avatar: '',
      social: [],
      media: [],
      projects: [],
      basePrice: 0,
      currentPrice: 0,
      currentSupply: 0,
      totalSupply: 0,
      tokenDemand: 0,
      tokenAvailability: 0,
      tokenActivity: 0,
      tokenChurn: 0
    };
  }

  componentDidMount() {
    this.setState(dummyData);
  }

  render() {
    return (
      <div>
        <h1>
          <img
            src={this.state.avatar}
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

        <div
          style={{
            display: 'grid',
            gridTemplateRows: '1fr',
            gridTemplateColumns: '1fr  1fr 1fr',
            margin: '0.5em 0 1em'
          }}
        >
          <div>
            <h3>Social</h3>
            <ul>
              {this.state.social.map(item => {
                return <li key={item.url}>{item.url}</li>;
              })}
            </ul>
          </div>

          <div>
            <h3>Publications</h3>
            <ul>
              {this.state.media.map(item => {
                return <li key={item.url}>{item.url}</li>;
              })}
            </ul>
          </div>

          <div>
            <h3>Projects</h3>
            <ul>
              {this.state.projects.map(item => {
                return <li key={item.url}>{item.url}</li>;
              })}
            </ul>
          </div>
        </div>

        <h2>Token Status</h2>

        <div
          style={{
            display: 'grid',
            gridTemplateRows: '1fr',
            gridTemplateColumns: '1fr 1fr 1fr 1fr',
            margin: '1em 0 2em',
            textAlign: 'center'
          }}
        >
          <Indicator value={this.state.tokenDemand} label="Demand" />
          <Indicator value={this.state.tokenChurn} label="Churn" />
          <Indicator value={this.state.tokenActivity} label="Activity" />
          <Indicator
            value={this.state.tokenAvailability}
            label="Availability"
          />
        </div>

        <div style={rowGrid}>
          <Chart
            basePrice={this.state.basePrice}
            currentPrice={this.state.currentPrice}
            currentSupply={this.state.currentSupply}
            totalSupply={this.state.totalSupply}
            basis={0.01}
            exponent={1.8}
          />

          <BuyForm />
        </div>

        <h2>My Contract</h2>
        <div style={rowGrid}>
          <div>
            <h3>Detail</h3>
            <p>Balance: {204} ETH</p>
            <p>Outstanding Tokens: 120</p>
            <p>Token Base Price: {0.15} ETH</p>
            <p>Basis: 0.01</p>
            <p>Exponent: 1.8</p>
          </div>
          <div>
            <h3>Token Holders</h3>
            <table className="pure-table" style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th>Address</th>
                  <th>Balance</th>
                  <th>Request Transfer</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>10238123</td>
                  <td>90</td>
                  <td>
                    <button className="pure-button pure-button-primary">
                      Request
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>af89sd9fs</td>
                  <td>30</td>
                  <td>
                    <button className="pure-button pure-button-primary">
                      Request
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <h2>My Account</h2>
        <p>Token Balance: 65</p>
        <p>Value: $6,522</p>
        <div style={rowGrid}>
          <MessageForm />

          <SellForm />
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
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(ProfileComponent);
