// @flow
import React from 'react';
import CommentItem from '../CommentItem';
import injectSheet from 'react-jss';

import type { Props as Comment } from '../CommentItem';

type Props = {
  classes: { [string]: string },
  list: Comment[],
};

const styles = () => ({
  root: {
    maxHeight: 470,
  },
  list: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
});

export const CommentList = ({ classes, list }: Props) => (
  <div className={classes.root}>
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
  </div>
);

export default injectSheet(styles)(CommentList);
