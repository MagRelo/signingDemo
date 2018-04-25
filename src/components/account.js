import React, { Component } from 'react'
import ethUtil  from 'ethereumjs-util'

class DetailComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      message: {},
      verifyStatus: 'Not Verified',
      verified: false
    }
  }

  componentDidMount(){

    // get message
    // fetch('/api/account/' + this.props.id)
    //   .then(response => {
    //     return response.json()
    //   })
    //   .then(response => {
    //     this.setState({message: response})
    //   })
    //   .catch(error => {
    //     console.log(error)
    //     this.setState({error: error})
    //   })
      
  }

  decodeHex(messageParams){
    return ethUtil.toBuffer(messageParams).toString('utf8')
  }

  render() {
    return(
      
      <div>

        <h2>Account Settings</h2>

        <form className="pure-form">
          <fieldset>
            <label>Theme</label>
            <button className="pure-button">Light</button>
            <button className="pure-button">Dark</button>
          </fieldset>
          
          <fieldset>
            <label>Font Size</label>
            <button className="pure-button">Smaller</button>
            <button className="pure-button">Default</button>
            <button className="pure-button">Larger</button>            
          </fieldset>

          <button className="pure-button">Save</button>
        </form>

      </div>
    )
  }
}


export default DetailComponent
