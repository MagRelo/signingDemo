import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class MessageListComponent extends Component {

  // lifecycle
  componentDidMount(){
    this.scrollToBottom();    
  }
  componentDidUpdate() {
    this.scrollToBottom();
  }

  // keep the messages scrolled to bottom on each lifecyle event
  // https://stackoverflow.com/questions/37620694/how-to-scroll-to-bottom-in-react
  scrollToBottom() {
    this.el.scrollIntoView({ behavior: 'smooth' });
  }


  render() {
    return(
      <div style={{height: '100%', overflow: 'scroll'}}>  

        <ul id="message-list" className="chat-list">          
          {this.props.list.map( message => {
            return <li key={message._id}>                                    
                
                <time>{message.createdAt}</time>

                <p>{message.content}</p>
    
                <div style={{textAlign: 'right'}}>
                  <Link to={'/message/' + message._id}>
                    <label className="label-upper">
                      {'🔒 ' + message.userAddress.substring(0,8) + '...'}
                    </label>
                  </Link>                    
                </div>
                
              </li>
          })}          
        </ul>

        <div ref={el => { this.el = el; }} />
      </div>
    )
  }
}


export default MessageListComponent
