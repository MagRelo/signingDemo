import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HomeComponent extends Component {
  render() {
    return (
      <div className="home">
        <h1>Servésa Labor Market</h1>
        <hr />

        <h2>Thesis</h2>
        <p>
          By increasing transperancy around the availablilty, pricing and
          scheduling of labor we can unlock new opportunities for profitable
          cooperation. We'll create a unique token to represent each agent's
          unit of work. We'll then create financial incentives around how tokens
          are priced and redeemed to encourage cooperation between prinicipals
          and agents.
        </p>
        <p>
          As this strategy focuses on reducing transaction costs we expect it
          will be most valuable when applied to areas where a) there is high
          transaction costs around finding and retaining labor, b) work is
          intermittent, and c) where the services are somewhat interchangeable
          but difficult to compare directly (e.g., software developers).
        </p>

        <h2>Example</h2>
        <ol>
          <li>
            <p>
              Alice is smart contract security specialist. She creates a profile
              on Servesa to advertise her availablity and to handle the billing
              for her services.
            </p>
            <p className="inset">
              <em>
                Behind the scenes, a smart contract is deployed that creates a
                unique,{' '}
                <a href="https://hackernoon.com/an-overview-of-non-fungible-tokens-5f140c32a70a">
                  non-fungible token
                </a>{' '}
                to represent Alice's work. Each token is sequential and the
                sequence number represents the order that Alice is expected to
                redeem them. If, for example, two token holders were both trying
                to schedule Alice for an upcoming project, Alice is expected to
                honor the earlier tokens first. There is no requirement to
                redeem the tokens in order – it simply acts as a signal to help
                Alice and the token holders coordinate scheduling (it is also in
                Alice's economic interest for her to honor the priority of the
                tokens – more on that later.)
              </em>
            </p>
          </li>
          <li>
            <p>
              Bob manages a team that is developing smart contracts and he knows
              that he'll eventually need a security audit. He'd like to find and
              retain a security expert ahead of time and also have them begin as
              soon as possible after each contract is ready but but he's not
              sure when all of the contracts will be finished.
            </p>

            <p>
              Bob finds Alice's Servesa profile and purchases 20 tokens
              (representing 20 hours of work) from Alice's Servesa profile.
            </p>
            <p className="inset">
              <em>
                The amount of ETH that Bob has to pay for each token depends on:
                a) the amount of ETH in the contract, and b) the number of
                outstanding tokens. See more about{' '}
                <a href="https://medium.com/@simondlr/tokens-2-0-curved-token-bonding-in-curation-markets-1764a2e0bee5|">
                  bonded-curve curation markets
                </a>.
              </em>
            </p>
          </li>
          <li>
            <p>
              Some months later Bob is ready to schedule Alice. He contacts her
              and finds out that her current engagement will be finished next
              week. Although Alice has dozens of companies holding her tokens,
              Bob's tokens are currently the highest priority so she informs him
              that she'll be ready to start as soon as her current engagement is
              finished.
            </p>
          </li>

          <li>
            <p>
              Alice completes the audit in 18 hours, and asks Bob to release 18
              tokens to her for payment. Bob releases the tokens, and Alice
              sells them back to her contract in exchange for ETH.
            </p>

            <p className="inset">
              <em>
                The amount of ETH that Alice is able to claim depends on: a) the
                amount of ETH in the contract, and b) the number of outstanding
                tokens. See more about{' '}
                <a href="https://medium.com/@simondlr/tokens-2-0-curved-token-bonding-in-curation-markets-1764a2e0bee5|">
                  bonded-curve curation markets
                </a>.
              </em>
            </p>
          </li>

          <li>
            <p>
              Bob now has two remaining tokens, and several options on what to
              do with them. He can simply hold the tokens if he thinks he'll
              need Alice's services again in the future. He can also sell them
              back to the contract, essentially getting a refund for his unused
              tokens (and possibly a profit). Or he can sell the tokens to
              someone else (remember these tokens have a priority – someone else
              may be willing to pay a premium for that).
            </p>
          </li>
        </ol>

        <h2>Advantages for pricipals (Bob)</h2>
        <ul>
          <li>
            <p>
              Only pay for the time that you use, and only pay when you use it
            </p>
          </li>
          <li>
            <p>Find and retain employees before they are needed</p>
          </li>
          <li>
            Possibility of making a profit if the early tokens become more
            valuable
          </li>
        </ul>

        <h2>Advantages for agents (Alice) </h2>
        <ul>
          <li>
            <p>
              Allow market to set prices for an agent's services based on
              demand. The 'sell' price of the token will include both the base
              rate for their services as well as the premium that token-holders
              pay to hold early tokens (i.e., to hold their place in line).
            </p>
          </li>
          <li>
            <p>More flexibility in when and how to work</p>
          </li>
          <li>
            <p>Verifiable signals of quality and demand for services</p>
          </li>
        </ul>

        <h2>Market Dynamics</h2>

        <h3>Incentive to hold tokens</h3>
        <p>
          For principals, buying and holding tokens means that they pay less for
          each token (curved-bonding pricing) and that they have higher priority
          when they choose to redeem the service.
        </p>

        <h3>Speculation</h3>
        <p>
          This could create an incentive for secondary markets to emerge by
          identifying and flipping under-priced services. This may be a poitive
          feature of the system
        </p>

        <h3>Market-tuning parameters</h3>
        <p>
          It mat be desirable to introduce fees to shape market dynamics. If
          speculation begins to cause too much churn we could introduce 'buy'
          and 'sell' taxes to reduce velocity. If principals are holding too
          many tokens we could introduce demmurage to increase the cost of
          carrying capital.
        </p>

        <h2>Demo</h2>
        <p>
          <Link to="search">I'm an employer – search for talent</Link>
        </p>
        <p>
          <Link to="create">I'm a contractor – build my profile</Link>
        </p>
      </div>
    );
  }
}

export default HomeComponent;
