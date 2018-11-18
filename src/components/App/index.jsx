// @flow
import React from 'react';
import Profile from '../Profile';
import WebFont from 'webfontloader';
import injectSheet from 'react-jss';

import { loadData } from '../../dataSources';
import type { SourceData, ProfileData } from '../../dataSources';
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
    boxShadow: '0 0 4px 0 rgba(172,172,172,0.50)',
    borderRadius: 5,
  },
  container: {
    marginTop: -bgTopHeight - topPadding,
    background: 'none',
    marginLeft: 17,
    width: '100%',
    display: 'inline-block',
  },
});

type Props = {
  classes: { [string]: {} },
};
type State = {
  profile: ProfileData,
  isFollowed: boolean,
  isLiked: boolean,
};

export class App extends React.Component<Props, State> {
  state = {
    isFollowed: false,
    isLiked: false,
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
    });
  }

  async componentDidMount() {
    const data = await loadData('./profile.json');
    this.setState({
      profile: data.profile,
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

  render() {
    const { classes } = this.props;
    const { profile, isFollowed, isLiked } = this.state;

    return (
      <div className={classes.root}>
        <div className={classes.bgBottom}>
          <div className={classes.bgTop} />
          <div className={classes.container}>
            <Profile
              data={profile}
              isFollowed={isFollowed}
              isLiked={isLiked}
              handleShare={() => this.handleShare()}
              handleFollow={() => this.handleFollow()}
              handleLike={() => this.handleLike()}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default injectSheet(styles)(App);
