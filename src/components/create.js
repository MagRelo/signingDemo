import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CreateContractForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contractOwner: '',
      oracleAddress: '',
      tournamentName: '',
      playerWhitelist: [
        '0x863afa452F38966b54Cb1149D934e34670D0683a',
        '0x106F681949E222D57A175cD85685E3bD9975b973',
        '0xdf396910e693f7De31eF88d0090F2A4333ffcCF3'
      ],
      newPlayer: '',
      rounds: 5,
      minDeposit: 0.1,
      exchangeRate: 1,
      gameType: 'push'
    };
  }
  componentDidMount() {
    fetch('https://api.coinmarketcap.com/v1/ticker/ethereum/?convert=USD')
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.setState({
          exchangeRate: parseInt(data[0].price_usd, 10)
        });
      });
  }

  // Form functions
  handleChange(event) {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    // this.props.createTournament({
    //   contractOwner: this.props.userAddress,
    //   oracleAddress: 'asdnfaosdifnasdoif',
    //   name: this.state.tournamentName,
    //   timedGame: this.state.gameType === 'timed',
    //   minDeposit: this.state.minDeposit,
    //   rounds: this.state.rounds,
    //   playerList: this.state.playerWhitelist
    // });
    console.log('TODO: create tournament');
  }

  round(value, places) {
    places = places || 4;
    return Number(Math.round(value + 'e' + places) + 'e-' + places);
  }
  formatEth(ether) {
    return (
      'Ξ' +
      this.round(ether, 5) +
      ' ETH ($' +
      this.round(this.state.exchangeRate * ether) +
      ')'
    );
  }
  render() {
    //   <button
    //   type="submit"
    //   className="pure-button pure-button-xlarge pure-button-primary"
    //   onClick={this.handleSubmit.bind(this)}
    // >
    //   {' '}
    //   + Create profile
    // </button>

    return (
      <div>
        <h1>Create profile</h1>
        <hr />

        <form className="pure-form" onSubmit={this.handleSubmit.bind(this)}>
          <fieldset>
            <label>Name</label>
            <input
              className="pure-input-1"
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange.bind(this)}
            />

            <label>Avatar</label>
            <input
              className="pure-input-1"
              type="text"
              name="avatar"
              value={this.state.avatar}
              onChange={this.handleChange.bind(this)}
            />

            <label>
              Describe what your tokens represents (e.g., one hour of
              consulting)
            </label>
            <input
              className="pure-input-1"
              type="text"
              name="avatar"
              value={this.state.avatar}
              onChange={this.handleChange.bind(this)}
            />
          </fieldset>

          <h2>Contract Details</h2>
          <fieldset>
            <label>
              Minimum token price: {this.formatEth(this.state.minDeposit)}
            </label>
            <input
              className="pure-input-1"
              type="number"
              name="minDeposit"
              min="0.01"
              step="any"
              value={this.state.tokenBasePrice}
              onChange={this.handleChange.bind(this)}
            />
          </fieldset>

          <hr />

          <Link to="/profile/mattlovan"> + Create profile</Link>
        </form>
      </div>
    );
  }
}

export default CreateContractForm;
