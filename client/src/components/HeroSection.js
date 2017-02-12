import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import heroImg from '../assets/hero-color.jpg'
import setLocalStorage from '../utils/setLocalStorage'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import TwitterFeed from './TwitterFeed'

class HeroSection extends Component {

  handleViewSwitch = (view) => () => {
      setLocalStorage(view)
      this.props.setDisplayView(view)
      this.props.setTwitterBtnText(view)
  }

  render() {
    const heroImage = heroImg || '/img/hero-color.jpg'
    const heroStyles = {
      backgroundImage: 'url('+ heroImage +')'
    }
    return(
        <div style={ heroStyles } className="hero-container">
          <TwitterFeed view={ this.props.view } twitterBtnText={this.props.twitterBtnText} />
          <div className="center-text">
            <h1>I'm interested in coding and feminism.</h1>
            <p className="sub-heading">binge <span className="line-through">watch</span> read</p>
            <div>
              <button onClick={ this.handleViewSwitch('javascript') } className="round-button">Javascript</button>
              <button onClick={ this.handleViewSwitch('feminism') } className="round-button">Feminism</button>
            </div>
          </div>
        </div>
    )
  }
}

export default HeroSection