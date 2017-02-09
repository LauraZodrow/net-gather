import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class View extends Component {
  render() {
    return(
      <footer className="footer">
        <p className="footer-heading">Designed and Devoloped by Laura Zodrow</p>
        <a target="_blank" className="white-round-btn" href="https://github.com/LauraZodrow/net-gather"><i className="fa fa-github" aria-hidden="true"></i>Github</a>
        <a target="_blank" className="white-round-btn" href="https://www.linkedin.com/in/laurazodrow"><i className="fa fa-linkedin-square" aria-hidden="true"></i>LinkedIn</a>
        <div className="contact-link">
            <a href="mailto:laura.zodrow@gmail.com?Subject=Net-Gather%20Website">Contact me</a>
        </div>
      </footer>
    )
  }
}

export default View