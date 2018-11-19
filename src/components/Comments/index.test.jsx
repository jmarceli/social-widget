import React from 'react';
import CommentsStyled, { Comments } from './index';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import { shallow, render } from 'enzyme';
import theme from '../../theme';
import { ThemeProvider } from 'react-jss';

const data = {
  isHidden: false,
  list: [{}, {}, {}],
  handleHide: jest.fn(),
  handleAdd: jest.fn(),
};

describe('<Comments />', () => {
  test('rendering', () => {
    const wrapper = render(
      <ThemeProvider theme={theme}>
        <CommentsStyled {...data} />
      </ThemeProvider>,
    );
    expect(wrapper.text()).toContain('Hide comments (3)');
  });
});

describe('<Comments /> shallow', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(<Comments classes={{}} {...data} />);
  });
  test('<CommentList/> subcomponents', () => {
    const commentList = wrapper.find(CommentList);
    expect(commentList.length).toBe(1);
  });
  test('<CommentForm/> component', () => {
    const commentForm = wrapper.find(CommentForm);
    expect(commentForm.length).toBe(1);
  });
});
