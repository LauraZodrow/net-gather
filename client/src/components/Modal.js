import React, { Component, PropTypes } from 'react';
import ReactModal from "react-modal"
import TwitterFeed from './TwitterFeed'
import ChatRoom from './ChatRoom'

const modalStyles = {
  overlay : {
    backgroundColor: 'rgba(26,26,26,0.9)',
    zIndex: 3,
    position: 'fixed',
    top: '0px',
    left: '0px',
    right: '0px',
    bottom: '0px',
  },
  content : {
    position: 'absolute',
    border: 'none',
    boxShadow: '0px 5px 13.5px 1.5px rgba(57, 57, 57, 0.15)',
    background: '#fff',
    borderRadius: '1px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    width: '95%',
    height: '90%',
    padding: '0px',
    transform: 'translate(-50%, -50%)',
    overflow: 'auto'
  }
};

const modalButtonStyles = {
  position: 'absolute',
  right: '10px',
  top: '10px'
}

class Modal extends Component {

  handleCloseModal = () => {
    this.props.setDisplayChatModal(false)
  }

  render() {
    return (
      <div>
        <ReactModal
          isOpen={this.props.displayChatModal}
          style={modalStyles}
          contentLabel="Modal"
        >
          <button style={ modalButtonStyles } onClick={ this.handleCloseModal }>X</button>
          {this.props.children}
        </ReactModal>
      </div>
    );
  }
}

export default Modal