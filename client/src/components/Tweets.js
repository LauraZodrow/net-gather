import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class Tweets extends Component {
  render() {
    return(
      <div key={this.props.index} className="tweet">
        <div className="profile-img">
            <img src={ this.props.imageUrl } />
        </div>
        <div className="text">
            <p className="username">@{this.props.username}</p>
            {this.props.link ? 
                <a href={this.props.link}> {this.props.content} </a>
                :
                <p>{this.props.content}</p>
            }
        </div>
    </div>
    )
  }
}

export default Tweets