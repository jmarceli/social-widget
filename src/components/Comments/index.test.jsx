import React from 'react';
import CommentsStyled, { Comments } from './index';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import { shallow, render } from 'enzyme';
import theme from '../../theme';
import { ThemeProvider } from 'react-jss';
import Transition from 'react-transition-group/Transition';

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
  test('toggle button existence', () => {
    const button = wrapper.find('button');
    expect(button.length).toBe(1);
  });
  test('<CommentForm/> and <CommentList/> shows after toggle', () => {
    const button = wrapper.find('button');
    button.simulate('click');
    const transition = wrapper.find(Transition).dive();
    expect(transition.find('Jss(CommentForm)').length).toBe(1);
    expect(transition.find('Jss(CommentList)').length).toBe(1);
  });
});
