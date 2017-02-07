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
console.log('store:', store.getState(), store)
// const store = createStore(
//   rootReducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

if (process.env.NODE_ENV === 'production') {

  ReactDOM.render(
    <Provider store={store}>
      <Root />
    </Provider>
  , document.getElementById('react-root')
  );

} 
else {
  const render = Component => {
    ReactDOM.render((
      <AppContainer>
        <Provider store={store}>
          <Component />
        </Provider>
      </AppContainer>
    ), document.getElementById('react-root'))
  }

  render(Root)
  

  if (module.hot) {
  module.hot.accept('./Root.js', () => {
    console.log('Module hot reloading')
    const NewRoot = require('./Root.js').default;
    render(NewRoot)
  });
}

}

