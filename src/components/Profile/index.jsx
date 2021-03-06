// @flow
import React from 'react';
import injectSheet from 'react-jss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareSquare as ShareIcon } from '@fortawesome/free-solid-svg-icons';
import { faHeart as LikeIcon } from '@fortawesome/free-regular-svg-icons';
import classNames from 'classnames';
import ContentLoader from 'react-content-loader';

import Counter from './Counter';
import type { Theme } from '../../theme';

const photoOffset = 48;

const iconButton = theme => ({
  ...theme.button.base,
  background: 'none',
  position: 'absolute',
  padding: 10,
});

export const styles = (theme: Theme) => ({
  root: {
    paddingTop: photoOffset,
    width: 283,
    [theme.media.large]: {
      width: 466,
    },
  },
  container: {
    background: theme.color.white,
    boxShadow: theme.shadow.standard,
    borderRadius: theme.radius,
    position: 'relative',
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    '&:after': {
      content: '""',
      clear: 'both',
      display: 'table',
    },
    [theme.media.large]: {
      paddingBottom: 28,
    },
  },
  photo: {
    height: 70,
    marginTop: -photoOffset,
    marginBottom: 16,
    textAlign: 'center',
    display: 'inline-block',
    width: '100%',
    [theme.media.large]: {
      marginTop: 20,
      textAlign: 'left',
      width: 70,
    },
  },
  img: {
    background: theme.color.white,
    width: 70,
    height: 70,
    borderRadius: '50%',
    display: 'inline-block',
  },
  header: {
    textAlign: 'center',
    marginBottom: 35,
    [theme.media.large]: {
      display: 'inline-block',
      textAlign: 'left',
      marginLeft: 18,
      verticalAlign: 'top',
      marginTop: 38,
    },
  },
  firstLine: {
    position: 'relative',
  },
  secondLine: {
    ...theme.font,
    fontSize: 12,
    lineHeight: '15px',
    color: theme.color.primaryLight,
  },
  name: {
    ...theme.font,
    margin: 0,
    fontWeight: 400,
    fontSize: 18,
    lineHeight: '22px',
    color: theme.color.primary,
    display: 'inline-block',
  },
  btnLike: {
    ...iconButton(theme),
    marginTop: -7,
    color: '#d3d3d3',
    transition: 'color 0.2s',
  },
  isLiked: {
    color: '#f00',
  },
  btnShare: {
    ...iconButton(theme),
    top: 0,
    right: 0,
    color: theme.color.secondary,
  },
  counterList: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 21,
    marginLeft: -20,
    marginRight: -20,
    [theme.media.large]: {
      marginBottom: 0,
      marginRight: 0,
      flexGrow: 1,
    },
  },
  counter: {
    position: 'relative',
    width: '33.333%',
    textAlign: 'center',
    '&:first-child': {
      textAlign: 'left',
      '&>div': {
        paddingLeft: 20 + 3,
      },
    },
    '&:last-child': {
      textAlign: 'right',
      '&>div': {
        paddingRight: 20 + 3,
      },
    },
    '&:first-child:after, &:last-child:before': {
      content: '""',
      display: 'block',
      backgroundColor: '#979797',
      opacity: 0.1,
      width: 1,
      height: 38,
      position: 'absolute',
      right: 0,
      top: '50%',
      transform: 'translateY(-50%)',
    },
    '&:last-child:before': {
      right: 'auto',
      left: 0,
    },
    [theme.media.large]: {
      '&:first-child': {
        paddingLeft: 0,
      },
    },
  },
  divider: {
    backgroundColor: '#979797',
    opacity: 0.1,
    width: 1,
    height: 38,
  },
  footer: {
    [theme.media.large]: {
      display: 'flex',
      justifyContent: 'space-between',
    },
  },
  btnFollow: {
    ...theme.button.base,
    backgroundColor: theme.color.secondary,
    color: theme.color.white,
    textAlign: 'center',
    textTransform: 'uppercase',
    width: '100%',
    height: 46,
    borderRadius: 100,
    margin: '0 auto',
    fontSize: 14,
    letterSpacing: '4.2px',
    lineHeight: '18px',
    fontWeight: 600,
    [theme.media.large]: {
      width: 134,
      alignSelf: 'flex-end',
      margin: '0 0 0 15px',
    },
  },
  isFollowed: {
    letterSpacing: '2px',
  },
});

type Props = {
  classes: { [string]: {} },
  data: {
    imgSrc: string,
    name: string,
    city: string,
    country: string,
    likes: number,
    following: number,
    followers: number,
  },
  handleLike: () => void,
  handleFollow: () => void,
  isFollowed: boolean,
  isLiked: boolean,
  handleShare: () => void,
  isLoading: boolean,
};

export const Profile = ({
  classes,
  data: { imgSrc, name, city, country, likes, following, followers } = {},
  handleLike,
  handleFollow,
  isFollowed,
  isLiked,
  handleShare,
  isLoading,
}: Props) => (
  <section className={classes.root}>
    <div className={classes.container}>
      <div className={classes.photo}>
        {isLoading ? (
          <ContentLoader width={40} height={40} className={classes.img}>
            <rect x="0" y="0" rx="5" ry="5" width="40" height="40" />
          </ContentLoader>
        ) : imgSrc ? (
          <img className={classes.img} src={imgSrc} alt={name} />
        ) : (
          <div className={classes.img} />
        )}
      </div>

      <div className={classes.header}>
        {isLoading ? (
          <ContentLoader
            width={134}
            height={37}
            style={{ display: 'inline-block', width: 134 }}
          >
            <rect x="0" y="0" rx="5" ry="5" width="134" height="20" />
            <rect x="23" y="26" rx="5" ry="5" width="88" height="13" />
          </ContentLoader>
        ) : (
          <React.Fragment>
            <div className={classes.firstLine}>
              <h1 className={classes.name}>{name}</h1>
              <button
                className={classNames(
                  classes.btnLike,
                  isLiked && classes.isLiked,
                )}
                onClick={handleLike}
                title={isLiked ? 'Dislike' : 'Like'}
              >
                <FontAwesomeIcon icon={LikeIcon} />
              </button>
            </div>
            <div className={classes.secondLine}>
              {city}, {country}
            </div>
          </React.Fragment>
        )}
      </div>

      {!isLoading && (
        <button
          className={classes.btnShare}
          onClick={handleShare}
          title="Share"
        >
          <FontAwesomeIcon icon={ShareIcon} />
        </button>
      )}

      <div className={classes.footer}>
        <div className={classes.counterList}>
          <Counter
            className={classes.counter}
            label="Likes"
            count={likes}
            isLoading={isLoading}
          />
          <Counter
            className={classes.counter}
            label="Following"
            count={following}
            isLoading={isLoading}
          />
          <Counter
            className={classes.counter}
            label="Followers"
            count={followers}
            isLoading={isLoading}
          />
        </div>

        {isLoading ? (
          <ContentLoader
            width={134}
            height={46}
            className={classes.btnFollow}
            style={{ background: 'none' }}
          >
            <rect x="0" y="0" rx="5" ry="5" width="134" height="46" />
          </ContentLoader>
        ) : (
          <button
            className={classNames(
              classes.btnFollow,
              isFollowed && classes.isFollowed,
            )}
            onClick={handleFollow}
          >
            {isFollowed ? 'Unfollow' : 'Follow'}
          </button>
        )}
      </div>
    </div>
  </section>
);

export default injectSheet(styles)(Profile);
