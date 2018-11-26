import React from 'react';
import Counter from './index';
import { render } from 'test-utils';

describe('<Counter />', () => {
  test('isLoading=true', () => {
    const { baseElement, queryByText } = render(
      <Counter isLoading={true} count={3} label="Something" />,
    );
    expect(queryByText('3')).toBeNull();
    expect(queryByText('Something')).toBeNull();
    expect(baseElement.getElementsByTagName('svg').length).toBe(2);
  });
  test('isLoading=false', () => {
    const { getByText } = render(
      <Counter isLoading={false} count={3} label="Something" />,
    );
    expect(getByText('3')).toBeDefined();
    expect(getByText('Something')).toBeDefined();
  });
});
