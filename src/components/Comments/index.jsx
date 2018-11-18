// @flow
import React from 'react';
import CommentList from './CommentList';

import type { Props as Comment } from './CommentItem';

type Props = {
  isHidden: boolean,
  list: Comment[],
  handleHide: () => void,
};

const Comments = ({ isHidden, handleHide, list }: Props) => (
  <div>
    <button onClick={handleHide}>Hide comments ({list.length})</button>
    {!isHidden && <CommentList list={list} />}
  </div>
);

export default Comments;
