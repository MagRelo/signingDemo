import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import moment from 'moment'
import {loadSession, saveSession, clearSession } from '../reducers/user'


class LoginComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      alert: false,
      error: '',
      messages: []
    }
  }

  componentDidMount(){
    this.props.loadSession()
  }

  logout(){
    this.setState({messages: []})
    this.props.clearSession()
  }

  createSession(duration){
    this.props.saveSession(duration)
  }

  getMessages(){

    const servesaHeader = JSON.stringify({
      message: this.props.message,
      signature: this.props.signature
    })
      
    return fetch('/api/userdata', {
      method: 'GET',
      headers: {'x-servesa': servesaHeader}
    })
    .then(response => {
      if(response.status === 401){
        this.props.clearSession()
        this.setState({alert: true, error: '401 - Unauthorized'})
        return []
      }
            
      return response.json()
    })
    .then(responseBody => {
      this.setState({messages: responseBody})
    })


  }

  render() {
    return(
      <div>

        <h1><Link to="/">Home</Link>&nbsp;> Sessions</h1>
        <hr/>
        
        <h2>User Session</h2>
        <p>Status: {this.props.expires ? 'Active' : 'Not active'}</p>
        {this.props.expires ?
          <p>Expires: {moment(this.props.expires).format('llll')}</p>
        :null}

        {this.props.expires ? 
        
          <div>
            <button
              name="90"
              type="button"
              className="pure-button"
              onClick={this.logout.bind(this)}> logout
            </button> 
          </div>         
          
        :                

          <div>
            <button
              name="1"
              type="button"
              className="pure-button pure-button-primary"
              onClick={this.createSession.bind(this, 1)}>1 minute
            </button>
            <button
              name="30"
              type="button"
              className="pure-button pure-button-primary"
              onClick={this.createSession.bind(this, 30)}>30 minutes
            </button>
            <button
              name="90"
              type="button"
              className="pure-button pure-button-primary"
              onClick={this.createSession.bind(this, 90)}>90 minutes
            </button>
          </div>

        }

        <hr/>
        <button
          name="90"
          type="button"
          className="pure-button pure-button-primary"
          onClick={this.getMessages.bind(this)}>Get User Messages</button>     

        
        <ul>
          {this.state.messages.map(message => {
            return <li key={message._id}>{message.content}</li>
          })}
        </ul>
        

        {this.state.alert ? 

          <div style={{border: 'solid pink 1px', padding: '0.5em', marginTop: '1em'}}>            
            <p>{this.state.error}</p>
            <button 
              className="pure-button"
              onClick={()=>{this.setState({alert: false})}}>Ok
            </button>
          </div>        

        :null}

      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    expires: state.user.expires,
    message: state.user.message, 
    signature: state.user.signature
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    saveSession: (duration) => { dispatch(saveSession(duration)) },
    loadSession: () => { dispatch(loadSession()) },
    clearSession: () => { dispatch(clearSession()) }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(LoginComponent)
