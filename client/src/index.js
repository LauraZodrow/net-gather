import React, { Component } from 'react'
import { AppContainer } from 'react-hot-loader';
import ReactDOM from 'react-dom'
import Root from './Root'
import { Provider } from 'react-redux'
import configureStore from './state/configureStore'

// const view = localStorage.getItem('view')
// let displayView = false
// if (view) {
//   displayView = true
// } 

// const initialState = {
//   view: {
//       displayView: displayView,
//       view: view,
//       data: []
//     }
// }
const store = configureStore()

if (process.env.NODE_ENV === 'production') {

  ReactDOM.render(
    <Provider store={store}>
      <Root />
    </Provider>
  , document.getElementById('root')
  );

} 
else {

  ReactDOM.render((
    <AppContainer>
      <Provider store={store}>
        <Root />
      </Provider>
    </AppContainer>
  ), document.getElementById('root'))
  

  if (module.hot) {
    module.hot.accept('./Root.js', () => {
      const NewRoot = require('./Root.js').default;
      ReactDOM.render(
        <AppContainer>
          <Provider store={store}>
            <NewRoot />
          </Provider>
        </AppContainer>
        , document.getElementById('root')
      );
    });
  }

}

