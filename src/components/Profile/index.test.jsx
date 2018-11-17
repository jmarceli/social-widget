import React from 'react';
import Profile from './index';
import Counter from '../Counter';
import { render, shallow } from 'enzyme';

const data = {
  img: './img.test.jpg',
  name: 'Harvey Specter',
  city: 'New York',
  country: 'USA',
  likes: 121,
  following: 723,
  followers: 4433,
};

describe('<Profile />', () => {
  it('renders without crashing', () => {
    const wrapper = render(<Profile data={data} />);
    expect(wrapper.find('h1').text()).toBe('Harvey Specter');
    expect(wrapper.find('button').length).toBe(3);
  });
  it('renders 3 Counters', () => {
    const wrapper = shallow(<Profile data={data} />);
    expect(wrapper.find(Counter).length).toBe(3);
  });
});