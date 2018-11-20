// @flow
import React from 'react';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import injectSheet from 'react-jss';
import { Element, animateScroll as scroll } from 'react-scroll';
import Transition from 'react-transition-group/Transition';
import classNames from 'classnames';

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

const animationTimeout = 500; // in ms
const styles = (theme: Theme) => ({
  root: {
    boxShadow: theme.shadow.standard,
    borderRadius: theme.radius,
    width: 283,
    [theme.media.large]: {
      width: 466,
    },
  },
  header: {
    textAlign: 'center',
    [theme.media.large]: {
      textAlign: 'left',
    },
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
  commentsPanel: {
    overflow: 'hidden',
    transition: `all ${animationTimeout / 1000}s`,
    height: 0,
  },
  commentsPanelIn: {
    // 10 is an arbitrary value which gives some
    // space for shrinking input label
    // total_height - toggle_btn_height (2*25+18)
    height: 591 - 68 + 10,
    marginBottom: -62.5 - 10,
    [theme.media.large]: {
      height: 667 - 68,
      marginBottom: -103,
    },
  },
  scrollerWrapper: {
    // based on design
    paddingBottom: 13,
    paddingTop: 12,
    [theme.media.large]: {
      paddingBottom: 22,
      paddingTop: 8,
    },
  },
  scroller: {
    position: 'relative',
    overflow: 'scroll',
    height: 440,
    [theme.media.large]: {
      height: 470,
    },
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
          {isHidden ? 'Show' : 'Hide'} comments ({list.length})
        </button>
      </div>

      <div
        className={classNames(
          classes.commentsPanel,
          !isHidden && classes.commentsPanelIn,
        )}
      >
        <Transition
          in={!isHidden}
          timeout={animationTimeout}
          unmountOnExit
          mountOnEnter
        >
          {() => (
            <React.Fragment>
              <div className={classes.scrollerWrapper}>
                <Element className={classes.scroller} ref={scrollContainer}>
                  <CommentList list={list} />
                </Element>
              </div>
              <CommentForm handleFormSubmit={submitAndScroll} />
            </React.Fragment>
          )}
        </Transition>
      </div>
    </div>
  );
};

export default injectSheet(styles)(Comments);
