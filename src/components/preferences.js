import React, { Component } from 'react'
import {Link} from 'react-router-dom'


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
      animal: '',
      vegtable: '',
      mineral: ''
    }
  }

  setActive(type, value){
    if(this.state[type] === value){
      return 'pure-button pure-button-active'
    }
    return 'pure-button'
  }

  setPreference(type, value){
    this.setState({ [type] : value})
  }

  render() {
    return(

      <div>

        <h1> <Link to="/">Demos</Link>&nbsp;> Preferences </h1>

        <hr/>
        <p></p>
        
        <h2>Preferences</h2>
        <label>Animal</label>
        <div style={buttonGrid}>
          <button 
            onClick={this.setPreference.bind(this, 'animal', 'bear')}
            className={this.setActive('animal', 'bear')}>Bear
          </button>
          <button 
            onClick={this.setPreference.bind(this, 'animal', 'eagle')}
            className={this.setActive('animal', 'eagle')}>Eagle
          </button>
          <button 
            onClick={this.setPreference.bind(this, 'animal', 'lion')}
            className={this.setActive('animal', 'lion')}>Lion
          </button>
        </div>      

        <label>Vegtable</label>
        <div style={buttonGrid}>
          <button 
            onClick={this.setPreference.bind(this, 'vegtable', 'carrot')}
            className={this.setActive('vegtable', 'carrot')}>Carrot
          </button>
          <button 
            onClick={this.setPreference.bind(this, 'vegtable', 'potato')}
            className={this.setActive('vegtable', 'potato')}>Potato
          </button>
          <button 
            onClick={this.setPreference.bind(this, 'vegtable', 'onion')}
            className={this.setActive('vegtable', 'onion')}>Celery
          </button>
        </div>      

        <label>Mineral</label>
        <div style={buttonGrid}>
          <button 
            onClick={this.setPreference.bind(this, 'mineral', 'serandite')}
            className={this.setActive('mineral', 'serandite')}>Serandite
          </button>
          <button 
            onClick={this.setPreference.bind(this, 'mineral', 'natrolite')}
            className={this.setActive('mineral', 'natrolite')}>Natrolite
          </button>
          <button 
            onClick={this.setPreference.bind(this, 'mineral', 'analcime')}
            className={this.setActive('mineral', 'analcime')}>Analcime
          </button>
        </div>     
        
      </div>
    )
  }
}


export default DetailComponent
