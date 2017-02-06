import React, { Component } from 'react'

class Slide extends Component {
  render() {
    const overlayColor = { backgroundColor: this.props.overlayColor }
    const bkgImg = { backgroundImage: 'url('+ this.props.slideImage +')' }
    return(
      <div key={ this.props.index } className="slide">
          <div className="color-overlay" style={overlayColor}/>
          <div className="bkg-img" style={bkgImg}></div>
          <div className="content-container" style={overlayColor}>
            <a className="content" target="_blank" href={this.props.slideLink}>{ this.props.slideText }</a>
          </div>
      </div>
    )
  }
}

export default Slide