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
      error: ''
    }
  }

  componentDidMount(){
    this.props.loadSession()
  }

  logout(){
    this.props.clearSession()
  }

  createSession(duration){
    this.props.saveSession(duration)
  }

  render() {
    return(
      <div>

        <h1><Link to="/">Home</Link>&nbsp;> Login</h1>
        <hr/>
        
        {this.state.alert ? 

          <div style={{border: 'solid pink 1px', padding: '0.5em'}}>            
            <p>{this.state.error}</p>
            <button 
              className="pure-button"
              onClick={()=>{this.setState({alert: false})}}>Ok
            </button>
          </div>        

        :null}

        {this.props.expires ? 
        
          <div>
            <h2>Active Session</h2>
            <p>Expires: {moment(this.props.expires).fromNow()}</p>
            <button
              name="90"
              type="button"
              className="pure-button pure-button-primary"
              onClick={this.logout.bind(this)}> logout
            </button> 

          </div>         
          
        :                
          <div>
            <h2>Create a session token</h2>
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

      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    expires: state.user.expires
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    loadSession: () => {
      dispatch(loadSession())
    },
    saveSession: (duration) => {
      dispatch(saveSession(duration))
    },
    clearSession: () => {
      dispatch(clearSession())
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(LoginComponent)
