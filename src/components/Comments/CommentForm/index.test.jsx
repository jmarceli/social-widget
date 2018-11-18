import React from 'react';
import CommentForm from './index';
import { shallow, render } from 'enzyme';
import theme from '../../../theme';
import { ThemeProvider } from 'react-jss';
import { Form } from 'react-final-form';

const submitHandler = jest.fn();

describe('<CommentForm />', () => {
  it('renders without crashing', () => {
    const wrapper = render(
      <ThemeProvider theme={theme}>
        <CommentForm handleFormSubmit={submitHandler} />
      </ThemeProvider>,
    );
    expect(wrapper.text()).toContain('Add a comment');
  });
});

describe('<CommentForm /> shallow', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(<CommentForm handleFormSubmit={submitHandler} />);
  });
  test('<Form/> component', () => {
    const form = wrapper.find(Form);
    expect(form.length).toBe(1);
    expect(form.prop('onSubmit')).toBe(submitHandler);
  });
});
