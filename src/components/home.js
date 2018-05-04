import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class HomeComponent extends Component {
  render() {
    return(
      
      <div>

        <h1>Home</h1>
        
        <hr/>
        
        <h2>Web3 Account Management Demos</h2>
        <Link to="/admin"> Admin panel </Link>
        <p>No login necessary</p>        

        <Link to="/admin"> User preferences </Link>
        <p>Automatically remember users</p>        

        <Link to="/chat"> User Chat</Link>      
        <p>Live chat with verifiable messages</p>
        
        <Link to="/sessions"> Sessions</Link>        
        <p>Create a session token to let users "login" without needing an email or password</p>

      </div>
    )
  }
}


export default HomeComponent
