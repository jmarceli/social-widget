import React from 'react';
import CommentForm from './index';
import { render, fireEvent } from 'test-utils';

describe('<CommentForm />', () => {
  const submitHandler = jest.fn();

  test('loading state', () => {
    const { baseElement, queryByText } = render(
      <CommentForm isLoading={true} handleFormSubmit={submitHandler} />,
    );
    expect(baseElement.getElementsByTagName('svg').length).toBe(1);
    expect(queryByText('Add a comment')).toBeNull();
  });

  test('form submission', () => {
    const { getByLabelText, baseElement } = render(
      <CommentForm isLoading={false} handleFormSubmit={submitHandler} />,
    );
    const input = getByLabelText('Add a comment');
    expect(input).toBeDefined();
    fireEvent.change(input, { target: { value: 'Some comment' } });
    // unfortunatelly I see no option to trigger form submit by
    // triggering keyPress ENTER event inside input field
    fireEvent.submit(baseElement.getElementsByTagName('form')[0]);
    // fireEvent.keyPress(input, {
    //   // key: 'Enter',
    //   code: 13,
    //   // which: 13,
    // });
    expect(submitHandler).toBeCalledTimes(1);
    expect(input.value).toBe('');
  });
});
