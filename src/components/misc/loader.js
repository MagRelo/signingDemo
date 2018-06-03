import React, { Component } from 'react';
import { connect } from 'react-redux';

import Error from '../misc/web3Error';

class LoadWrapper extends Component {
  render() {
    return (
      <div>
        {!this.props.web3 || !this.props.account ? (
          <Error
            web3={this.props.web3}
            account={this.props.account}
            network={this.props.network}
          />
        ) : (
          // eslint-disable-next-line
          { ...this.props.children }
        )}
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

export default connect(mapStateToProps)(LoadWrapper);
