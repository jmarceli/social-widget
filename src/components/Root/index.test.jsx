import React from 'react';
import Root from './index';
import { render, waitForElement, fireEvent } from 'test-utils';
import store from '../../redux/store';

const source = {
  profile: {
    imgSrc: './harvey-specter.jpg',
    name: 'Harvey Specter',
    city: 'New York',
    country: 'USA',
    likesCount: 121,
    followingCount: 723,
    followersCount: 4433,
  },
  commentList: new Array(10).fill({}).map((item, index) => ({
    imgSrc: './test.jpg',
    author: `Test ${index + 1}`,
    content: `Test content ${index + 1}`,
    pubTimestamp: 1543420231093,
  })),
};

import { loadData } from '../../dataSources';
jest.mock('../../dataSources');
loadData.mockImplementation(
  async url =>
    new Promise(resolve => {
      if (url !== 'http://loading') {
        resolve(source);
      }
    }),
);

import WebFont from 'webfontloader';
jest.mock('webfontloader');

describe('<Root />', () => {
  test('rendering loading state', () => {
    WebFont.load.mockImplementation(() => null); // never load a font
    const { baseElement } = render(<Root store={store} url="http://loading" />);
    // image + name + location + (3 * Counter)
    expect(baseElement.getElementsByTagName('svg').length).toBe(9);
  });

  test('rendering after load is done', async () => {
    WebFont.load.mockImplementation(({ fontactive }) => {
      // instantly activate font (do it twice to mimic loading of two fonts)
      fontactive();
      fontactive();
    });
    const { getByAltText, getByText, baseElement } = render(
      <Root store={store} url="http://loaded.test" />,
    );
    await waitForElement(() => getByText(source.profile.name));
    // share and like buttons are SVGs
    expect(baseElement.getElementsByTagName('svg').length).toBe(2);

    expect(getByText(source.profile.country, { exact: false })).toBeDefined();
    expect(getByText(source.profile.city, { exact: false })).toBeDefined();
    expect(getByText(source.profile.likesCount.toString())).toBeDefined();
    expect(getByText(source.profile.followingCount.toString())).toBeDefined();
    expect(getByText(source.profile.followersCount.toString())).toBeDefined();
    expect(getByAltText(source.profile.name).src).toContain(
      source.profile.imgSrc.substr(1),
    );
    // Comments
    // expect(queryAllByText(/^Test content.*$/g).length).toBe(10);
  });

  test('integration tests', async () => {
    const mockAlert = jest.fn();
    window.alert = mockAlert;
    WebFont.load.mockImplementation(({ fontactive }) => {
      // instantly activate font (do it twice to mimic loading of two fonts)
      fontactive();
      fontactive();
    });
    const { getByText, getByTitle } = render(
      <Root store={store} url="http://loaded.test" />,
    );

    await waitForElement(() => getByText(source.profile.name));

    fireEvent.click(getByText('Follow'));
    expect(
      getByText((source.profile.followersCount + 1).toString()),
    ).toBeDefined();
    fireEvent.click(getByText('Unfollow'));
    expect(getByText(source.profile.followersCount.toString())).toBeDefined();

    fireEvent.click(getByTitle('Like'));
    expect(getByText((source.profile.likesCount + 1).toString())).toBeDefined();
    fireEvent.click(getByTitle('Dislike'));
    expect(getByText(source.profile.likesCount.toString())).toBeDefined();

    fireEvent.click(getByTitle('Share'));
    expect(mockAlert).toHaveBeenCalledTimes(1);

    // // Hide/show comments
    // fireEvent.click(getByText('Hide comments (10)'));
    // await waitForElement(() => !queryByText('Test 1'));
    // expect(queryAllByText(/^Test content.*$/g).length).toBe(0);
    // fireEvent.click(getByText('Show comments (10)'));
    // await waitForElement(() => queryByText('Test 1'));
    // expect(queryAllByText(/^Test content.*$/g).length).toBe(10);

    // // Add comment
    // const input = getByLabelText('Add a comment');
    // fireEvent.change(input, {
    //   target: { value: 'Test content new' },
    // });
    // fireEvent.submit(baseElement.getElementsByTagName('form')[0]);
    // expect(input.value).toBe('');
    // expect(queryAllByText(/^Test content.*$/g).length).toBe(11);
    // expect(getByText('Test content new')).toBeDefined();
    // expect(getByText('1s')).toBeDefined();

    // // Add empty comment
    // fireEvent.change(input, {
    //   target: { value: '' },
    // });
    // fireEvent.submit(baseElement.getElementsByTagName('form')[0]);
    // expect(queryAllByText(/^Test content.*$/g).length).toBe(11);
  });
});
