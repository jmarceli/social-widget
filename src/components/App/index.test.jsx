import React from 'react';
import App from './index';
import { render, waitForElement, fireEvent } from 'test-utils';
import store from '../../redux/store';
import WebFont from 'webfontloader';
import { loadData } from '../../dataSources';
jest.mock('../../dataSources');
jest.mock('webfontloader');
window.Math.random = jest.fn(() => 0.1); // always load data without error

const source = {
  profile: {
    imgSrc: './harvey-specter.jpg',
    name: 'Harvey Specter',
    city: 'New York',
    country: 'USA',
    likes: 121,
    following: 723,
    followers: 4433,
  },
  commentList: new Array(10).fill({}).map((item, index) => ({
    imgSrc: './test.jpg',
    author: `Test ${index + 1}`,
    content: `Test content ${index + 1}`,
    pubTimestamp: 1543420231093,
  })),
};
loadData.mockImplementation(
  async url =>
    new Promise(resolve => {
      if (url !== 'http://loading') {
        resolve(source);
      }
    }),
);
WebFont.load.mockImplementation(({ fontactive }) => {
  // instantly activate font
  fontactive();
});

const mockAlert = jest.fn();
window.alert = mockAlert;

describe('<App />', () => {
  test('loading state', () => {
    const { baseElement } = render(
      <App store={store} dataUrl="http://loading" />,
    );
    // TODO: fix test
    // expect(loadData).toBeCalledTimes(1);
    expect(WebFont.load).toBeCalledTimes(1);
    // loaders number: 1 (photo) + 1 (header) + 1 (follow btn) + 6 (counters)
    // + 1 (show/hide) + 10 comments list
    expect(baseElement.getElementsByTagName('svg').length).toBe(
      3 + 6 + 1 + source.commentList.length,
    );
  });

  test('rendering after load is done', async () => {
    const { queryAllByText, getByAltText, getByText, baseElement } = render(
      <App store={store} dataUrl="http://loaded" />,
    );
    await waitForElement(() => getByText(source.profile.name));
    // share and like buttons are SVGs
    expect(baseElement.getElementsByTagName('svg').length).toBe(2);

    expect(getByText(source.profile.country, { exact: false })).toBeDefined();
    expect(getByText(source.profile.city, { exact: false })).toBeDefined();
    expect(getByText(source.profile.likes.toString())).toBeDefined();
    expect(getByText(source.profile.following.toString())).toBeDefined();
    expect(getByText(source.profile.followers.toString())).toBeDefined();
    expect(getByAltText(source.profile.name).src).toContain(
      source.profile.imgSrc.substr(1),
    );
    // Comments
    expect(queryAllByText(/^Test content.*$/g).length).toBe(10);
  });

  test('integration tests', async () => {
    const {
      baseElement,
      queryByText,
      queryAllByText,
      getByText,
      getByTitle,
      getByLabelText,
    } = render(<App store={store} dataUrl="http://loaded" />);

    await waitForElement(() => getByText(source.profile.name));

    // TODO: fix test
    // fireEvent.click(getByText('Follow'));
    // expect(getByText((source.profile.followers + 1).toString())).toBeDefined();
    // fireEvent.click(getByText('Unfollow'));
    // expect(getByText(source.profile.followers.toString())).toBeDefined();

    fireEvent.click(getByTitle('Like'));
    expect(getByText((source.profile.likes + 1).toString())).toBeDefined();
    fireEvent.click(getByTitle('Dislike'));
    expect(getByText(source.profile.likes.toString())).toBeDefined();

    // fireEvent.click(getByTitle('Share'));
    // expect(mockAlert).toHaveBeenCalledTimes(1);

    // Hide/show comments
    fireEvent.click(getByText('Hide comments (10)'));
    await waitForElement(() => !queryByText('Test 1'));
    expect(queryAllByText(/^Test content.*$/g).length).toBe(0);
    fireEvent.click(getByText('Show comments (10)'));
    await waitForElement(() => queryByText('Test 1'));
    expect(queryAllByText(/^Test content.*$/g).length).toBe(10);

    // Add comment
    const input = getByLabelText('Add a comment');
    fireEvent.change(input, {
      target: { value: 'Test content new' },
    });
    fireEvent.submit(baseElement.getElementsByTagName('form')[0]);
    expect(input.value).toBe('');
    expect(queryAllByText(/^Test content.*$/g).length).toBe(11);
    expect(getByText('Test content new')).toBeDefined();
    expect(getByText('1s')).toBeDefined();

    // Add empty comment
    fireEvent.change(input, {
      target: { value: '' },
    });
    fireEvent.submit(baseElement.getElementsByTagName('form')[0]);
    expect(queryAllByText(/^Test content.*$/g).length).toBe(11);
  });
});
