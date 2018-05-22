import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HomeComponent extends Component {
  render() {
    return (
      <div className="home">
        <h1>Servésa Labor Market</h1>
        <hr />

        <p>
          Servésa a new way to find and retain staff for your organization. Your
          company can buy tokens that can be redeemed for a unit for work by the
          person that issues the token.
        </p>

        <h2>Thesis</h2>
        <p>
          By radically increasing transperancy around the availablilty, pricing
          and scheduling of labor we can unlock new opportunities for profitable
          cooperation. As this strategy focuses on reducing transaction costs we
          expect it will be most valuable when applied to areas where a) work is
          intermittent, and b) there is high transaction costs around finding
          and retaining labor (such as high-value knowledge work). This strategy
          also creates pricing signals to further improve effeciency; these
          signals will be most effective where the services are somewhat
          interchangeable but difficult to directly compare (e.g., developers).
        </p>

        <h2>Example</h2>
        <ol>
          <li>
            <p>
              Alice is smart contract security specialist. She is available for
              contract work so she creates a profile on Servesa.
            </p>
            <p className="inset">
              <em>
                Behind the scenes, a smart contract is deployed that creates a
                unique,{' '}
                <a href="https://hackernoon.com/an-overview-of-non-fungible-tokens-5f140c32a70a">
                  non-fungible token
                </a>{' '}
                to represent Alice's work. Each token is unique and sequential
                and the sequence number represents the order that Alice is
                expected to redeem them. If, for example, two token holders were
                both trying to schedule Alice, Alice is expected to schedule the
                work for the earlier tokens first. There is no requirement to
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
              retain a security expert in the meantime and then have them begin
              as soon as possible after each contract is ready but but he's not
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
          <li>Only pay for the time that you use</li>
          <li>Maintain long-term relationships with fluid team memebers</li>
          <li>Build tacit knowledge in the organization</li>
          <li>Find and retain employees before they are needed</li>
        </ul>

        <h2>Advantages for agents (Alice) </h2>
        <ul>
          <li>
            Allow market to set prices for her services based on demand - no
            negotiation
          </li>
          <li />
        </ul>

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
