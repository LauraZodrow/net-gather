import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import HeroSection from './components/HeroSection'
import { connect } from 'react-redux'
import { VIEW_ACTION_CREATORS } from './state/reducers/view_reducer'
import View from './components/View'

class Root extends Component {
  render() {
    return(
        <div>

          <HeroSection 
            displayView={this.props.displayView} 
            view={this.props.view} 
            setDisplayView={ this.props.setDisplayView } 
          />

          { this.props.displayView ? 
            <View 
              view={this.props.view} 
              data={this.props.data} 
              setData={this.props.setData} 
            /> 
          : null }

        </div>
    )
  }
}

Root.propTypes = {
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
)(Root)