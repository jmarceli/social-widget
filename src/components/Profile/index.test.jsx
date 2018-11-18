import React from 'react';
import { render, shallow } from 'enzyme';
import { ThemeProvider } from 'react-jss';
import ProfileStyled, { Profile } from './index';
import Counter from '../Counter';
import theme from '../../theme';

const data = {
  imgSrc: './img.test.jpg',
  name: 'Harvey Specter',
  city: 'New York',
  country: 'USA',
  likes: 121,
  following: 723,
  followers: 4433,
};

describe('<Profile /> rendering', () => {
  it('renders without crashing', () => {
    const wrapper = render(
      <ThemeProvider theme={theme}>
        <ProfileStyled classes={{}} data={data} />
      </ThemeProvider>,
    );
    expect(wrapper.find('h1').text()).toBe(data.name);
    expect(wrapper.find('button').length).toBe(3);
    expect(wrapper.find('img').attr('src')).toBe(data.imgSrc);
    expect(wrapper.find('img').attr('alt')).toBe(data.name);
  });
});

describe('<Profile /> shallow', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(
      <Profile classes={{}} data={data} isFollowed={false} isLiked={false} />,
    );
  });
  test('number of rendered Counters', () => {
    expect(wrapper.find(Counter).length).toBe(3);
  });
  test('first Counter props', () => {
    const firstCounter = wrapper.find(Counter).first();
    expect(firstCounter.prop('label')).toBe('Likes');
    expect(firstCounter.prop('count')).toBe(data.likes);
  });
  test('Follow/Unfollow button', () => {
    wrapper.setProps({ classes: { btnFollow: 'bf' } });
    expect(wrapper.find('.bf').text()).toBe('Follow');
    wrapper.setProps({ isFollowed: true });
    expect(wrapper.find('.bf').text()).toBe('Unfollow');
  });
  test('Like/Dislike button', () => {
    wrapper.setProps({ classes: { btnLike: 'bl', isLiked: 'il' } });
    expect(wrapper.find('.il').length).toBe(0);
    expect(wrapper.find('.bl').prop('title')).toBe('Like');
    wrapper.setProps({ isLiked: true });
    expect(wrapper.find('.il').length).toBe(1);
    expect(wrapper.find('.bl').prop('title')).toBe('Dislike');
  });
});
