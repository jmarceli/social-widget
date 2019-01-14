// @flow
import * as c from './constants';

export type State = {
  fonts: {
    isLoading: boolean,
    hasErrors: boolean,
  },
};

export type FontsRequestAction = {|
  type: typeof c.FONTS_REQUEST,
|};
export type FontsSuccessAction = {|
  type: typeof c.FONTS_SUCCESS,
|};
export type FontsErrorAction = {|
  type: typeof c.FONTS_ERROR,
  payload: { error: any },
  error: boolean,
|};

export type Action = FontsRequestAction | FontsSuccessAction | FontsErrorAction;
