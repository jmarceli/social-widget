import React from 'react';
import Counter from './index';
import { render } from 'enzyme';
import theme from '../../../theme';
import { ThemeProvider } from 'react-jss';

describe('<Counter />', () => {
  it('renders without crashing', () => {
    const wrapper = render(
      <ThemeProvider theme={theme}>
        <Counter count={3} label="Something" />
      </ThemeProvider>,
    );
    expect(wrapper.text()).toContain('3');
    expect(wrapper.text()).toContain('Something');
  });
});
