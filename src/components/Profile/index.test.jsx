import React from 'react';
import { render, fireEvent } from 'test-utils';
import { ProfileStyled as Profile } from './index';
import Counter from './Counter';
jest.mock('./Counter', () => jest.fn(() => <div />));

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
  test('rendering when isLoading=false', () => {
    const { getByText, getByTitle, getByAltText } = render(
      <Profile isLoading={false} data={data} />,
    );
    expect(Counter).toBeCalledTimes(3);
    expect(Counter.mock.calls[0][0]).toEqual(
      expect.objectContaining({
        label: 'Likes',
        count: data.likes,
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
    const { baseElement, queryByText } = render(<Profile isLoading={true} />);
    expect(Counter).toBeCalledTimes(3);
    expect(Counter.mock.calls[0][0]).toEqual(
      expect.objectContaining({
        label: 'Likes',
        count: undefined,
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
  test('follow button clicking', () => {
    const handleFollow = jest.fn();
    const { getByText, rerender } = render(
      <Profile isLoading={false} data={data} handleFollow={handleFollow} />,
    );
    fireEvent.click(getByText('Follow'));
    expect(handleFollow).toBeCalledTimes(1);
    rerender(
      <Profile
        data={{ ...data, isFollowed: true }}
        handleFollow={handleFollow}
      />,
    );
    fireEvent.click(getByText('Unfollow'));
    expect(handleFollow).toBeCalledTimes(2);
  });
  test('like button clicking', () => {
    const handleLike = jest.fn();
    const { getByTitle, rerender } = render(
      <Profile isLoading={false} data={data} handleLike={handleLike} />,
    );
    fireEvent.click(getByTitle('Like'));
    expect(handleLike).toBeCalledTimes(1);
    rerender(
      <Profile data={{ ...data, isLiked: true }} handleLike={handleLike} />,
    );
    fireEvent.click(getByTitle('Dislike'));
    expect(handleLike).toBeCalledTimes(2);
  });
  test('share button clicking', () => {
    const handleShare = jest.fn();
    const { getByTitle } = render(
      <Profile isLoading={false} data={data} handleShare={handleShare} />,
    );
    fireEvent.click(getByTitle('Share'));
    expect(handleShare).toBeCalledTimes(1);
  });
});
