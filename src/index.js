// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root';

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
