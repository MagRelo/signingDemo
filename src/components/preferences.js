import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'

import {
  loadPreferences, 
  savePreferences, 
  clearPreferences, 
  savePreferences_server,
  clearPreferences_server } from '../reducers/user'

const buttonGrid = {
  'display': 'grid',
  'gridTemplateRows': '1fr',
  'gridTemplateColumns': '1fr 1fr 1fr',
  'margin': '0.5em 0 1em'
}
class DetailComponent extends Component {
  constructor(props){
    super(props)

    this.state = {}
  }

  componentDidMount(){
    this.props.loadPreferences()

    // get prefs from server(?)
  }

  setPreference(type, value){
    // auto-save in local storage
    this.props.savePreferences({[type]: value })    
  }

  syncToCloud(){
    // save to server
    this.props.savePreferences_server({text: this.props.text, theme: this.props.theme})   
  }


  clearCloud(){
    // save to server
    this.props.clearPreferences_server()   
  }

  
  setActive(type, value){
    if(this.props[type] === value){
      return 'pure-button pure-button-active'
    }
    return 'pure-button'
  }
  
  render() {
    return(

      <div>

        <h1> <Link to="/">Demos</Link>&nbsp;> Preferences </h1>
        <hr/>
        <p>
          We'll automatically save the data on the user's device using the public key as an identifier.
        </p>
        <p>
          For saving to the cloud we'll require that the user digitally 
          sign the message so that we can use the signature for authentication on the server.
        </p>
        
        <h2>Preferences</h2>
        <label className="label-upper">Text Size</label>
        <div style={buttonGrid}>
          <button 
            onClick={this.setPreference.bind(this, 'text', 'smaller')}
            className={this.setActive('text', 'smaller')}>Smaller
          </button>
          <button 
            onClick={this.setPreference.bind(this, 'text', 'medium')}
            className={this.setActive('text', 'medium')}>Default
          </button>
          <button 
            onClick={this.setPreference.bind(this, 'text', 'larger')}
            className={this.setActive('text', 'larger')}>Larger
          </button>
        </div>      

        <label className="label-upper">Theme</label>
        <div style={buttonGrid}>
          <button 
            onClick={this.setPreference.bind(this, 'theme', 'light')}
            className={this.setActive('theme', 'light')}>Default
          </button>
          <button 
            onClick={this.setPreference.bind(this, 'theme', 'dark')}
            className={this.setActive('theme', 'dark')}>Dark
          </button>
        </div>

        <h2>Manage Data</h2>        
        
        <p style={{lineHeight: '35px'}}>Device Data:
          {this.props.clientSaved ?

            <span>
              <button
                className="pure-button"
                style={{float: 'right', verticalAlign: 'unset'}}
                disabled={!this.props.clientSaved}
                onClick={()=>{this.props.clearPreferences()}}>delete
              </button>
              <span className="label-upper" style={{float: 'right', marginRight: '0.5em'}}>saved <span style={{color: 'green'}}> ✓ </span> </span>
            </span>
            
          :
            <span className="label-upper" style={{float: 'right', marginRight: '0.5em'}}>(no data saved)</span>
          }

        </p>


        <p style={{lineHeight: '35px'}}>Cloud Data:          
          {this.props.serverSaved ? 
            <span>
              <button
                className="pure-button"
                style={{float: 'right', verticalAlign: 'unset'}}
                onClick={() => {this.clearCloud()}}>delete
              </button>         
              <span className="label-upper" style={{float: 'right', marginRight: '0.5em'}}>saved <span style={{color: 'green'}}> ✓ </span> </span> 
            </span>
          :          
            <button
              className="pure-button"
              style={{float: 'right', verticalAlign: 'unset'}}
              onClick={() => {this.syncToCloud()}}>sync to cloud
            </button>          
          }          
        </p>
        
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    clientSessionFound: false,
    serverSessionFound: false,
    clientSaved: state.user.clientSaved,
    serverSaved: state.user.serverSaved,
    text: state.user.text,
    theme: state.user.theme,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    savePreferences: (preferences) => { dispatch(savePreferences(preferences)) },
    loadPreferences: () => { dispatch(loadPreferences()) },
    clearPreferences: () => { dispatch(clearPreferences()) },
    savePreferences_server: (preferences) => { dispatch(savePreferences_server(preferences)) },
    clearPreferences_server: () => { dispatch(clearPreferences_server()) },
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(DetailComponent)

