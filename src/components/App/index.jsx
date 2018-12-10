// @flow
import React from 'react';
import { connect } from 'react-redux';
import Profile from '../Profile';
// import Comments from '../Comments';
import injectSheet from 'react-jss';
import styles from './style';
import actions from './actions';

// import type { Comment } from '../../dataSources';

type Props = {
  classes: { [string]: {} },
  dataUrl: string,
  fontLoad: () => void,
  dataLoad: () => void,
  getState: ({}) => any,
  wrapType: string => string,
};

class App extends React.Component<Props> {
  componentDidMount() {
    const { fontLoad, dataLoad } = this.props;
    // start loading external data
    fontLoad();
    dataLoad();
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.bgBottom}>
          <div className={classes.bgTop} />
          <div className={classes.container}>
            <div className={classes.profileWrapper}>
              <Profile
                getState={(state: any) => this.props.getState(state).profile}
                wrapType={type => this.props.wrapType(`profile.${type}`)}
              />
            </div>
            {/*<Comments
              isLoading={isLoadingFont || isLoadingData}
              isHidden={commentsHidden}
              list={commentList}
              handleHide={() => this.handleCommentsHide()}
              handleAdd={values => this.handleAddComment(values)}
            />*/}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (
  state,
  { getState = state => state, ...otherProps },
) => ({
  ...getState(state),
  ...otherProps,
});

// wrapType prop should provide a function which will wrap action type
const mapDispatchToProps = (dispatch, { wrapType = type => type, dataUrl }) => {
  return {
    fontLoad: () => {
      dispatch(actions.fontLoad(wrapType));
    },
    dataLoad: () => {
      dispatch(actions.dataLoad(wrapType, dataUrl));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectSheet(styles)(App));
