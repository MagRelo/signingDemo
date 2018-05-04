import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class HomeComponent extends Component {
  render() {
    return(
      
      <div>

        <h1>Home</h1>
        
        <hr/>
        
        <h2>Web3 Account Management Demos</h2>

        <h3>User preferences (coming soon)</h3>
        <p>Automatically remember your user's preferences</p>        

        <h3> <Link to="/chat"> User Chat</Link> </h3>        
        <p>Live chat with verifiable messages</p>

        <h3>Admin panel (coming soon)</h3>
        <p>No login necessary</p>        
        
        <h3><Link to="/sessions"> Sessions</Link></h3>        
        <p>Create a session token to let users "login" without needing an email or password</p>

      </div>
    )
  }
}


export default HomeComponent
