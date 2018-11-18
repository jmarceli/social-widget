// @flow
import React from 'react';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

import type { Props as Comment } from './CommentItem';
import type { FormHandler } from './CommentForm';

type Props = {
  isHidden: boolean,
  list: Comment[],
  handleHide: () => void,
  handleAdd: FormHandler,
};

const Comments = ({ isHidden, handleHide, handleAdd, list }: Props) => (
  <div>
    <button onClick={handleHide}>Hide comments ({list.length})</button>
    {!isHidden && <CommentList list={list} />}
    <CommentForm handleFormSubmit={handleAdd} />
  </div>
);

export default Comments;
