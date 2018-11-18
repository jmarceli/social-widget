import React from 'react';
import CommentList from './index';
import CommentItem from '../CommentItem';
import { shallow, render } from 'enzyme';
import theme from '../../../theme';
import { ThemeProvider } from 'react-jss';

const data = {
  list: [{}, {}, {}],
};

describe('<CommentList /> rendering', () => {
  it('renders without crashing', () => {
    const wrapper = render(
      <ThemeProvider theme={theme}>
        <CommentList list={[]} />
      </ThemeProvider>,
    );
    expect(wrapper.text()).toContain('Be the first to write a comment');
  });
});

describe('<CommentList /> shallow', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(<CommentList {...data} />);
  });
  test('<CommentItem/> components', () => {
    const comment = wrapper.find(CommentItem);
    expect(comment.length).toBe(3);
  });
});
