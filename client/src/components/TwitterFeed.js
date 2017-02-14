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
    twitterStatusMessage: 'Twitter feed is loading, please wait',
  }

  componentDidMount() {
    socket.on(this.props.stream, this.loadTwitterFeed)
    socket.on("limit", this.showFeedError)
  }

  componentWillUnmount() {
    socket.removeAllListeners(this.props.stream);
  }

  loadTwitterFeed = (tweet) => {
    const tweetArr = [tweet]
    const combineData = [tweetArr].concat(this.props.tweets);
    if (combineData.length >= 20) {
      const newArr = combineData.slice(0, 20)
      this.props.setTweets(newArr)
    } else {
      this.props.setTweets(combineData)
      this.setState({ twitterStatusMessage: null })
    }
  }

  showFeedError = () => {
      this.setState({ twitterStatusMessage: 'Twitter streaming limit hit, please try again later' })
  }

  render() {
    if(!this.props.tweets) {
      return null
    }
    return(
      <div>
          { this.state.twitterStatusMessage ? <p className="twit-status-msg">{ this.state.twitterStatusMessage }</p> : null }
          { this.props.tweets.map(function(tweet, index) {
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
    )
  }
}

export default TwitterFeed