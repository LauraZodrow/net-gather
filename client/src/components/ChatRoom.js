import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import io from 'socket.io-client'

let socket
if (process.env.NODE_ENV === 'production') {
    socket = io.connect('https://net-gather.herokuapp.com/')
} else {
    socket = io.connect('http://localhost:3001/')
}

class ChatRoom extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      messages: [],
      displayJavascriptFeed: false,
      displayFeminismFeed: true
    };
  }

  componentDidMount() {
    socket.on('chat message', this.loadMessages)
  }

  loadMessages = (msg) => {
    this.setState({messages: this.state.messages.concat([msg])})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    socket.emit('chat message', this.state.value)
    this.setState({value: ''});
  }

  handleChange = (e) => {
    this.setState({value: e.target.value});
  }

  handleCloseModal = () => {
    this.props.setDisplayChatModal(false)
  }

  render() {
    return(
      <div className="chat-room-container">
        <div>
          <div onClick={this.handleCloseModal} className="close-modal">Close Chat</div>
          <ul className="chat-room-messages">
          { 
            this.state.messages.map( function(msg, index) {
              return <li key={ index }>{ msg }</li>
            })
          }
          </ul>
          <form onSubmit={this.handleSubmit}>
            <input onChange={this.handleChange} value={this.state.value} placeholder="Type here and press send to chat..." className="message-input" autoComplete="off" />
            <input className="submit-btn" type="submit" value="Send" />
          </form>
        </div>
      </div>
    )
  }
}

export default ChatRoom