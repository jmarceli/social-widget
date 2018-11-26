import React from 'react';
import { render } from 'react-testing-library';
import { ThemeProvider } from 'react-jss';
import theme from '../src/theme';

const customRender = (node, options) => {
  return render(<ThemeProvider theme={theme}>{node}</ThemeProvider>, options);
};

// re-export everything
export * from 'react-testing-library';

// override render method
export { customRender as render };
