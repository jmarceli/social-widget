import React from 'react';
import { render } from 'react-testing-library';
import { ThemeProvider } from 'react-jss';
import { Provider } from 'react-redux';
import theme from '../src/theme';

const customRender = (node, options) => {
  const rendered = render(
    <ThemeProvider theme={theme}>
      {node.props && node.props.store ? (
        <Provider store={node.props.store}>{node}</Provider>
      ) : (
        node
      )}
    </ThemeProvider>,
    options,
  );
  return {
    ...rendered,
    rerender: (ui, options) =>
      customRender(ui, { container: rendered.container, ...options }),
  };
};

// re-export everything
export * from 'react-testing-library';

// override render method
export { customRender as render };
