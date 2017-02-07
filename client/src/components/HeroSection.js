import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import heroImg from '../assets/blackandwhitehero.jpg'
import setLocalStorage from '../utils/setLocalStorage'

class HeroSection extends Component {

  handleViewSwitch = (view) => () => {
      setLocalStorage(view)
      this.props.setDisplayView(view)
  }

  render() {
    const heroImage = heroImg || '/img/blackandwhitehero.jpg'
    const heroStyles = {
      backgroundImage: 'url('+ heroImage +')'
    }
    return(
      <div style={ heroStyles } className="hero-container">
          <div className="center-text">
            <h1>I'm interested in coding and feminism.</h1>
            <p>binge <span className="line-through">watch</span> read</p>
            <div>
              <button onClick={ this.handleViewSwitch('coding') } className="round-button">Coding</button>
              <button onClick={ this.handleViewSwitch('feminism') } className="round-button">Feminism</button>
            </div>
          </div>
      </div>
    )
  }
}

export default HeroSection