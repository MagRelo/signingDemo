import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const dummyData = {
  list: [
    { name: 'Matt Lovan', rate: '$100', url: '/profile/mattlovan' },
    { name: 'Team Discovery', rate: '$350', url: 'team/12309' }
  ]
};

class ListComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alert: false,
      error: '',
      list: []
    };
  }

  componentDidMount() {
    // this.search();
    this.setState(dummyData);
  }

  search(parameters) {
    return fetch('/api/profile/search', {
      method: 'POST',
      body: JSON.stringify({ testbody: true })
    }).then(response => {
      if (response.status === 401) {
        return this.setState({ alert: true, error: '' });
      }

      return response.json().then(responseBody => {
        this.setState({
          list: responseBody,
          noList: !responseBody.length
        });
      });
    });
  }

  render() {
    return (
      <div>
        <h1>Search</h1>
        <hr />

        <table className="pure-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Persons</th>
              <th>Rate</th>
            </tr>
          </thead>
          <tbody>
            {this.state.list.map(item => {
              return (
                <tr key={item.name}>
                  <td>
                    <Link to={item.url}>{item.name}</Link>
                  </td>
                  <td />
                  <td>{item.rate}</td>
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
    account: state.web3.accounts[0]
  };
};
const mapDispatchToProps = dispatch => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(ListComponent);
