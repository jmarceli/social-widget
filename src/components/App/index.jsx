// @flow
import React from 'react';
import Profile from '../Profile';

type Props = {};

class App extends React.Component<Props> {
  handleFollow() {}
  handleShare() {}
  handleLike() {}

  render() {
    const data = {
      imgSrc: './harvey-specter.jpg',
      name: 'Harvey Specter',
      city: 'New York',
      country: 'USA',
      likes: 121,
      following: 723,
      followers: 4433,
    };

    return (
      <div className="App">
        <Profile
          data={data}
          handleShare={() => this.handleShare()}
          handleFollow={() => this.handleFollow()}
          handleLike={() => this.handleLike()}
        />
      </div>
    );
  }
}

export default App;
