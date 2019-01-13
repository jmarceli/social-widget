// @flow
import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'react-jss';

import store from '../../redux/store';
import App from '../App';
import theme from '../../theme';

const Root = ({ url }: { url: string }) => (
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App dataUrl={url} />
    </Provider>
  </ThemeProvider>
);

export default Root;
