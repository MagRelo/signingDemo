import React, { Component } from 'react'
import {Link} from 'react-router-dom'

import settingsIcon from '../icon/gear-icon.svg'
import composeIcon from '../icon/compose-outline.svg'


const loremIpsum = `Lorem ipsum dolor sit amet, deserunt gloriatur consetetur nam ut, harum numquam ex vim. Pri tale iisque oportere ad, ius fabulas scaevola ei. Ad est omnium nonumes. Mea postulant reprimique in, in euismod accusata moderatius vim, mel atqui quaerendum no.
Ad ridens numquam vis, putant tritani minimum eum no. Cum at aeterno consectetuer. Eu vim adhuc audiam prompta. Mea alia graeci eu, verear commodo ad vis.`
const hindiIpsum = `आधुनिक सभिसमज विशेष अपनि नवंबर सके। तकनिकल वास्तव यायेका बारे स्थिति हुआआदी भाषाओ जागरुक अन्तरराष्ट्रीयकरन करती चुनने नाकर विकसित हार्डवेर अर्थपुर्ण बाटते डाले। जाने पासपाई विभाजन परिभाषित ब्रौशर जागरुक दर्शाता बनाकर कलइस सभीकुछ दर्शाता केन्द्रित आजपर बढाता`
const chineseIpsum = `点志友池達図獲正終罪業定越運左強。栄線日市賀暮第北能聞局悪意。最場告量全巨毛芸草歳数宿帯。査橋見正図身敵文提弁行止高政集覧厳記一愛。古囲少軽計民済載指三文流細。報費井調変克広同思際上田勢古手対括。取囲北受気売早匿属歩篠熱空港転断無。北抗届題企州無交犯理文質負般十当間浜。志計要見将職朝善質玉格更`

class FormComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      content: '' 
    }
  }

  // Form functions
  handleChange(event) {
    event.preventDefault()
    let message = event.target.value

    if(event.target.value === 'li:' || event.target.value === 'Li:'){
      message = loremIpsum
    }
    if(event.target.value === 'hi:' || event.target.value === 'Hi:'){
      message = hindiIpsum
    }   
    if(event.target.value === 'ci:' || event.target.value === 'Ci:'){
      message = chineseIpsum
    }   

    this.setState({[event.target.name]: message})
  }

  render() {
    return(
      <div style={{minHeight: '5em'}}>

        {this.state.formOpen ? 

          <div>
            
            <button 
              className="pure-button" 
              onClick={()=>{this.setState({formOpen: false})}}> X
            </button>

            <div className="grey-border top" style={{padding: '0.5em'}}>          
              <Link to="account">
                <img style={{maxHeight: '1em', float: 'right', paddingTop: '0.1em'}} src={settingsIcon} alt="account settings icon"></img>
              </Link>          
              <label className="label-upper">Account: {this.props.account.substring(0,8)}... </label>               
            </div>

            <form className="pure-form chat-form">
              <label style={{display: 'none'}} htmlFor="content">Content Input</label>
              <textarea 
                rows="3"
                className="pure-input"
                placeholder="(type li:, hi:, or ci: for lorum ipsum)"
                value={this.state.content}
                name="content"
                onChange={this.handleChange.bind(this)}/>
              <button 
                style={{float: 'right', marginTop: '0.5em'}} 
                className="pure-button pure-button-primary pure-button-xlarge"
                disabled={!this.state.content}
                onClick={()=>{this.props.submit(this.state.content)}}>Send</button>
            </form>

          </div>

        :
          
          <button 
            className="pure-button pure-button-primary compose-button" 
            onClick={()=>{this.setState({formOpen: true})}}>
              <img 
                style={{height: '1.5em'}} 
                src={composeIcon} 
                alt="compose message icon"></img>
          </button>
          
        }

      </div>
    )
  }
}

export default FormComponent
