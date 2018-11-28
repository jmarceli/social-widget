import React from 'react';
import CommentItem from './index';
import { render } from 'test-utils';

const data = {
  imgSrc: './test.jpg',
  content:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  author: 'John Doe',
  pubTimestamp: Date.now() - 26 * 60 * 60 * 1000, // now() - 26 h
};

describe('<CommentItem />', () => {
  test('loading state', () => {
    const { baseElement } = render(<CommentItem {...data} isLoading={true} />);
    expect(baseElement.getElementsByTagName('svg').length).toBe(3);
  });
  test('rendering', () => {
    const { getByText, getByAltText } = render(
      <CommentItem {...data} isLoading={false} />,
    );
    expect(getByAltText(data.author).src).toContain(data.imgSrc.substr(1));
    expect(getByText(data.content)).toBeDefined();
    expect(getByText('1d')).toBeDefined();
    // regExp is more permissive than required but it doesn't matter
    expect(getByText('1d').getAttribute('dateTime')).toMatch(
      /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\+[0-9]{2}:[0-9]{2}$/,
    );
    expect(getByText('1d').getAttribute('pubdate')).toBe('pubdate');
  });
});
