import React, { Component } from 'react'
import { AppContainer } from 'react-hot-loader';
import ReactDOM from 'react-dom'
import Root from './Root'

if (process.env.NODE_ENV === 'production') {

  ReactDOM.render(
    <Root />
    , document.getElementById('root')
  );

} 
else {

  ReactDOM.render(
    <AppContainer>
      <Root />
    </AppContainer>
    , document.getElementById('root')
  );

  if (module.hot) {
    module.hot.accept('./Root.js', () => {
      const NewRoot = require('./Root.js').default;
      ReactDOM.render(
        <AppContainer>
          <NewRoot />
        </AppContainer>
        , document.getElementById('root')
      );
    });
  }

}

