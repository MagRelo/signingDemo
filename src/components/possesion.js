import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import sigUtil from 'eth-sig-util';
import ethUtil from 'ethereumjs-util';

class NestingComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [{ signature: 'root' }],
      chain: this.unwind([{ signature: 'root' }])
    };
  }

  // Sign message and send to server
  sign() {
    const web3 = this.props.web3;
    const userAddress = this.props.account;

    // prepare the data for signing
    const content = JSON.stringify(this.state.data);
    const contentAsHex = ethUtil.bufferToHex(new Buffer(content, 'utf8'));

    // sign message
    web3.currentProvider.sendAsync(
      {
        method: 'personal_sign',
        params: [contentAsHex, userAddress],
        from: userAddress
      },
      (err, result) => {
        if (err) return console.error(err);
        if (result.error) {
          return this.setState({
            alert: true,
            error: 'User denied signature.'
          });
        }

        const element = {
          content: content,
          signature: result.result
        };

        return this.setState({
          data: [...this.state.data, element],
          chain: this.unwind([...this.state.data, element])
        });
      }
    );
  }

  unwind(data) {
    return data.map(item => {
      if (item.content && item.signature) {
        return sigUtil.recoverPersonalSignature({
          data: item.content,
          sig: item.signature
        });
      }

      return item.signature;
    });
  }

  render() {
    return (
      <div className="">
        <h1>
          <Link to="/">Demos</Link>&nbsp;> Chain of Possesion
        </h1>
        <hr />
        <p>
          We can demonstrate a chain of possesion by signing a root message and
          then using that signature as the input for the next signer. We can
          then unwind the string of messages and demonstrate the chain of
          possesion of the original message.
        </p>

        <h2>Signatures</h2>
        <ol>
          {this.state.data.map((item, index) => {
            return (
              <li key={item.signature + index}>
                <span>{item.signature}</span>
              </li>
            );
          })}
        </ol>

        <button className="pure-button" onClick={this.sign.bind(this)}>
          Add my signature
        </button>

        <h2>Chain of possesion</h2>
        <ol>
          {this.state.chain.map((item, index) => {
            return (
              <li key={item + index}>
                <span>{item}</span>
              </li>
            );
          })}
        </ol>
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
export default connect(mapStateToProps)(NestingComponent);
