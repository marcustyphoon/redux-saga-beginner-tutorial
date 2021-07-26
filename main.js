import "babel-polyfill"

import React from 'react'
import ReactDOM from 'react-dom'

import Counter from './Counter'
import reducer from './reducers'

// ...
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

// ...
import rootSaga from './sagas'

console.log(rootSaga);

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(rootSaga)

const action = type => store.dispatch({type})

function render() {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      start={() => action('START')} />,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)
