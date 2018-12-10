import React from 'react';
import { createStore } from 'redux';
import { render, fireEvent } from 'test-utils';
import reducer from './reducer';

import Profile from './index';
import Counter from './Counter';
jest.mock('./Counter', () => jest.fn(() => <div />));
const data = {
  imgSrc: './img.test.jpg',
  name: 'Harvey Specter',
  city: 'New York',
  country: 'USA',
  likesCount: 121,
  followingCount: 723,
  followersCount: 4433,
  isLiked: false,
  isFollowed: false,
  isLoading: false,
};

const mockAlert = jest.fn();
window.alert = mockAlert;

describe('<Profile />', () => {
  test('rendering when isLoading=false', () => {
    const storeMock = createStore(reducer, data);
    const { getByText, getByTitle, getByAltText } = render(
      <Profile store={storeMock} />,
    );
    expect(Counter).toBeCalledTimes(3);
    expect(Counter.mock.calls[0][0]).toEqual(
      expect.objectContaining({
        label: 'Likes',
        count: data.likesCount,
        isLoading: false,
      }),
    );
    expect(getByText(data.name)).toBeDefined();
    expect(getByTitle('Like')).toBeDefined();
    expect(getByText('Follow')).toBeDefined();
    const img = getByAltText(data.name);
    expect(img).toBeDefined();
    expect(img.src).toContain(data.imgSrc.substr(1));
  });
  test('rendering when isLoading=true', () => {
    Counter.mockClear();
    const storeMock = createStore(reducer, { ...data, isLoading: true });
    const { baseElement, queryByText } = render(<Profile store={storeMock} />);
    expect(Counter).toBeCalledTimes(3);
    expect(Counter.mock.calls[0][0]).toEqual(
      expect.objectContaining({
        label: 'Likes',
        isLoading: true,
      }),
    );
    expect(queryByText(data.name)).toBeNull();
    expect(queryByText(data.city)).toBeNull();
    expect(queryByText(data.country)).toBeNull();
    expect(queryByText('Follow')).toBeNull();
    // loaders number: 1 (photo) + 1 (header) + 1 (follow btn)
    expect(baseElement.getElementsByTagName('svg').length).toBe(3);
  });
  test('follow button clicking', async () => {
    const storeMock = createStore(reducer, data);
    const { getByText } = render(<Profile store={storeMock} />);
    fireEvent.click(getByText('Follow'));
    expect(storeMock.getState().followersCount).toBe(data.followersCount + 1);
    fireEvent.click(getByText('Unfollow'));
    expect(getByText('Follow')).toBeDefined();
    expect(storeMock.getState().followersCount).toBe(data.followersCount);
  });
  test('like button clicking', () => {
    const storeMock = createStore(reducer, data);
    const { getByTitle } = render(<Profile store={storeMock} />);
    fireEvent.click(getByTitle('Like'));
    expect(storeMock.getState().likesCount).toBe(data.likesCount + 1);
    fireEvent.click(getByTitle('Dislike'));
    expect(getByTitle('Like')).toBeDefined();
    expect(storeMock.getState().likesCount).toBe(data.likesCount);
  });
  test('share button clicking', () => {
    const storeMock = createStore(reducer, data);
    const { getByTitle } = render(<Profile store={storeMock} />);
    fireEvent.click(getByTitle('Share'));
    expect(mockAlert).toBeCalledTimes(1);
  });
});
