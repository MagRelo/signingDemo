import React, { Component } from 'react';
import { connect } from 'react-redux';
import ethUtil from 'ethereumjs-util';

import { Link } from 'react-router-dom';

import Indicator from './misc/indicator';

const dummyData = {
  items: [
    {
      name: 'Matt Lovan',
      position: 'Web Developer',
      avatar:
        'https://pbs.twimg.com/profile_images/934866609352658944/5kUvOvnZ_400x400.jpg',
      intro:
        'Available for consulting. Fullstack (Node, React, MongoDB, Postgres)',
      url: 'profile/mattlovan',
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
      tokenAvailability: 65,
      tokenActivity: 64,
      tokenChurn: 28,
      basePrice: 80.0,
      currentPrice: 105.05,
      currentSupply: 300,
      totalSupply: 400
    },
    {
      name: 'Team Discovery',
      position: 'Full-stack team',
      currentPrice: '350',
      url: 'team/12309',
      currentSupply: 84,
      totalSupply: 1000,
      tokenDemand: 35,
      tokenAvailability: 90,
      tokenActivity: 24,
      tokenChurn: 55
    },
    {
      name: 'Bob Jones',
      position: 'Designer',
      currentPrice: '60',
      url: 'team/12309',
      currentSupply: 50,
      totalSupply: 100,
      tokenDemand: 90,
      tokenAvailability: 22,
      tokenActivity: 85,
      tokenChurn: 10
    },
    {
      name: 'Rick Ross',
      position: 'Painter',
      currentPrice: '195.25',
      url: 'team/12309',
      currentSupply: 22,
      totalSupply: 100,
      tokenDemand: 77,
      tokenAvailability: 60,
      tokenActivity: 88,
      tokenChurn: 20
    }
  ]
};

class MyAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: []
    };
  }

  componentDidMount() {
    this.setState(dummyData);
  }

  render() {
    return (
      <div>
        <h1>My Account</h1>
        <Link style={{ float: 'right' }} to="/create">
          + Add New Contract
        </Link>
        <h2>My Contracts</h2>

        <table className="pure-table" style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Balance</th>
              <th>Current Price</th>
              <th>Supply</th>
              <th>Demand</th>
              <th>Churn</th>
              <th>Activity</th>
              <th>Availability</th>
            </tr>
          </thead>

          <tbody>
            {this.state.items.map(item => {
              return (
                <tr key={item.name}>
                  <td>
                    <Link to={item.url}>{item.name}</Link>
                  </td>
                  <td>120 </td>
                  <td>${item.currentPrice}</td>
                  <td>
                    {item.currentSupply} / {item.totalSupply}
                  </td>
                  <td>
                    <Indicator value={item.tokenDemand} />
                  </td>
                  <td>
                    <Indicator value={item.tokenChurn} />
                  </td>
                  <td>
                    <Indicator value={item.tokenActivity} />
                  </td>
                  <td>
                    <Indicator value={item.tokenAvailability} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <hr />
        <Link style={{ float: 'right' }} to="/search">
          Search
        </Link>
        <h2>Tokens</h2>
        <table className="pure-table" style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Balance</th>
              <th>Current Price</th>
              <th>Supply</th>
              <th>Demand</th>
              <th>Churn</th>
              <th>Activity</th>
              <th>Availability</th>
            </tr>
          </thead>

          <tbody>
            {this.state.items.map(item => {
              return (
                <tr key={item.name}>
                  <td>
                    <Link to={item.url}>{item.name}</Link>
                  </td>
                  <td>90 </td>
                  <td>${item.currentPrice}</td>
                  <td>
                    {item.currentSupply} / {item.totalSupply}
                  </td>
                  <td>
                    <Indicator value={item.tokenDemand} />
                  </td>
                  <td>
                    <Indicator value={item.tokenChurn} />
                  </td>
                  <td>
                    <Indicator value={item.tokenActivity} />
                  </td>
                  <td>
                    <Indicator value={item.tokenAvailability} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    web3: state.web3.instance,
    account: state.web3.accounts[0] || ''
  };
};
export default connect(mapStateToProps)(MyAccount);
