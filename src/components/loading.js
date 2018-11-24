import React, { Component } from 'react';
import { connect } from 'react-redux';

import WarningIcon from '../icon/warning.svg';

function selectMessage(web3Ready, accountsReady, contractsReady, networkReady) {
  let message = '';
  if (!contractsReady || !networkReady) {
    message = `Pragma smart contracts not found. Please make sure you are connected to the right network.`;
  }

  if (!accountsReady) {
    message = `Your web3 account is not available. You may need to unlock your account.`;
  }

  if (!web3Ready) {
    message = `web3 is not available. This feature requires a browser that supports web3 or a browser plugin like MetaMask.`;
  }

  return { __html: message };
}

class LoadWrapper extends Component {
  render() {
    return (
      <div>
        {!this.props.web3Ready ||
        !this.props.accountsReady ||
        !this.props.contractsReady ||
        !this.props.networkReady ? (
          <div className="loader">
            {!this.props.showTip ? (
              <div>
                {this.props.hideMessage ? null : (
                  <span>
                    <div className="spinner" />
                    <label>loading...</label>
                  </span>
                )}
              </div>
            ) : (
              <div>
                <img
                  src={WarningIcon}
                  alt="warning icon"
                  style={
                    this.props.removeIconMargin ? null : { marginTop: '1em' }
                  }
                />

                {this.props.hideMessage ? null : (
                  <p
                    dangerouslySetInnerHTML={selectMessage(
                      this.props.web3Ready,
                      this.props.accountsReady,
                      this.props.contractsReady,
                      this.props.networkReady
                    )}
                  />
                )}
              </div>
            )}
          </div>
        ) : (
          { ...this.props.children }
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    web3Ready: state.web3.web3Ready,
    accountsReady: state.web3.accountsReady,
    contractsReady: state.web3.contractsReady,
    networkReady: state.web3.networkReady,
    showTip: state.web3.showTip
  };
};

export default connect(
  mapStateToProps,
  null
)(LoadWrapper);
