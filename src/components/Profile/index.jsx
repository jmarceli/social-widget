// @flow
import React from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareSquare as ShareIcon } from '@fortawesome/free-solid-svg-icons';
import { faHeart as LikeIcon } from '@fortawesome/free-regular-svg-icons';
import classNames from 'classnames';
import ContentLoader from 'react-content-loader';

import Counter from './Counter';
import styles from './style';

type Props = {
  classes: { [string]: {} },
  imgSrc: string,
  name: string,
  city: string,
  country: string,
  likesCount: number,
  isLiked: boolean,
  followersCount: number,
  isFollowed: boolean,
  followingCount: number,
  handleLike: (isLiked: boolean) => void,
  handleFollow: (isFollowed: boolean) => void,
  isLoading: boolean,
  getState: (state: any) => {},
  wrapType: (type: string) => string,
};

const Profile = ({
  classes,
  name,
  imgSrc,
  city,
  country,
  likesCount,
  handleLike,
  followersCount,
  followingCount,
  handleFollow,
  isFollowed,
  isLiked,
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
                onClick={() => handleLike(isLiked)}
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
          onClick={() => {
            window.alert(window.location.href);
          }}
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
            isLoading={isLoading}
            count={likesCount}
          />
          <Counter
            className={classes.counter}
            label="Following"
            isLoading={isLoading}
            count={followingCount}
          />
          <Counter
            className={classes.counter}
            label="Followers"
            isLoading={isLoading}
            count={followersCount}
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
            onClick={() => handleFollow(isFollowed)}
          >
            {isFollowed ? 'Unfollow' : 'Follow'}
          </button>
        )}
      </div>
    </div>
  </section>
);

// TODO: optimize rendering (reselect?)
// getState props should be a function that gets component state from a global store
const mapStateToProps = (
  state,
  { getState = state => state, ...otherProps },
) => ({
  ...getState(state),
  ...otherProps,
});

// wrapType prop should provide a function which will wrap action type
const mapDispatchToProps = (dispatch, { wrapType = type => type }) => ({
  handleLike: isLiked =>
    dispatch({ type: wrapType(isLiked ? 'dislike' : 'like') }),
  handleFollow: isFollowed =>
    dispatch({ type: wrapType(isFollowed ? 'unfollow' : 'follow') }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectSheet(styles)(Profile));
