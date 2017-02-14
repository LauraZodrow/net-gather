import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class View extends Component {
  render() {
    return(
      <footer className="footer">
        <p className="footer-heading">Designed and Developed by Laura Zodrow</p>
        <a target="_blank" className="white-round-btn" href="https://github.com/LauraZodrow/net-gather"><i className="fa fa-github" aria-hidden="true"></i>Github</a>
        <a target="_blank" className="white-round-btn" href="https://www.linkedin.com/in/laurazodrow"><i className="fa fa-linkedin-square" aria-hidden="true"></i>LinkedIn</a>
        <div className="contact-link">
            <a href="mailto:laura.zodrow@gmail.com?Subject=Net-Gather%20Website">Contact me</a>
        </div>
        <p className="disclaimer-heading">Disclaimer</p>
        <p className="disclaimer">Using cat placeholder if image not available</p>
        <p className="disclaimer">Currently only desktop friendly (mobile to come)</p>
      </footer>
    )
  }
}

export default View