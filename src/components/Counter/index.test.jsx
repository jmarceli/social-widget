import React from 'react';
import Counter from './index';
import { render } from 'enzyme';

describe('<Counter />', () => {
  it('renders without crashing', () => {
    const wrapper = render(<Counter count={3} label="Something" />);
    expect(wrapper.find('.count').text()).toBe('3');
    expect(wrapper.find('.label').text()).toBe('Something');
  });
});
