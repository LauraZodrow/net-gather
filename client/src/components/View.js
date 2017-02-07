import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import HeroSection from './HeroSection'
import { connect } from 'react-redux'
import { VIEW_ACTION_CREATORS } from '../state/reducers/view_reducer'
import Footer from './Footer'
import Articles from './Articles'
import Events from './Events'

class View extends Component {
  render() {
    console.log('displayView in View:', this._reactInternalInstance._debugID, this.props.initiated)
    return(
        <div>

          <HeroSection 
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

View.propTypes = {
  displayView: PropTypes.bool,
  view: PropTypes.string,
  setDisplayView: PropTypes.func,
  data: PropTypes.array,
  setData: PropTypes.func
}

function mapStateToProps(state) {
  return state.view
}

const mapDispatchToProps = VIEW_ACTION_CREATORS

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View)