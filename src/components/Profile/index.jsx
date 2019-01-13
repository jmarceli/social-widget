// @flow
import React from 'react';
import injectSheet from 'react-jss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareSquare as ShareIcon } from '@fortawesome/free-solid-svg-icons';
import { faHeart as LikeIcon } from '@fortawesome/free-regular-svg-icons';
import classNames from 'classnames';
import ContentLoader from 'react-content-loader';
import { connect } from 'react-redux';
import * as a from '../../redux/profile/actions';

import Counter from './Counter';
import type { Profile as ProfileData } from '../../redux/profile/types.flow';
import styles from './styles';

type Props = {
  classes: { [string]: {} },
  data: ProfileData,
  handleLike: () => void,
  handleFollow: () => void,
  handleShare: () => void,
  handleReload: () => void,
  isLoading: boolean,
  error: ?string,
};

export const Profile = ({
  classes,
  data: {
    imgSrc,
    name,
    city,
    country,
    likes,
    following,
    followers,
    isFollowed,
    isLiked,
  } = {},
  handleLike,
  handleFollow,
  handleShare,
  handleReload,
  isLoading,
  error,
}: Props) => (
  <section className={classes.root}>
    <div className={classes.container}>
      {error ? (
        <>
          <div>Loading error</div>
          <button onClick={handleReload}>Try again!</button>
        </>
      ) : (
        <>
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
        </>
      )}
    </div>
  </section>
);

export const ProfileStyled = injectSheet(styles)(Profile);

const mapStateToProps = state => ({
  data: state.profile.data,
  isLoading: state.profile.isLoading,
  error: state.profile.error,
  handleLike: () => {},
  handleFollow: () => {},
  handleShare: () => {},
});

const mapDispatchToProps = (dispatch, props) => ({
  handleReload: () => dispatch(a.loadRequest(props.url)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileStyled);
