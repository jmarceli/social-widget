// @flow
import React from 'react';
import { connect } from 'react-redux';
import Profile from '../Profile';
import Comments from '../Comments';
import injectSheet from 'react-jss';

import { loadData } from '../../dataSources';
import type { Comment } from '../../dataSources';

import * as a from '../../redux/profile/actions';
import { fontsRequest } from '../../redux/ui/actions';

import styles from './styles';

type Props = {
  classes: { [string]: {} },
  dataUrl: string,
  loadProfileData: () => void,
  loadFonts: () => void,
};
type State = {
  commentList: Comment[],
  commentsHidden: boolean,
  isLoadingData: boolean,
};

export class App extends React.Component<Props, State> {
  state = {
    isLoadingData: true,
    commentsHidden: false,
    commentList: [],
  };

  async componentDidMount() {
    this.props.loadProfileData();
    this.props.loadFonts();

    const data = await loadData(this.props.dataUrl);
    this.setState(() => ({
      isLoadingData: false,
      commentList: data.commentList,
    }));
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
    const { commentList, isLoadingData, commentsHidden } = this.state;

    return (
      <div className={classes.root}>
        <div className={classes.bgBottom}>
          <div className={classes.bgTop} />
          <div className={classes.container}>
            <div className={classes.profileWrapper}>
              <Profile url={this.props.dataUrl} />
            </div>
            <Comments
              isLoading={isLoadingData}
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
    loadFonts: () => dispatch(fontsRequest()),
  }),
)(injectSheet(styles)(App));
