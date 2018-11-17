// @flow
import React from 'react';
import injectSheet from 'react-jss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareSquare as ShareIcon } from '@fortawesome/free-solid-svg-icons';
import { faHeart as LikeIcon } from '@fortawesome/free-regular-svg-icons';

import Counter from '../Counter';

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

const styles = theme => ({
  root: {
    paddingTop: photoOffset,
    maxWidth: 283,
  },
  container: {
    background: theme.color.white,
    boxShadow: '0 0 4px 0 rgba(172,172,172,0.50)',
    borderRadius: 5,
    position: 'relative',
    paddingLeft: 20,
    paddingRight: 15,
    paddingBottom: 17,
  },
  photo: {
    marginTop: -photoOffset,
    marginBottom: 16,
    textAlign: 'center',
    display: 'inline-block',
    width: '100%',
  },
  img: {
    width: 70,
    height: 70,
    borderRadius: '50%',
  },
  header: {
    textAlign: 'center',
    marginBottom: 35,
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
    '&:hover': {
      color: '#f00',
    },
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
  },
  divider: {
    backgroundColor: '#979797',
    opacity: 0.1,
    width: 1,
    height: 38,
  },
  footer: {},
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
  handleShare: () => void,
};

export const Profile = ({
  classes,
  data: { imgSrc, name, city, country, likes, following, followers },
  handleLike,
  handleFollow,
  isFollowed,
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
          <button className={classes.btnLike} onClick={handleLike}>
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

      <div className={classes.counterList}>
        <Counter label="Likes" count={likes} />
        <div className={classes.divider} />
        <Counter label="Following" count={following} />
        <div className={classes.divider} />
        <Counter label="Followers" count={followers} />
      </div>

      <div className={classes.footer}>
        <button className={classes.btnFollow} onClick={handleFollow}>
          {isFollowed ? 'Unfollow' : 'Follow'}
        </button>
      </div>
    </div>
  </section>
);

export default injectSheet(styles)(Profile);
