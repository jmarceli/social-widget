// @flow
import React from 'react';
import { ThemeProvider } from 'react-jss';
import App from '../App';
import theme from '../../theme';

const Root = () => (
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);

export default Root;
