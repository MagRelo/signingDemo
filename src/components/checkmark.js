import React, { Component } from 'react'

class CheckmarkComponent extends Component {

  render() {
    return(                      
      <span className="checkmark">
        {this.props.boolean ? 
          <span style={{color: 'green'}}> ✓ </span>
          :
          <span style={{color: 'red'}}> ✘ </span> 
        }
      </span>
    )
  }
}


export default CheckmarkComponent
