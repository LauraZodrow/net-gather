import React, { Component } from 'react';
import io from 'socket.io-client'
import Tweets from './Tweets'

let socket
if (process.env.NODE_ENV === 'production') {
    socket = io.connect('https://net-gather.herokuapp.com/')
} else {
    socket = io.connect('http://localhost:3001/')
}

class TwitterFeed extends Component {

  state = {
    twitterData: [],
    showSideBar: false,
    waitingMessage: true
  }

  componentDidMount() {
    socket.emit('start-stream', this.props.view)
    socket.on('connected', function (currentKeyword) {
      //console.log('currentKeyword', currentKeyword)
    })
    socket.on("twitter-stream", this.loadTwitterFeed)
    socket.on("twitter error", this.showFeedError)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.view !== this.props.view) {
      this.setState( { twitterData: [], waitingMessage: true } )
      socket.emit('keyword-change', nextProps.view )
    }
  }

  loadTwitterFeed = (tweet) => {
    const tweetArr = [tweet]
    const combineData = [tweetArr].concat(this.state.twitterData);
    if (combineData.length >= 20) {
      const newArr = combineData.slice(0, 20)
      this.setState({ twitterData: newArr })
    } else {
      this.setState({ twitterData: combineData, waitingMessage: false })
    }
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
            { this.state.waitingMessage ? <p className="twit-waiting-msg">Twitter feed is loading, please wait</p> : null}
            { this.state.twitterData.map(function(tweet, index) {
                return (
                  <Tweets
                    key={ index }
                    imageUrl={ tweet[0][2] }
                    username={ tweet[0][3] }
                    link={ tweet[0][1] }
                    content={ tweet[0][0] }
                  />
                )
              })
            }
           </div>
         :
         null
       }
      </div>
    )
  }
}

export default TwitterFeed