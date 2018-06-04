import React, { Component } from 'react';

import WarningIcon from '../../icon/warning.svg';

let timer = null;

class AdminComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showTip: false
    };
  }

  componentDidMount() {
    timer = setTimeout(() => {
      this.setState({ showTip: true });
    }, 4000);
  }
  componentWillUnmount() {
    clearTimeout(timer);
  }

  render() {
    return (
      <div className="loader">
        {!this.state.showTip ? (
          <div>
            <div className="spinner" />
            <label>loading...</label>
          </div>
        ) : null}

        {!this.props.web3 && this.state.showTip ? (
          <div>
            <p>
              <img src={WarningIcon} alt="warning icon" />
            </p>
            <p>
              web3 is not available. This feature requires a browser that
              supports web3.
            </p>
          </div>
        ) : null}
        {this.props.web3 && !this.props.account && this.state.showTip ? (
          <div>
            <p>
              <img src={WarningIcon} alt="warning icon" />
            </p>
            <p>
              Your web3 account is not available. You may need to unlock your
              account.
            </p>
          </div>
        ) : null}
      </div>
    );
  }
}

export default AdminComponent;
