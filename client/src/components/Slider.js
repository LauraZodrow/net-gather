import React, { Component } from 'react';
import client from '../utils/fetch_helper.js'
import _ from 'lodash'
import Slide from './Slide'

class Slider extends Component {

  state = {
    moveSliderAmount: 0,
    displayLeftArrow: false,
    displayRightArrow: true
  }


  handleMoveSlider = (arrow) => (e) => {
    e.preventDefault()

    const dataLength = Math.floor(this.props.data.length / 4) * -100 + 100

    const value = Number(arrow)
    const calc = this.state.moveSliderAmount + value

    if(this.state.moveSliderAmount === 0) {
      this.setState({ 
        moveSliderAmount: calc, 
        displayLeftArrow: true 
      })
    } else if (this.state.moveSliderAmount === -100 && arrow === 100) {
      this.setState({ 
        moveSliderAmount: calc, 
        displayLeftArrow: false 
      })
    } else if( dataLength === this.state.moveSliderAmount && arrow === -100) {
      this.setState({ 
        moveSliderAmount: calc, 
        displayRightArrow: false 
      })
    } else if (dataLength !== this.state.moveSliderAmount && arrow === 100) {
      this.setState({ 
        moveSliderAmount: calc, 
        displayRightArrow: true 
      })
    } else {
      this.setState({ moveSliderAmount: calc })
    }
  }

  render() {
    let moveSlideStyles = {
      transform: 'translate3d('+ this.state.moveSliderAmount +'%, 0px, 0px)'
    }
    return(
      <div className="slider-overflow">

        <h2>{ this.props.title }</h2>

        <div className="slider">

          { this.state.displayLeftArrow ? <button className="arrow-left" onClick={this.handleMoveSlider(100)}><i className="fa fa-arrow-circle-o-left fa-3x" aria-hidden="true"></i></button> : null }

          { this.state.displayRightArrow ? <button className="arrow-right" onClick={this.handleMoveSlider(-100)}><i className="fa fa-arrow-circle-o-right fa-3x" aria-hidden="true"></i></button> : null }

          <div style={ moveSlideStyles } className="slides-container">

            { this.props.data.map( ( arr, index ) => {
                return (
                  <Slide 
                    key = { index }
                    overlayColor = { arr[3] }
                    slideImage = { arr[2] }
                    slideLink = { arr[1] }
                    slideText = { arr[0] }
                  />
                )
            }) }

          </div>

        </div>

      </div>
    )
  }
}

export default Slider