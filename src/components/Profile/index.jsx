// @flow
import React from 'react';
import injectSheet from 'react-jss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareSquare as ShareIcon } from '@fortawesome/free-solid-svg-icons';
import { faHeart as LikeIcon } from '@fortawesome/free-regular-svg-icons';
import classNames from 'classnames';

import Counter from '../Counter';
import type { Theme } from '../../theme';

const photoOffset = 48;

const button = {
  border: 'none',
  outline: 'none',
  cursor: 'pointer',
};
const iconButton = {
  ...button,
  background: 'none',
  position: 'absolute',
  padding: 10,
};

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
    boxShadow: '0 0 4px 0 rgba(172,172,172,0.50)',
    borderRadius: 5,
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
    width: 70,
    height: 70,
    borderRadius: '50%',
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
    fontSize: 12,
    lineHeight: '15px',
    color: theme.color.primaryLight,
  },
  name: {
    margin: 0,
    fontWeight: 400,
    fontSize: 18,
    lineHeight: '22px',
    color: theme.color.primary,
    display: 'inline-block',
  },
  btnLike: {
    ...iconButton,
    marginTop: -7,
    color: '#d3d3d3',
    transition: 'color 0.2s',
  },
  isLiked: {
    color: '#f00',
  },
  btnShare: {
    ...iconButton,
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
    ...button,
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
};

export const Profile = ({
  classes,
  data: { imgSrc, name, city, country, likes, following, followers },
  handleLike,
  handleFollow,
  isFollowed,
  isLiked,
  handleShare,
}: Props) => (
  <section className={classes.root}>
    <div className={classes.container}>
      <div className={classes.photo}>
        <img className={classes.img} src={imgSrc} alt={name} />
      </div>

      <div className={classes.header}>
        <div className={classes.firstLine}>
          <h1 className={classes.name}>{name}</h1>
          <button
            className={classNames(classes.btnLike, isLiked && classes.isLiked)}
            onClick={handleLike}
            title={isLiked ? 'Dislike' : 'Like'}
          >
            <FontAwesomeIcon icon={LikeIcon} />
          </button>
        </div>
        <div className={classes.secondLine}>
          {city}, {country}
        </div>
      </div>

      <button className={classes.btnShare} onClick={handleShare}>
        <FontAwesomeIcon icon={ShareIcon} />
      </button>

      <div className={classes.footer}>
        <div className={classes.counterList}>
          <Counter className={classes.counter} label="Likes" count={likes} />
          <Counter
            className={classes.counter}
            label="Following"
            count={following}
          />
          <Counter
            className={classes.counter}
            label="Followers"
            count={followers}
          />
        </div>

        <button className={classes.btnFollow} onClick={handleFollow}>
          {isFollowed ? 'Unfollow' : 'Follow'}
        </button>
      </div>
    </div>
  </section>
);

export default injectSheet(styles)(Profile);
