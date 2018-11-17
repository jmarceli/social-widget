import React from 'react';
import { render, shallow } from 'enzyme';
import { ThemeProvider } from 'react-jss';
import App from './index';
import Profile from '../Profile';
import theme from '../../theme';

describe('<App />', () => {
  it('renders without crashing', () => {
    const wrapper = render(
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>,
    );
    expect(wrapper.text()).toContain('Harvey Specter');
  });
  it('has one Profile component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Profile).length).toBe(1);
  });
});
