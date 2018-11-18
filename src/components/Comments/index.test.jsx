import React from 'react';
import Comments from './index';
import CommentList from './CommentList';
import { shallow, render } from 'enzyme';
import theme from '../../theme';
import { ThemeProvider } from 'react-jss';

const data = {
  isHidden: false,
  list: [{}, {}, {}],
  handleHide: jest.fn(),
};

describe('<Comments />', () => {
  test('rendering', () => {
    const wrapper = render(
      <ThemeProvider theme={theme}>
        <Comments {...data} />
      </ThemeProvider>,
    );
    expect(wrapper.text()).toContain('Hide comments (3)');
  });
});

describe('<Comments /> shallow', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(<Comments {...data} />);
  });
  test('<CommentList/> subcomponents', () => {
    const commentList = wrapper.find(CommentList);
    expect(commentList.length).toBe(1);
  });
});
