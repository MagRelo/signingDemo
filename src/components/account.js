import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class DetailComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      
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

  render() {
    return(
      
      <div>

        <h1>
          <Link to="/">Home</Link> &nbsp;> Account
        </h1>
        <hr/>


        <h2>Preferences</h2>
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

        <h2>Create Session</h2>
        <button className="pure-button">Save</button>

      </div>
    )
  }
}


export default DetailComponent
