import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'

import Checkmark from './checkmark'
import {loadPreferences, savePreferences, clearPreferences } from '../reducers/user'

const Caption = ({label, caption, loading, children}) => {
  return (    
    <div>

      <span>{label}</span>
      
      <span>
        {caption}
        
        {loading ?         
          <div style={{display: 'inline-block', marginLeft: '0.5em'}}>
            <span className="small-spinner"></span>
          </div>          
        :null}

        {children}
      </span>

    </div>
  )
}

const buttonGrid = {
  'display': 'grid',
  'gridTemplateRows': '1fr',
  'gridTemplateColumns': '1fr 1fr 1fr',
  'margin': '0.5em 0 1em'
}
class DetailComponent extends Component {
  constructor(props){
    super(props)

    this.state = {      
      clientIsLoading: false,      
      clientIsDeleteing: false,       
      clientIsSaving: false,       
      clientSaved: true,          
      clientNoData: false,      

      serverIsLoading: true,
      serverLoaded: false,

      clientServerMismatch: true
    }
  }

  componentDidMount(){
    this.props.loadPreferences()

    // get prefs from server(?)
  }

  setPreference(type, value){
    const currentPrefs = {
      animal: this.props.animal,
      vegtable: this.props.vegtable,
      mineral: this.props.mineral
    }

    // merge with other prefs and auto-save in local storage
    this.props.savePreferences( Object.assign({}, currentPrefs, {[type]: value }))    
  }

  syncToCloud(){

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
          This demo shows how the user's public key can be used as a 
          unique identifier to save the user's preferences.
        </p>
        <p>
          We'll automatically save the data on the user's device.
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
            className={this.setActive('text', 'medium')}>Medium
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
            className={this.setActive('theme', 'light')}>Light
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
                onClick={()=>{this.props.clearPreferences()}}>delete data
              </button>
              <span className="label-upper" style={{float: 'right', marginRight: '0.5em'}}>saved <span style={{color: 'green'}}> ✓ </span> </span>
            </span>
            
          :
            <span className="label-upper" style={{float: 'right', marginRight: '0.5em'}}>(no data saved)</span>
          }

        </p>


        <p style={{lineHeight: '35px'}}>Cloud Data:          
          {this.props.serverSaved ? 
            <button
              className="pure-button"
              style={{float: 'right', verticalAlign: 'unset'}}
              onClick={() => {this.props.clearCloud()}}>{this.props.serverSaved ? 'delete data' : '(no data saved)'}
            </button>          
          :          
            <button
              className="pure-button"
              style={{float: 'right', verticalAlign: 'unset'}}
              disabled={!this.state.clientServerMismatch}
              onClick={() => {this.props.syncToCloud()}}>save data
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
    serverSaved: false,
    text: state.user.text,
    theme: state.user.theme,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    savePreferences: (preferences) => { dispatch(savePreferences(preferences)) },
    loadPreferences: () => { dispatch(loadPreferences()) },
    clearPreferences: () => { dispatch(clearPreferences()) }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(DetailComponent)

