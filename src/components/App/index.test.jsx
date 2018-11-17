import React from 'react';
import { render, shallow } from 'enzyme';
import { ThemeProvider } from 'react-jss';
import AppStyled, { App } from './index';
import Profile from '../Profile';
import theme from '../../theme';

describe('<App />', () => {
  it('renders without crashing', () => {
    const wrapper = render(
      <ThemeProvider theme={theme}>
        <AppStyled classes={{}} />
      </ThemeProvider>,
    );
    expect(wrapper.text()).toContain('Harvey Specter');
  });
  it('has one Profile component', () => {
    const wrapper = shallow(<App classes={{}} />);
    expect(wrapper.find(Profile).length).toBe(1);
  });
});
