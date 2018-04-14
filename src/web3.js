
import Web3 from 'web3'

let getWeb3 = new Promise(function(resolve, reject) {

  // Wait for loading completion to avoid race conditions with web3 injection timing.
  window.addEventListener('load', function(dispatch) {
    var web3

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof window.web3 !== 'undefined') {

      console.log('Injected web3 detected.');

      // Use Mist/MetaMask's provider.
      web3 = new Web3(window.web3.currentProvider)

      // get network
      let network = ''
      web3.eth.net.getId((err, netId) => {
        switch (netId.toString()) {
          case "1":
            network = 'mainnet'
            break
          case "2":
            network = 'morden'
            break
          case "3":
            network = 'ropsten'
            break
          case "4":
            network = 'rinkeby'
            break
          case "42":
            network = 'kovan'
            break
          default:
            network = 'unknown (local?)'
        }

        return web3.eth.getAccounts()
          .then(array => {
            return resolve({
              web3Instance: web3,
              network: network,
              accounts: array              
            })
          })

      })

    } else {

      console.log('No web3 instance injected, using Local web3.');

      // Fallback to localhost if no web3 injection.
      var provider = new Web3.providers.HttpProvider('http://localhost:8545')
      web3 = new Web3(provider)

      return web3.eth.getAccounts()
        .then(array => {
          return resolve({
            web3Instance: web3,
            network: 'local',
            accounts: array              
          })
        })

    }


  })
})

export default getWeb3
