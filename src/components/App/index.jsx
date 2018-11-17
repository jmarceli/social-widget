// @flow
import React from 'react';
import Profile from '../Profile';
import WebFont from 'webfontloader';
import injectSheet from 'react-jss';

import { loadData } from '../../dataSources';
import type { ProfileData } from '../../dataSources';

const topPadding = 12;
const bgTopHeight = 95;

const styles = theme => ({
  root: {
    paddingTop: topPadding,
    width: 320,
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
  data: ProfileData,
};

export class App extends React.Component<Props, State> {
  state = {
    data: {
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
      data,
    });
  }

  handleFollow() {}
  handleShare() {}
  handleLike() {}

  render() {
    const { classes } = this.props;
    const { data } = this.state;

    return (
      <div className={classes.root}>
        <div className={classes.bgBottom}>
          <div className={classes.bgTop} />
          <div className={classes.container}>
            <Profile
              data={data}
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
