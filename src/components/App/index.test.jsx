import React from 'react';
import { mount, shallow } from 'enzyme';
import { ThemeProvider } from 'react-jss';
import AppStyled, { App } from './index';
import Profile from '../Profile';
import theme from '../../theme';
import { loadData } from '../../dataSources';
jest.mock('../../dataSources');

const profileData = {
  imgSrc: './harvey-specter.jpg',
  name: 'Harvey Specter',
  city: 'New York',
  country: 'USA',
  likes: 121,
  following: 723,
  followers: 4433,
};
loadData.mockImplementation(() => profileData);

describe('<App />', () => {
  test('mounting without crash', async () => {
    const wrapper = await mount(
      <ThemeProvider theme={theme}>
        <AppStyled classes={{}} />
      </ThemeProvider>,
    );
    expect(wrapper.text()).toContain('Harvey Specter');
  });
});

describe('<App /> shallow', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(<App classes={{}} />);
  });

  test('props of Profile component', () => {
    const profile = wrapper.find(Profile);
    expect(profile.length).toBe(1);
    expect(profile.prop('data')).toEqual(profileData);
    expect(profile.prop('isFollowed')).toEqual(false);
    expect(profile.prop('isLiked')).toEqual(false);
  });
  test('state after componentDidMount', () => {
    expect(wrapper.state()).toEqual({
      data: profileData,
      isFollowed: false,
      isLiked: false,
    });
  });
  test('handleFollow() method', () => {
    wrapper.instance().handleFollow();
    expect(wrapper.state('isFollowed')).toBe(true);
    expect(wrapper.state('data').followers).toBe(profileData.followers + 1);
    wrapper.instance().handleFollow();
    expect(wrapper.state('isFollowed')).toBe(false);
    expect(wrapper.state('data').followers).toBe(profileData.followers);
  });
  test('handleLike() method', () => {
    wrapper.instance().handleLike();
    expect(wrapper.state('isLiked')).toBe(true);
    expect(wrapper.state('data').likes).toBe(profileData.likes + 1);
    wrapper.instance().handleLike();
    expect(wrapper.state('isLiked')).toBe(false);
    expect(wrapper.state('data').likes).toBe(profileData.likes);
  });
});
