import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { render } from 'test-utils';
import reducer from './reducer';

import App from './index';
import Profile from '../Profile';
jest.mock('../Profile', () => jest.fn(() => <div />));

import { fontLoad, dataLoad } from './actions';
jest.mock('./actions');
dataLoad.mockImplementation(() => ({
  type: 'none',
}));
fontLoad.mockImplementation(() => ({
  type: 'none',
}));

const data = {
  profile: {},
  fontLoading: false,
  dataLoading: false,
};

describe('<App />', () => {
  test('<Profile /> subcomponents', () => {
    const storeMock = createStore(reducer, data, applyMiddleware(thunk));
    const wrapType = type => type;
    render(
      <App
        getState={state => state}
        wrapType={wrapType}
        store={storeMock}
        dataUrl="http://loading"
      />,
    );

    expect(dataLoad).toBeCalledTimes(1);
    expect(dataLoad).toBeCalledWith(wrapType, 'http://loading');

    expect(fontLoad).toBeCalledTimes(1);
    expect(fontLoad).toBeCalledWith(wrapType);

    expect(Profile).toBeCalledTimes(2);
    // expect(WebFont.load).toBeCalledTimes(1);
    // loaders number: 1 (photo) + 1 (header) + 1 (follow btn) + 6 (counters)
    // + 1 (show/hide) + 10 comments list
    // expect(baseElement.getElementsByTagName('svg').length).toBe(
    //   3 + 6, // + 1 + source.commentList.length,
    // );
  });
});
