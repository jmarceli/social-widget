// @flow
import * as c from './constants';
import type { Action, State } from './types.flow';
import initState from './initState';

const reducer = (state: State = initState, action: Action) => {
  switch (action.type) {
    case c.LOAD_REQUEST:
      return {
        error: false,
        isLoading: true,
        data: initState.data,
      };
    case c.LOAD_SUCCESS:
      return {
        error: false,
        isLoading: false,
        data: action.data,
      };
    case c.LOAD_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case c.LIKE_REQUEST:
      return {
        ...state,
        data: {
          ...state.data,
          likes: state.data.likes + (action.payload.addLike ? 1 : -1),
          isLiked: action.payload.addLike,
        },
      };
    case c.FOLLOW_REQUEST:
      return {
        ...state,
        data: {
          ...state.data,
          followers: state.data.followers + (action.payload.addFollow ? 1 : -1),
          isFollowed: action.payload.addFollow,
        },
      };

    default:
      return state;
  }
};

export default reducer;
