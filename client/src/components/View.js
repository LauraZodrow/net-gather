import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Articles from './Articles'

class View extends Component {
  render() {
    return(
      <div>
        <Articles view={ this.props.view } data={ this.props.data } setData={ this.props.setData }/>
      </div>
    )
  }
}

export default View