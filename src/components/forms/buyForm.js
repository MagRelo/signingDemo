import React, { Component } from 'react';
import { connect } from 'react-redux';

import LoadWrapper from '../misc/loader';

class FormComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ''
    };
  }

  // Form functions
  handleChange(event) {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <form className="pure-form" action="">
        <legend>Buy Tokens</legend>

        <LoadWrapper>
          <div>
            <fieldset>
              <label htmlFor="">Quantity</label>
              <input className="pure-input-1" type="text" />

              <label htmlFor="">Average Price</label>
              <input
                className="pure-input-1"
                type="text"
                value={this.state.currentPrice}
                disabled
              />
            </fieldset>
            <button className="pure-button pure-button-primary">
              Buy Tokens
            </button>
            <button className="pure-button pure-button-primary">
              Request Donation
            </button>
          </div>
        </LoadWrapper>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    web3: state.web3.instance,
    account: state.web3.accounts[0] || ''
  };
};
export default connect(mapStateToProps)(FormComponent);
