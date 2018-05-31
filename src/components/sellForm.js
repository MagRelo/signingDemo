import React, { Component } from 'react';
import { connect } from 'react-redux';
import ethUtil from 'ethereumjs-util';

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

  submitMessage() {
    const web3 = this.props.web3;
    const userAddress = this.props.account;

    const msg = ethUtil.bufferToHex(new Buffer(this.state.content, 'utf8'));
    const params = [msg, userAddress];

    console.group('Digital Signature');
    console.log('Message:');
    console.dir(params);

    web3.currentProvider.sendAsync(
      {
        method: 'personal_sign',
        params: params,
        from: userAddress
      },
      (err, result) => {
        if (err) return console.error(err);
        if (result.error) return console.error(result.error.message);

        console.log('Signature: ');
        console.log(result.result);
        console.groupEnd();

        // send to server
        // this.props.emitMessage(msg, result.result, this.state.content);
        console.log('implement POST to server');

        this.setState({ content: '' });
      }
    );
  }

  render() {
    return (
      <form className="pure-form" action="">
        <legend>Sell Tokens</legend>
        <fieldset>
          <label htmlFor="">Quantity</label>
          <input type="text" />
        </fieldset>

        <button className="pure-button pure-button-primary">Sell Tokens</button>
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