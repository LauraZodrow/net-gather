import React, { Component } from 'react';
import client from '../utils/fetch_helper'
import Slider from './Slider'

class Articles extends Component {

  componentDidMount() {
    const view = this.props.view
    Promise.all([
      client.get('/nyt-articles/' + view).then(this.loadArticles),
      client.get('/medium/' + view).then(this.loadArticles)
    ])
    .then(response => {
      console.log('Data from mount!', this._unmounted)
      if (this._unmounted) {
        return
      }
      return this.props.setData(response)
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.view !== this.props.view) {
      const view = nextProps.view
      Promise.all([
        client.get('/nyt-articles/' + view).then(this.loadArticles),
        client.get('/medium/' + view).then(this.loadArticles)
      ])
      .then(response => {
        return this.props.setData(response)
      })
    }
  }

  componentWillUnmount() {
    console.log('Gonezo')
    this._unmounted = true
  }

  loadArticles = (response) => {
    return response
  }

  render() {
    if (this.props.data == null) {
      return null
    }
    return(
      <div>
        { this.props.data.map( (item, index) => {
            return (
              <Slider 
                key={ index } 
                title={ 'Recent '+ item.type + ' articles' } 
                data={ item.articles }
              />
            )
          })
        }
     </div>
    )
  }
}

export default Articles