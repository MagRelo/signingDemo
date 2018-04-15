import React, { Component } from 'react'
import { Router, Route, Link } from 'react-router-dom'

class DetailComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      message: {},
      ressponse: {test: 'test'}
    }
  }

  render() {
    return(
      <div>
                    
        <button 
          className="pure-button pure-button-primary"
          onClick={()=>{this.setState({viewDetail: false, selectedMessage: {}})}}>back
        </button>

        <hr></hr>

        <h2>Message Data</h2>

        <label className="label-upper">Message Content</label>
        <div className="message-data">
          <p>{this.state.selectedMessage.content}</p>
        </div>

        <label className="label-upper">User Address</label>
        <div className="message-data">
          <p>{this.state.selectedMessage.userAddress}</p>
        </div>              

        <label className="label-upper">Signature</label>
        <div className="message-data">
          <p>{this.state.selectedMessage.signature}</p>
        </div>

        <label className="label-upper">Message Parameters</label>
        <div className="message-data">
          <p>{this.state.selectedMessage.messageParams.toString()}</p>
        </div>

        <h2>Verify</h2>
        <p>You can calculate the user address that created this message to ensure that it has not been tampered with.</p>
        <button className="pure-button pure-button-primary">verify</button>
      </div>
    )
  }
}


export default DetailComponent
