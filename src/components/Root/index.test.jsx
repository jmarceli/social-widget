import React from 'react';
import Root from './index';
import { render } from 'test-utils';

describe('<Root />', () => {
  test('rendering without an error', () => {
    const { baseElement } = render(<Root url="http://loading" />);
    expect(baseElement.getElementsByTagName('svg').length).toBe(20);
  });
});
