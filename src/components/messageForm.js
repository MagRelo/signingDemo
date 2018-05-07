import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import ethUtil  from 'ethereumjs-util'

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

  submitMessage(){

    const web3 = this.props.web3
    const userAddress = this.props.account

    const msg = ethUtil.bufferToHex(new Buffer(this.state.content, 'utf8'))
    const params = [msg, userAddress]

    console.group('Digital Signature');
    console.log('Message:')
    console.dir(params)

    web3.currentProvider.sendAsync({
        method: 'personal_sign',
        params: params,
        from: userAddress,
      }, (err, result) => {
        if (err) return console.error(err)
        if (result.error) return console.error(result.error.message)

        console.log('Signature: ')
        console.log(result.result)
        console.groupEnd();

        // send to server
        this.props.emitMessage(msg, result.result, this.state.content)

        this.setState({formOpen: false, content: ''})        
      })    
  }


  render() {
    return(
      <div style={{minHeight: '4em', marginTop: '1em'}}>

        {this.state.formOpen ? 

          <div>
            
            <div style={{textAlign: 'right', marginBottom: '0.5em'}}>
              <button 
                className="pure-button" 
                onClick={()=>{this.setState({formOpen: false})}}> close
              </button>
            </div>


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
                type="button" 
                style={{float: 'right', marginTop: '0.5em'}} 
                className="pure-button pure-button-primary pure-button-xlarge"
                disabled={!this.state.content}
                onClick={this.submitMessage.bind(this)}>Send</button>
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

const mapStateToProps = state => {
  return {
    web3: state.web3.instance,
    account: state.web3.accounts[0] || ''
  }
}
export default connect(mapStateToProps)(FormComponent)
