// @flow
import React from 'react';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import injectSheet from 'react-jss';
import { Element, animateScroll as scroll } from 'react-scroll';
import Transition from 'react-transition-group/Transition';
import classNames from 'classnames';
import ContentLoader from 'react-content-loader';

import type { Props as Comment } from './CommentItem';
import type { FormHandler } from './CommentForm';

import styles, { animationTimeout } from './styles';

type Props = {
  classes: { [string]: string },
  isHidden: boolean,
  isLoading: boolean,
  list: Comment[],
  handleHide: () => void,
  handleAdd: FormHandler,
};

export class Comments extends React.Component<Props> {
  scrollContainer: any;

  constructor(props: Props) {
    super(props);
    this.scrollContainer = React.createRef();
  }
  componentDidMount() {
    if (
      this.scrollContainer.current &&
      this.scrollContainer.current.childBindings
    ) {
      const container = this.scrollContainer.current.childBindings.domNode;
      scroll.scrollToBottom({
        container,
        duration: 0,
        delay: 0,
      });
    }
  }

  render() {
    const {
      classes,
      isHidden,
      handleHide,
      handleAdd,
      list,
      isLoading,
    } = this.props;

    // scroll comments after form submission
    const submitAndScroll = values => {
      const result = handleAdd(values);
      if (
        this.scrollContainer.current &&
        this.scrollContainer.current.childBindings
      ) {
        const container = this.scrollContainer.current.childBindings.domNode;

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
            {isLoading ? (
              <ContentLoader width={150} height={18} style={{ width: 150 }}>
                <rect x="0" y="0" rx="5" ry="5" width="150" height="18" />
              </ContentLoader>
            ) : (
              `${isHidden ? 'Show' : 'Hide'} comments (${list.length})`
            )}
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
                  <Element
                    className={classes.scroller}
                    ref={this.scrollContainer}
                  >
                    <CommentList list={list} isLoading={isLoading} />
                  </Element>
                </div>
                <CommentForm
                  handleFormSubmit={submitAndScroll}
                  isLoading={isLoading}
                />
              </React.Fragment>
            )}
          </Transition>
        </div>
      </div>
    );
  }
}

export default injectSheet(styles)(Comments);
