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

        
        <Link to="/admin">
          <h2>Admin panel demo</h2>   
        </Link>
        <p>No login necessary</p>        


        <Link to="/chat">
          <h2>User Chat demo</h2>
        </Link>      
        <p>Get all of the normal account features like avatars, preferences, and follows with no login necessary.</p>
        
        
        <Link to="/login">
          <h2>Login demo</h2>
        </Link>        
        <p>Create a session token (JWT) to let users "login" without needing an email or password</p>

        <Link to="/login">
          <h2>Payment demo</h2>
        </Link>        
        <p>Defer to the blockchain</p>
      
      </div>
    )
  }
}


export default HomeComponent
