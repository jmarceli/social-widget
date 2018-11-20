// @flow
import React from 'react';
import CommentItem from '../CommentItem';
import injectSheet from 'react-jss';

import type { Props as Comment } from '../CommentItem';
type Props = {
  classes: { [string]: string },
  list: Comment[],
  isLoading: boolean,
};

const styles = () => ({
  root: {},
  list: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
});

export const CommentList = ({ classes, list, isLoading }: Props) => (
  <div className={classes.root}>
    {isLoading ? (
      <ul className={classes.list}>
        {[1, 2, 3].map((item: number) => (
          <li key={item}>
            <CommentItem isLoading={true} />
          </li>
        ))}
      </ul>
    ) : (
      <React.Fragment>
        {list.length === 0 ? (
          <div>Be the first to write a comment!</div>
        ) : (
          <ul className={classes.list}>
            {list.map((item: Comment, index: number) => (
              <li key={index}>
                <CommentItem {...item} />
              </li>
            ))}
          </ul>
        )}
      </React.Fragment>
    )}
  </div>
);

export default injectSheet(styles)(CommentList);
