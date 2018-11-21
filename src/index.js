// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root';
import './index.css';

const root = document.getElementById('root');
if (!root) {
  throw new Error('Root element not found!');
}

const elements = document.querySelectorAll('[data-root]');

elements.forEach(element => {
  const url = element.getAttribute('data-url');
  if (url) {
    ReactDOM.render(<Root url={url} />, element);
  }
});

/* eslint-disable */
// $FlowFixMe
if (module.hot) {
  module.hot.accept('./components/Root', () => {
    const NextRoot = require('./components/Root').default;
    elements.forEach(element => {
      const url = element.getAttribute('data-url');
      if (url) {
        ReactDOM.render(<Root url={url} />, element);
      }
    });
  });
}
