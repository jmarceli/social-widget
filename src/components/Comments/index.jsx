// @flow
import React from 'react';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import injectSheet from 'react-jss';

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
});

export const Comments = ({
  classes,
  isHidden,
  handleHide,
  handleAdd,
  list,
}: Props) => (
  <div className={classes.root}>
    <div className={classes.header}>
      <button className={classes.btnToggle} onClick={handleHide}>
        Hide comments ({list.length})
      </button>
    </div>
    {!isHidden && <CommentList list={list} />}
    <CommentForm handleFormSubmit={handleAdd} />
  </div>
);

export default injectSheet(styles)(Comments);
