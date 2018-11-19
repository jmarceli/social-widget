// @flow
import React from 'react';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import injectSheet from 'react-jss';
import { Element, animateScroll as scroll } from 'react-scroll';

import type { Props as Comment } from './CommentItem';
import type { FormHandler } from './CommentForm';
import type { Theme } from '../../theme';

type Props = {
  classes: { [string]: string },
  isHidden: boolean,
  list: Comment[],
  handleHide: () => void,
  handleAdd: FormHandler,
};

const styles = (theme: Theme) => ({
  root: {
    boxShadow: theme.shadow.standard,
    borderRadius: theme.radius,
    width: 283,
  },
  header: {
    textAlign: 'center',
  },
  btnToggle: {
    ...theme.button.base,
    color: theme.color.secondary,
    fontSize: 14,
    lineHeight: '18px',
    padding: 25,
    textDecoration: 'underline',
    display: 'inline-block',
    '&:hover': {
      textDecoration: 'none',
    },
  },
  scroller: {
    position: 'relative',
    overflow: 'scroll',
    height: 440,
  },
});

export const Comments = ({
  classes,
  isHidden,
  handleHide,
  handleAdd,
  list,
}: Props) => {
  let scrollContainer = React.createRef();

  // scroll comments after form submission
  const submitAndScroll = values => {
    const result = handleAdd(values);
    if (scrollContainer.current && scrollContainer.current.childBindings) {
      const container = scrollContainer.current.childBindings.domNode;

      scroll.scrollToBottom({
        container,
        duration: 800,
        delay: 0,
        smooth: 'easeInOutQuart',
      });
    }
    return result;
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <button className={classes.btnToggle} onClick={handleHide}>
          Hide comments ({list.length})
        </button>
      </div>
      <Element className={classes.scroller} ref={scrollContainer}>
        {!isHidden && <CommentList list={list} />}
      </Element>
      <CommentForm handleFormSubmit={submitAndScroll} />
    </div>
  );
};

export default injectSheet(styles)(Comments);
