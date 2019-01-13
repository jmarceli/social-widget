import React from 'react';
import Root from './index';
import { render } from 'test-utils';
import store from '../../redux/store';

import App from '../App';
jest.mock('../App');

describe('<Root />', () => {
  test('rendering <App/> component', () => {
    const url = 'http://loading';
    render(<Root store={store} url={url} />);
    expect(App).toBeCalledTimes(1);
    expect(App.mock.calls[0][0].dataUrl).toBe(url);
  });
});
