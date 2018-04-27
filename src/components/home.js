import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class HomeComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  componentDidMount(){

    // get message
    // fetch('/api/message/' + this.props.id)
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

  render() {
    return(
      
      <div>

        <h1>Home</h1>
        <hr/>
        
        <h2>Account Management</h2>
        <Link to="/admin">
          <h3>Admin panel demo</h3>   
        </Link>
        <p>No login necessary</p>        


        <Link to="/chat">
          <h3>User Chat demo</h3>
        </Link>      
        <p>Normal account features like avatars and preferences.</p>
        
        <Link to="/chat">
          <h3>Private Messaging</h3>
        </Link>      
        <p>Send and recieve private messages.</p>
        
        <Link to="/login">
          <h3>Login demo</h3>
        </Link>        
        <p>Create a session token (JWT) to let users "login" without needing an email or password</p>

        <hr/>
        <Link to="/payment">
          <h3>Payment demo</h3>
        </Link>        
        <p>Defer to the blockchain</p>
      
      </div>
    )
  }
}


export default HomeComponent
