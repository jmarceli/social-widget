// @flow
import React from 'react';
import { connect } from 'react-redux';
import Profile from '../Profile';
import Comments from '../Comments';
import WebFont from 'webfontloader';
import injectSheet from 'react-jss';

import { loadData } from '../../dataSources';
import type { Comment } from '../../dataSources';
import type { Theme } from '../../theme';

import * as a from '../../redux/profile/actions';

const topPadding = 12;
const bgTopHeight = 95;

const styles = (theme: Theme) => ({
  root: {
    paddingTop: topPadding,
    paddingBottom: 80,
    width: 320,
    [theme.media.large]: {
      width: 500,
      paddingBottom: 107,
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
  loadProfileData: () => void,
};
type State = {
  commentList: Comment[],
  commentsHidden: boolean,
  isLoadingFont: boolean,
  isLoadingData: boolean,
};

export class App extends React.Component<Props, State> {
  state = {
    isLoadingData: true,
    isLoadingFont: true,
    commentsHidden: false,
    commentList: [],
  };

  async componentDidMount() {
    this.props.loadProfileData();
    WebFont.load({
      google: {
        families: ['Montserrat:400,600', 'sans-serif'],
      },
      fontactive: () => {
        this.setState(() => ({
          isLoadingFont: false,
        }));
      },
    });

    const data = await loadData(this.props.dataUrl);
    this.setState(() => ({
      isLoadingData: false,
      commentList: data.commentList,
    }));
  }

  // handleFollow() {
  //   this.setState(oldState => {
  //     const alreadyFollowed = oldState.isFollowed;
  //     const followers = alreadyFollowed
  //       ? oldState.profile.followers - 1
  //       : oldState.profile.followers + 1;

  //     return {
  //       profile: { ...oldState.profile, followers },
  //       isFollowed: !oldState.isFollowed,
  //     };
  //   });
  // }

  // handleShare() {
  //   window.alert(window.location.href);
  // }

  // handleLike() {
  //   this.setState(oldState => {
  //     const alreadyLiked = oldState.isLiked;
  //     const likes = alreadyLiked
  //       ? oldState.profile.likes - 1
  //       : oldState.profile.likes + 1;

  //     return {
  //       profile: { ...oldState.profile, likes },
  //       isLiked: !oldState.isLiked,
  //     };
  //   });
  // }

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
      commentList,
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
              <Profile url={this.props.dataUrl} />
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

export default connect(
  undefined,
  (dispatch, props) => ({
    loadProfileData: () => dispatch(a.loadRequest(props.dataUrl)),
  }),
)(injectSheet(styles)(App));
