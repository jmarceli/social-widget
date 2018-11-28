import React from 'react';
import { render } from 'test-utils';
import CommentList from './index';
import CommentItem from '../CommentItem';
jest.mock('../CommentItem', () => jest.fn(() => <div />));

const data = {
  list: [{}, {}, {}, {}, {}],
};

describe('<CommentList />', () => {
  test('loading state', () => {
    const { baseElement } = render(<CommentList {...data} isLoading={true} />);
    // there are no loaders directly inside CommentList
    expect(baseElement.getElementsByTagName('svg').length).toBe(0);
    expect(CommentItem).toBeCalledTimes(3);
    expect(CommentItem.mock.calls[0][0].isLoading).toBe(true);
  });

  test('rendering', () => {
    CommentItem.mockClear();
    render(<CommentList {...data} isLoading={false} />);
    expect(CommentItem).toBeCalledTimes(5);
  });

  test('rendering with no items', () => {
    const { getByText } = render(<CommentList list={[]} isLoading={false} />);
    expect(getByText('Be the first to write a comment!')).toBeDefined();
  });
});
