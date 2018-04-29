import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

class MessageListComponent extends Component {


  // keep the messages scrolled to bottom on each lifecyle event
  // https://stackoverflow.com/questions/37620694/how-to-scroll-to-bottom-in-react
  componentDidMount(){
    this.scrollToBottom();    
  }
  componentDidUpdate() {
    this.scrollToBottom();
  }
  scrollToBottom() {
    this.el.scrollIntoView({ behavior: 'smooth' });
  }

  render() {
    return(
      <div style={{height: '100%', overflow: 'scroll'}}>  

        <ul id="message-list" className="chat-list">          
          {this.props.list.map( message => {
            return <li key={message._id}>                                    
                
                <time>{moment(message.createdAt).fromNow()}</time>

                <div style={{float: 'right'}}>
                  <Link to={'/message/' + message._id} style={{textDecoration: 'none'}}>
                    <label className="label-upper">
                      Verify                      
                    </label>
                  </Link>                    
                </div>

                <div>
                  <p>{message.content}</p>

                  <div style={{textAlign: 'right'}}>                  
                    {'– ' + message.userAddress.substring(0,8) + '...'}                  
                  </div>
                </div>
                
              </li>
          })}          
        </ul>

        <div style={{minHeight: '5em'}} ref={el => { this.el = el; }} />
      </div>
    )
  }
}


export default MessageListComponent
