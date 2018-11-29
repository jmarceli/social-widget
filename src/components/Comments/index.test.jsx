import React from 'react';
import Comments from './index';
import { render, fireEvent } from 'test-utils';
import { animateScroll } from 'react-scroll';

const data = {
  isHidden: false,
  list: new Array(10).fill({}).map((item, index) => ({
    isLoading: false,
    imgSrc: './test.jpg',
    author: `Test ${index + 1}`,
    content: `Test content ${index + 1}`,
    pubTimestamp: 1543420231093,
  })),
  handleHide: jest.fn(),
  handleAdd: jest.fn(),
};

describe('<Comments />', () => {
  test('loading state', () => {
    const { baseElement } = render(<Comments {...data} isLoading={true} />);
    expect(baseElement.getElementsByTagName('svg').length).toBe(
      1 + data.list.length,
    );
  });

  test('rendering when expanded', () => {
    data.handleHide.mockClear();
    const { getByText } = render(<Comments {...data} isLoading={false} />);
    const button = getByText('Hide comments (10)');
    expect(button).toBeDefined();
    fireEvent.click(button);
    expect(data.handleHide).toBeCalledTimes(1);
  });

  test('rendering when collapsed', () => {
    data.handleHide.mockClear();
    const { getByText } = render(
      <Comments {...data} isLoading={false} isHidden={true} />,
    );
    const button = getByText('Show comments (10)');
    expect(button).toBeDefined();
    fireEvent.click(button);
    expect(data.handleHide).toBeCalledTimes(1);
  });

  test('auto scroll on init', () => {
    // TODO: write better scrolling tests, currently there is no guarantee that element is
    // actually scrolled, just that scrollToBottom method was invoked
    const scrollSpy = jest.spyOn(animateScroll, 'scrollToBottom');
    render(<Comments {...data} isLoading={false} isHidden={false} />);
    expect(scrollSpy).toBeCalledTimes(1);
    scrollSpy.mockRestore();
    // const scroller = getByTestId('scroller');
    // console.log('test');
    // expect(scroller.scrollTop).toBeGreaterThan(0);
  });

  test('auto scroll after adding new comment', () => {
    // TODO: write better scrolling tests, currently there is no guarantee that element is
    // actually scrolled, just that scrollToBottom method was invoked
    const { baseElement, getByLabelText } = render(
      <Comments {...data} isLoading={false} isHidden={false} />,
    );

    const scrollSpy = jest.spyOn(animateScroll, 'scrollToBottom');
    const input = getByLabelText('Add a comment');
    fireEvent.change(input, { target: { value: 'Some comment' } });

    // this should be fixed somehow, but there is a problem with simulating ENTER
    // keypress inside input field (it doesn't trigger form submission in tests
    fireEvent.submit(baseElement.getElementsByTagName('form')[0]);
    expect(scrollSpy).toBeCalledTimes(1);
    scrollSpy.mockRestore();
  });
});
