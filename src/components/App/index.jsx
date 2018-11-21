// @flow
import React from 'react';
import Profile from '../Profile';
import Comments from '../Comments';
import WebFont from 'webfontloader';
import injectSheet from 'react-jss';

import { loadData } from '../../dataSources';
import type { Comment, ProfileData } from '../../dataSources';
import type { Theme } from '../../theme';

const topPadding = 12;
const bgTopHeight = 95;

const styles = (theme: Theme) => ({
  root: {
    paddingTop: topPadding,
    width: 320,
    [theme.media.large]: {
      width: 500,
    },
  },
  bgTop: {
    background: theme.color.primary,
    height: bgTopHeight,
    borderRadius: '5px 5px 0 0',
  },
  bgBottom: {
    background: theme.color.white,
    boxShadow: theme.shadow.standard,
    borderRadius: theme.radius,
    paddingBottom: theme.padding.base,
  },
  container: {
    marginTop: -bgTopHeight - topPadding,
    background: 'none',
    paddingLeft: theme.padding.base,
    width: '100%',
    display: 'inline-block',
  },
  profileWrapper: {
    marginBottom: 15,
  },
});

type Props = {
  classes: { [string]: {} },
  dataUrl: string,
};
type State = {
  commentList: Comment[],
  profile: ProfileData,
  commentsHidden: boolean,
  isFollowed: boolean,
  isLiked: boolean,
  isLoadingFont: boolean,
  isLoadingData: boolean,
};

export class App extends React.Component<Props, State> {
  state = {
    isLoadingData: true,
    isLoadingFont: true,
    isFollowed: false,
    isLiked: false,
    commentsHidden: false,
    commentList: [],
    profile: {
      imgSrc: '',
      name: '',
      city: '',
      country: '',
      followers: 0,
      likes: 0,
      following: 0,
    },
  };

  constructor() {
    super();
    WebFont.load({
      google: {
        families: ['Montserrat:400,600', 'sans-serif'],
      },
      fontactive: () => {
        this.setState({
          isLoadingFont: false,
        });
      },
    });
  }

  async componentDidMount() {
    const data = await loadData(this.props.dataUrl);
    this.setState({
      isLoadingData: false,
      profile: data.profile,
      commentList: data.commentList,
    });
  }

  handleFollow() {
    this.setState(oldState => {
      const alreadyFollowed = oldState.isFollowed;
      const followers = alreadyFollowed
        ? oldState.profile.followers - 1
        : oldState.profile.followers + 1;

      return {
        profile: { ...oldState.profile, followers },
        isFollowed: !oldState.isFollowed,
      };
    });
  }

  handleShare() {
    window.alert(window.location.href);
  }

  handleLike() {
    this.setState(oldState => {
      const alreadyLiked = oldState.isLiked;
      const likes = alreadyLiked
        ? oldState.profile.likes - 1
        : oldState.profile.likes + 1;

      return {
        profile: { ...oldState.profile, likes },
        isLiked: !oldState.isLiked,
      };
    });
  }

  handleCommentsHide() {
    this.setState(oldState => {
      return {
        commentsHidden: !oldState.commentsHidden,
      };
    });
  }

  // Adds comment to commentList
  handleAddComment(values: { [string]: string }) {
    const { comment } = values;

    // skip if comment is empty
    if (!comment) {
      return;
    }

    this.setState(oldState => {
      const commentList = [...oldState.commentList];
      // note you are always logged in as Mike Ross
      commentList.push({
        author: 'Mike Ross',
        imgSrc: './harvey-specter.jpg',
        pubTimestamp: Date.now(),
        content: comment,
      });
      return {
        commentList,
      };
    });
  }

  render() {
    const { classes } = this.props;
    const {
      profile,
      commentList,
      isFollowed,
      isLiked,
      isLoadingFont,
      isLoadingData,
      commentsHidden,
    } = this.state;

    return (
      <div className={classes.root}>
        <div className={classes.bgBottom}>
          <div className={classes.bgTop} />
          <div className={classes.container}>
            <div className={classes.profileWrapper}>
              <Profile
                isLoading={isLoadingFont || isLoadingData}
                data={profile}
                isFollowed={isFollowed}
                isLiked={isLiked}
                handleShare={() => this.handleShare()}
                handleFollow={() => this.handleFollow()}
                handleLike={() => this.handleLike()}
              />
            </div>
            <Comments
              isLoading={isLoadingFont || isLoadingData}
              isHidden={commentsHidden}
              list={commentList}
              handleHide={() => this.handleCommentsHide()}
              handleAdd={values => this.handleAddComment(values)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default injectSheet(styles)(App);
