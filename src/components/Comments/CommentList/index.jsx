// @flow
import React from 'react';
import CommentItem from '../CommentItem';

import type { Props as Comment } from '../CommentItem';

type Props = {
  list: Comment[],
};

export const CommentList = ({ list }: Props) => (
  <div>
    {list.length === 0 ? (
      <div>Be the first to write a comment!</div>
    ) : (
      <ul>
        {list.map((item: Comment, index: number) => (
          <li key={index}>
            <CommentItem {...item} />
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default CommentList;
