import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class HomeComponent extends Component {
  render() {
    return(
      
      <div>

        <h1>Home</h1>
        
        <hr/>
        
        <h2>Account Management Demos</h2>
        <Link to="/admin"> Admin panel </Link>
        <p>No login necessary</p>        

        <Link to="/chat"> User Chat</Link>      
        <p>Normal account features like avatars and preferences.</p>
        
        <Link to="/login"> Login</Link>        
        <p>Create a session token (JWT) to let users "login" without needing an email or password</p>

        <hr/>

        <h2>Payments & Assets</h2>

        <Link to="/payment"> Payment demo </Link>        
        <p>Defer to the blockchain</p>
      
      </div>
    )
  }
}


export default HomeComponent
