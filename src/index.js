// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';

const root = document.getElementById('root');
if (!root) {
  throw new Error('Root element not found!');
}

ReactDOM.render(<App />, root);
