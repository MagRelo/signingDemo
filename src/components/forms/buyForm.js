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
              <label htmlFor="">Total Price</label>
              <input
                className="pure-input-1"
                type="text"
                value={this.state.currentPrice}
                disabled
              />
            </fieldset>
            <button className="pure-button pure-button-primary">
              Buy tokens
            </button>
            <span style={{ margin: '0 0.25em' }} />
            <button className="pure-button pure-button-primary">
              Request a donation
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
