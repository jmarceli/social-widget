// @flow
import React from 'react';
import Counter from '../Counter';

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
      <Counter label="Likes" count={likes} />
      <Counter label="Following" count={following} />
      <Counter label="Followers" count={followers} />
    </div>

    <div>
      <button onClick={handleFollow}>Follow</button>
    </div>
  </section>
);

export default Profile;
