import React from 'react';
import App from './index';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find('.App').text()).toBe('OK');
});
