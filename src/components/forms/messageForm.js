import React, { Component } from 'react';
import { connect } from 'react-redux';
import ethUtil from 'ethereumjs-util';

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
      <form className="pure-form chat-form">
        <legend>Contact</legend>
        <LoadWrapper>
          <div>
            <fieldset>
              <label htmlFor="content">Message</label>
              <div>
                <textarea
                  rows="3"
                  className="pure-input-1"
                  value={this.state.content}
                  name="content"
                  onChange={this.handleChange.bind(this)}
                />
              </div>
            </fieldset>
            <button
              type="button"
              className="pure-button pure-button-primary"
              disabled={!this.state.content}
              onClick={this.props.submitMessage}
            >
              Send
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
    account: state.web3.accounts[0] || '',
    sendMessage: () => {
      console.log('implement!');
    }
  };
};
export default connect(mapStateToProps)(FormComponent);
