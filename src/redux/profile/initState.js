// @flow
import type { State } from './types.flow';

const initState: State = {
  data: {
    imgSrc: '',
    name: '',
    city: '',
    country: '',
    likes: 0,
    following: 0,
    followers: 0,
    isFollowed: false,
    isLiked: false,
  },
  isLoading: true,
  error: false,
};

export default initState;
