import React from 'react';
import { mount, shallow } from 'enzyme';
import { ThemeProvider } from 'react-jss';
import AppStyled, { App } from './index';
import Profile from '../Profile';
import theme from '../../theme';
import { loadData } from '../../dataSources';
jest.mock('../../dataSources');

loadData.mockImplementation(() => ({
  imgSrc: './harvey-specter.jpg',
  name: 'Harvey Specter',
  city: 'New York',
  country: 'USA',
  likes: 121,
  following: 723,
  followers: 4433,
}));

describe('<App />', () => {
  it('renders without crashing', async () => {
    const wrapper = await mount(
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
