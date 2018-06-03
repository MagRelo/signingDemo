import React, { Component } from 'react';

import Checkmark from './checkmark';
import WarningIcon from '../../icon/warning.svg';

let timer = null;
const buttonGrid = {
  display: 'grid',
  gridTemplateRows: '1fr',
  gridTemplateColumns: '1fr 1fr 1fr',
  margin: '3em 0 1em'
};

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
              web3 is not available. This application requires a browser that
              supports web3.
            </p>

            <div style={buttonGrid}>
              <div>
                <a href="https://metamask.io/">
                  <img
                    src="https://pbs.twimg.com/profile_images/632786773366599681/VzI4uiQB_bigger.png"
                    alt="metamask"
                  />
                  <p>Metamask</p>
                </a>
              </div>

              <div>
                <a
                  href="https://www.cipherbrowser.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://pbs.twimg.com/profile_images/937807890391248896/tCQFdTBF_bigger.jpg"
                    alt="cipher"
                  />
                  <p>Cipher</p>
                </a>
              </div>

              <div>
                <a
                  href="http://www.toshi.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://pbs.twimg.com/profile_images/834794555773960192/KC-yIJwN_bigger.jpg"
                    alt="toshi"
                  />
                  <p>Toshi</p>
                </a>
              </div>
            </div>
          </div>
        ) : null}
        {this.props.web3 && !this.props.account && this.state.showTip ? (
          <div>
            <p>
              <img src={WarningIcon} alt="warning icon" />
            </p>
            <p>
              Your account is not available. You may need to unlock your
              account.
            </p>
          </div>
        ) : null}
      </div>
    );
  }
}

export default AdminComponent;
