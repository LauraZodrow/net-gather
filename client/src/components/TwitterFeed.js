import React, { Component } from 'react';
import _ from 'lodash'
import io from 'socket.io-client'

let socket
if (process.env.NODE_ENV === 'production') {
    socket = io.connect('https://net-gather.herokuapp.com/')
} else {
    socket = io.connect('http://localhost:3001/')
}

class TwitterFeed extends Component {

  state = {
    twitterData: [],
    showSideBar: false
  }

  componentDidMount() {
    socket.emit('start stream', { view: this.props.view })
    socket.on("new tweet", this.loadTwitterFeed)
    socket.on("twitter error", this.showFeedError)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.view !== this.props.view) {
      socket.emit('start stream', { view: this.props.view })
      socket.on("new tweet", this.loadTwitterFeed)
      socket.on("twitter error", this.showFeedError)
    }
  }

  loadTwitterFeed = (tweet) => {
    const tweetArr = [tweet]
    this.setState({ twitterData: [tweetArr].concat(this.state.twitterData) })
  }

  handleShowFeed = () => {
    this.setState({showSideBar: true})
  }

  showFeedError = () => {
      //TODO: display error messaging
  }

  handleCloseSidbar = () => {
    this.setState({showSideBar: false})
  }

  render() {
    return(
      <div>
       <button className="round-button twitter-feed-btn" onClick={ this.handleShowFeed }>See <span className="twitter-view">#{this.props.twitterBtnText}</span> Live</button>
       { this.state.showSideBar ? 
           <div className="twitterFeedSidebarContainer">
            <button className="close-sidebar" onClick={this.handleCloseSidbar} >X</button>
            {this.state.twitterData.map(function(tweet, index) {
                return  <div key={index} className="tweet">
                            <div className="profile-img">
                              <img src={ tweet[0][2] } />
                            </div>
                            <div className="text">
                              <p className="username">@{tweet[0][3]}</p>
                              {tweet[0][1] ? 
                                  <a href={tweet[0][1]}> {tweet[0][0]} </a>
                                  :
                                  <p>{tweet[0][0]}</p>
                              }
                            </div>
                        </div>
            })}
           </div>
         :
         null
       }
      </div>
    )
  }
}

export default TwitterFeed