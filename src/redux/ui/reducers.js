// @flow
import * as c from './constants';
import type { Action, State } from './types.flow';
import initState from './initState';

const reducer = (state: State = initState, action: Action) => {
  switch (action.type) {
    case c.FONTS_REQUEST:
      return {
        ...state,
        fonts: {
          isLoading: true,
          hasErrors: false,
        },
      };
    case c.FONTS_SUCCESS:
      return {
        ...state,
        fonts: {
          isLoading: false,
          hasErrors: false,
        },
      };
    case c.FONTS_ERROR:
      return {
        ...state,
        fonts: {
          isLoading: false,
          hasErrors: true,
        },
      };
    default:
      return state;
  }
};

export default reducer;
