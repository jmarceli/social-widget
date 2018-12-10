// @flow
const reducer = (state: any = {}, action: any) => {
  const type = action.type;

  switch (type) {
    case 'like':
      return {
        ...state,
        likesCount: state.likesCount + 1,
        isLiked: true,
      };
    case 'dislike':
      return {
        ...state,
        likesCount: state.likesCount - 1,
        isLiked: false,
      };
    case 'follow':
      return {
        ...state,
        followersCount: state.followersCount + 1,
        isFollowed: true,
      };
    case 'unfollow':
      return {
        ...state,
        followersCount: state.followersCount - 1,
        isFollowed: false,
      };
    default:
      // do nothing
      return state;
  }
};

export default reducer;
