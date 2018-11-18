// @flow
import React from 'react';

export type Props = {
  imgSrc: string,
  author: string,
  pubTimestamp: number,
  content: string,
};

const CommentItem = ({ imgSrc, author, pubTimestamp, content }: Props) => (
  <article>
    <div>
      <img src={imgSrc} />
    </div>
    <div>
      <h2>{author}</h2>
      <p>{content}</p>
    </div>
    <div>
      <time dateTime={pubTimestamp} pubdate="pubdate">
        {pubTimestamp}
      </time>
    </div>
  </article>
);

export default CommentItem;
