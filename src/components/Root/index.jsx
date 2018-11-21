// @flow
import React from 'react';
import { ThemeProvider } from 'react-jss';
import App from '../App';
import theme from '../../theme';

const Root = ({ url }: { url: string }) => (
  <ThemeProvider theme={theme}>
    <App dataUrl={url} />
  </ThemeProvider>
);

export default Root;
