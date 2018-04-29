import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class HomeComponent extends Component {
  render() {
    return(
      
      <div>

        <h1>Home</h1>
        
        <hr/>
        
        <h2>Account Management</h2>
        <Link to="/admin"> Admin panel demo </Link>
        <p>No login necessary</p>        

        <Link to="/chat"> User Chat demo </Link>      
        <p>Normal account features like avatars and preferences.</p>
        
        <Link to="/login"> Login demo </Link>        
        <p>Create a session token (JWT) to let users "login" without needing an email or password</p>

        <hr/>

        <Link to="/payment"> Payment demo </Link>        
        <p>Defer to the blockchain</p>
      
      </div>
    )
  }
}


export default HomeComponent
