// @flow
import { applyMiddleware, compose, createStore } from 'redux';
import reducer from '../components/Root/reducer';
import initialState from '../components/Root/state';
import thunk from 'redux-thunk';

const enhancers = [];
const middleware = [thunk];

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

const store = createStore(reducer, initialState, composedEnhancers);

export default store;
