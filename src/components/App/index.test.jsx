import React from 'react';
import App from './index';
import Profile from '../Profile';
import { render, shallow } from 'enzyme';

describe('<App />', () => {
  it('renders without crashing', () => {
    const wrapper = render(<App />);
    expect(wrapper.text()).toContain('Harvey Specter');
  });
  it('has one Profile component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Profile).length).toBe(1);
  });
});
