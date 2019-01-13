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

    default:
      return state;
  }
};

export default reducer;
