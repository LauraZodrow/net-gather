import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import HeroSection from './components/HeroSection'
import { connect } from 'react-redux'
import { VIEW_ACTION_CREATORS } from './state/reducers/view_reducer'
import Footer from './components/Footer'
import Articles from './components/Articles'
import Events from './components/Events'
import './index.scss'

class Root extends Component {
  render() {
    return(
        <div className="slide-container">

          <HeroSection 
            view={ this.props.view } 
            twitterBtnText = { this.props.twitterBtnText }
            setTwitterBtnText= { this.props.setTwitterBtnText }
            setDisplayView={ this.props.setDisplayView } 
          />

          { this.props.displayView ? 
            <div>
              <Articles 
                view={ this.props.view } 
                data= { this.props.data }
                setData={ this.props.setData }
              />
              <Events/>
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
  twitterBtnText: PropTypes.string,
  setTwitterBtnText: PropTypes.func
}

function mapStateToProps(state) {
  return state.view
}

const mapDispatchToProps = VIEW_ACTION_CREATORS

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Root)