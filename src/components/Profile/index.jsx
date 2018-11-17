// @flow
import React from 'react';

type Props = {
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
  handleShare: () => void,
};

const Profile = ({
  data: { imgSrc, name, city, country, likes, following, followers },
  handleLike,
  handleFollow,
  handleShare,
}: Props) => (
  <section>
    <img src={imgSrc} alt="{name}" />

    <div>
      <div>
        <h1>{name}</h1>
        <button onClick={handleLike}>like</button>
      </div>
      <div>
        {city}, {country}
      </div>
    </div>

    <button onClick={handleShare}>share</button>

    <div>
      <div>
        <div>{likes}</div>
        <div>Likes</div>
      </div>
      <div>
        <div>{following}</div>
        <div>Following</div>
      </div>
      <div>
        <div>{followers}</div>
        <div>Followers</div>
      </div>
    </div>

    <div>
      <button onClick={handleFollow}>Follow</button>
    </div>
  </section>
);

export default Profile;
