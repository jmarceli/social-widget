// @flow
import React from 'react';
import injectSheet from 'react-jss';
import moment from 'moment';
import ContentLoader from 'react-content-loader';

import type { Theme } from '../../../theme';
import type { Comment } from '../../../dataSources';
export type Props = {
  ...Comment,
  classes: { [string]: string },
  isLoading: boolean,
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
    [theme.media.large]: {
      paddingRight: 27 + 15,
    },
  },
  name: {
    ...theme.font,
    margin: 0,
    color: theme.color.primary,
    // space for time and some margin
    paddingRight: 15 + 21,
    fontSize: 'inherit',
    fontWeight: 400,
    [theme.media.large]: {
      paddingBottom: 6,
    },
  },
  content: {
    ...theme.font,
    margin: 0,
    fontSize: 'inherit',
    lineHeight: '21px',
    color: '#444',
    wordBreak: 'break-word',
  },
  date: {
    ...theme.font,
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
  isLoading,
}: Props) => (
  <article className={classes.root}>
    <div className={classes.container}>
      <div className={classes.photo}>
        {isLoading ? (
          <ContentLoader width={40} height={40} className={classes.image}>
            <circle cx="20" cy="20" r="20" />
          </ContentLoader>
        ) : (
          <img className={classes.image} src={imgSrc} alt={author} />
        )}
      </div>
      <div className={classes.body}>
        <h2 className={classes.name}>
          {isLoading ? (
            <ContentLoader width={70} height={18} style={{ height: 18 }}>
              <rect x="0" y="0" rx="5" ry="5" width="70" height="18" />
            </ContentLoader>
          ) : (
            author
          )}
        </h2>
        <p className={classes.content}>
          {isLoading ? (
            <ContentLoader width={278} height={140} style={{ width: '100%' }}>
              <rect x="0" y="0" rx="5" ry="5" width="100%" height="14" />
              <rect x="0" y="21" rx="5" ry="5" width="100%" height="14" />
              <rect x="0" y="42" rx="5" ry="5" width="100%" height="14" />
              <rect x="0" y="63" rx="5" ry="5" width="100%" height="14" />
            </ContentLoader>
          ) : (
            content
          )}
        </p>
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
