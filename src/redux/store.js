// @flow
import { applyMiddleware, compose, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
// import thunk from 'redux-thunk';
import reducer from './reducers';
import epic from './epics';

const epicMiddleware = createEpicMiddleware();

const enhancers = [];
const middleware = [epicMiddleware]; //, thunk];

// eslint-disable-next-line
if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers,
);

const store = createStore(reducer, composedEnhancers);
epicMiddleware.run(epic);

export default store;
