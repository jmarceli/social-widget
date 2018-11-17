import React from 'react';
import { render, shallow } from 'enzyme';
import { ThemeProvider } from 'react-jss';
import Profile from './index';
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

describe('<Profile />', () => {
  it('renders without crashing', () => {
    const wrapper = render(
      <ThemeProvider theme={theme}>
        <Profile data={data} />
      </ThemeProvider>,
    );
    expect(wrapper.find('h1').text()).toBe('Harvey Specter');
    expect(wrapper.find('button').length).toBe(3);
    expect(wrapper.find('img').attr('src')).toBe(data.imgSrc);
    expect(wrapper.find('img').attr('alt')).toBe(data.name);
  });
  it('renders 3 Counters', () => {
    const wrapper = shallow(<Profile data={data} />);
    expect(wrapper.find(Counter).length).toBe(3);
  });
});
