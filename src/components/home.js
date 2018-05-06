import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class HomeComponent extends Component {
  render() {
    return(
      
      <div className="home">

        <h1>Digital Signature Demos</h1>
        
        <hr/>
        <p>
          We can use digital signatures in place of email and password 
          to reduce the amount of personal data is collected and stored.
        </p>        

        <h3> <Link to="/chat"> User Chat</Link> </h3>        
        <p className="demo-description">
          Live chat with verifiable messages
        </p>
        
        <h3><Link to="/preferences">User preferences</Link></h3>
        <p className="demo-description">
          Use the user's public key to remember their preferences without requiring the user to login.
        </p>        

        <h3><Link to="/admin">Admin panel</Link></h3>
        <p className="demo-description">
          Use digitally signed messages to restrict access to a server API without requiring the user to login.
        </p>        
        
        <h3><Link to="/sessions"> Sessions</Link></h3>        
        <p className="demo-description">
          Create a session token to let users "login" without needing an email or password.
        </p>

        <h3> <Link to="/chat"> Dead-man switch</Link> </h3>        
        <p className="demo-description">
          Periodically post a message to declare that you are not under duress. If the message 
          fails to appear then observers will know that something is wrong (
          <a href="https://www.theguardian.com/technology/2013/sep/09/nsa-sabotage-dead-mans-switch" target="_blank" rel="noopener noreferrer">as suggested </a>
          by Cory Doctrow.)
        </p>

      </div>
    )
  }
}


export default HomeComponent
