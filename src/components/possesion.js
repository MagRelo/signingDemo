import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import sigUtil from 'eth-sig-util';
import ethUtil from 'ethereumjs-util';
import crypto from 'crypto';

class NestingComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      seed: {
        item: 120912031298,
        previousSignature: null
      },
      data: []
    };
  }

  // Sign message and send to server
  sign() {
    const web3 = this.props.web3;
    const userAddress = this.props.account;

    // create next block
    const now = new Date();
    let newContent = {
      timestamp: now.toUTCString()
    };

    const previousBlock = this.state.data[this.state.data.length - 1];
    if (previousBlock) {
      newContent.item = previousBlock.content.item;
      newContent.previousSignature = previousBlock.signature;
    } else {
      newContent.item = this.state.seed.item;
      newContent.previousSignature = this.state.seed.previousSignature;
    }

    // prepare the data for signing
    const contentAsHex = ethUtil.bufferToHex(
      new Buffer(JSON.stringify(newContent), 'utf8')
    );

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
          content: newContent,
          signature: result.result
        };

        return this.setState({
          data: [...this.state.data, element]
        });
      }
    );
  }

  unwind(item) {
    let publicKey = 'n/a';
    if (item.content && item.signature) {
      publicKey = sigUtil.recoverPersonalSignature({
        data: ethUtil.bufferToHex(
          new Buffer(JSON.stringify(item.content), 'utf8')
        ),
        sig: item.signature
      });
    }

    return publicKey;
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

        <h2>Item: 120912031298 </h2>
        <ol>
          {this.state.data.map((item, index) => {
            return (
              <li key={item + index}>
                <p>
                  <code>{this.unwind(item)}</code> took possesion at{' '}
                  {item.content.timestamp}
                </p>
              </li>
            );
          })}
        </ol>

        <button className="pure-button" onClick={this.sign.bind(this)}>
          Accept possesion of item
        </button>

        <hr />

        <h2>Data</h2>
        <ol>
          {this.state.data.map((item, index) => {
            return (
              <li key={item.signature + index}>
                <div>
                  <p>Item #: {item.content.item}</p>
                  <p>Timestamp: {item.content.timestamp}</p>
                  <p
                    style={{
                      color: item.content.previousSignature
                        ? '#' + item.content.previousSignature.substring(5, 11)
                        : 'inherit'
                    }}
                  >
                    Previous Signature: {item.content.previousSignature}
                  </p>
                </div>
                <p
                  style={{
                    color: item.signature
                      ? '#' + item.signature.substring(5, 11)
                      : 'inherit'
                  }}
                >
                  Signature: {item.signature}
                </p>
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
