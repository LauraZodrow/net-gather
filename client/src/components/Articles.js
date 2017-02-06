import React, { Component } from 'react';
import client from '../utils/fetch_helper'
import Slider from './Slider'

class Articles extends Component {

  componentDidMount() {
    const view = this.props.view
    client.get('/nyt-articles/' + view).then(this.loadEvents)
    client.get('/medium/' + view).then(this.loadEvents)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.view !== this.props.view) {
      const view = nextProps.view
      client.get('/nyt-articles/' + view).then(this.loadEvents)
    }
  }

  loadEvents = (response) => {
    this.props.setData(response)
  }

  render() {
    return(
      <div>
        <Slider title="Recent NYT articles" data={ this.props.data } />
        <Slider title="Recent Medium articles" data={this.props.data} />
      </div>
    )
  }
}

export default Articles