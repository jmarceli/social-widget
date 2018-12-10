// @flow
import React from 'react';
import { ThemeProvider } from 'react-jss';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import App from '../App';
import theme from '../../theme';

const Root = ({ url }: { url: string }) => (
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App
        getState={state => state.app}
        wrapType={type => `app.${type}`}
        dataUrl={url}
      />
    </Provider>
  </ThemeProvider>
);

export default Root;
