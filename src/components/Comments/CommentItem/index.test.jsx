import React from 'react';
import CommentItemStyled, { CommentItem } from './index';
import { shallow, render } from 'enzyme';
import theme from '../../../theme';
import { ThemeProvider } from 'react-jss';

const data = {
  imgSrc: './test.jpg',
  content:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  author: 'John Doe',
  pubTimestamp: 1542538779103,
};

describe('<CommentItem />', () => {
  it('renders without crashing', () => {
    const wrapper = render(
      <ThemeProvider theme={theme}>
        <CommentItemStyled {...data} />
      </ThemeProvider>,
    );
    const text = wrapper.text();
    expect(text).toContain(data.author);
    expect(text).toContain(data.content);
  });
});

describe('<CommentItem /> shallow', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(<CommentItem classes={{}} {...data} />);
  });
  test('<img/> tag', () => {
    const img = wrapper.find('img');
    expect(img.length).toBe(1);
    expect(img.prop('src')).toBe(data.imgSrc);
  });
  test('<time/> tag', () => {
    const time = wrapper.find('time');
    expect(time.length).toBe(1);
    expect(time.prop('dateTime')).toBe('2018-11-18T11:59:39+01:00');
  });
});
