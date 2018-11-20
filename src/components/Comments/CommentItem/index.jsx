// @flow
import React from 'react';
import injectSheet from 'react-jss';
import moment from 'moment';

import type { Theme } from '../../../theme';
import type { Comment } from '../../../dataSources';
export type Props = {
  ...Comment,
  classes: { [string]: string },
};

moment.updateLocale('en', {
  relativeTime: {
    future: '%s',
    past: '%s',
    s: '1s',
    ss: '%ds',
    m: '1m',
    mm: '%dm',
    h: '1h',
    hh: '%dh',
    d: '1d',
    dd: '%dd',
    // months has the same short form as minutes...
    M: '1m',
    MM: '%dm',
    y: '1y',
    yy: '%dy',
  },
});

const imageSize = 40;

const styles = (theme: Theme) => ({
  root: {
    position: 'relative',
    padding: 20,
  },
  container: {
    ...theme.utils.clearFloats,
  },
  photo: {
    width: imageSize,
    float: 'left',
  },
  image: {
    width: imageSize,
    height: imageSize,
    borderRadius: '50%',
    float: 'left',
  },
  body: {
    fontSize: 14,
    lineHeight: '18px',
    paddingTop: 10,
    paddingLeft: 11,
    paddingRight: 5,
    float: 'left',
    width: `calc(100% - ${imageSize}px)`,
    boxSizing: 'border-box',
  },
  name: {
    margin: 0,
    color: theme.color.primary,
    // space for time and some margin
    paddingRight: 15 + 21,
    fontSize: 'inherit',
    fontWeight: 400,
  },
  content: {
    margin: 0,
    fontSize: 'inherit',
    lineHeight: '21px',
    color: '#444',
  },
  date: {
    fontSize: 14,
    opacity: 0.5,
    color: theme.color.primary,
    position: 'absolute',
    top: 30,
    right: 21,
  },
});

export const CommentItem = ({
  classes,
  imgSrc,
  author,
  pubTimestamp,
  content,
}: Props) => (
  <article className={classes.root}>
    <div className={classes.container}>
      <div className={classes.photo}>
        <img className={classes.image} src={imgSrc} alt={author} />
      </div>
      <div className={classes.body}>
        <h2 className={classes.name}>{author}</h2>
        <p className={classes.content}>{content}</p>
      </div>
      <div className={classes.date}>
        <time
          className={classes.timestamp}
          dateTime={moment(pubTimestamp).format('YYYY-MM-DDTHH:mm:ssZ')}
          pubdate="pubdate"
        >
          {moment(pubTimestamp).fromNow()}
        </time>
      </div>
    </div>
  </article>
);

export default injectSheet(styles)(CommentItem);
