import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import HeroSection from './components/HeroSection'
import { connect } from 'react-redux'
import { VIEW_ACTION_CREATORS } from './state/reducers/view_reducer'
import Footer from './components/Footer'
import Articles from './components/Articles'
import Events from './components/Events'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Modal from './components/Modal'
import ChatRoom from './components/ChatRoom'
import TwitterFeed from './components/TwitterFeed'
import './index.scss'

class Root extends Component {
  render() {
    return(
        <div className="view-container">

            <HeroSection 
              view={ this.props.view } 
              setDisplayView={ this.props.setDisplayView }
              displayChatModal = { this.props.displayChatModal }
              setDisplayChatModal={ this.props.setDisplayChatModal }
            />

          { this.props.displayView ? 
            <div>
              <Articles 
                view={ this.props.view } 
                data= { this.props.data }
                setData={ this.props.setData }
              />
              <Events/>
              <Modal
                displayChatModal={ this.props.displayChatModal }
                setDisplayChatModal={ this.props.setDisplayChatModal }
              >
                <div className="twitter-feed-left-sidebar">
                  <div className="sidebar-feminism">#Feminism</div>
                  <TwitterFeed 
                    stream='twitter-feminism-stream'
                    tweets={this.props.feminismTweets} 
                    setTweets={this.props.setFeminismTweets} 
                    data={ this.props.feminismTweets }
                  />
                </div>
                <ChatRoom 
                  setDisplayChatModal={ this.props.setDisplayChatModal }
                />
                <div className="twitter-feed-right-sidebar">
                  <button className="sidebar-javascript">#Javascript</button>
                  <TwitterFeed 
                    stream='twitter-javascript-stream'
                    tweets={ this.props.javascriptTweets } 
                    setTweets={this.props.setJavascriptTweets} 
                    data={ this.props.javascriptTweets }/>
                </div>
              </Modal>

              <Footer/>
            </div>
            : null
          }

        </div>
    )
  }
}

Root.propTypes = {
  displayView: PropTypes.bool,
  view: PropTypes.string,
  setDisplayView: PropTypes.func,
  data: PropTypes.array,
  setData: PropTypes.func,
  displayChatModal: PropTypes.bool,
  setDisplayChatModal: PropTypes.func,
  setJavascriptTweets: PropTypes.func,
  setFeminismTweets: PropTypes.func,
  feminismTweets: PropTypes.array,
  javascriptTweets: PropTypes.array
}

function mapStateToProps(state) {
  return state.view
}

const mapDispatchToProps = VIEW_ACTION_CREATORS

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Root)