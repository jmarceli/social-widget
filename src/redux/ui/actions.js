// @flow
import * as c from './constants';
import * as t from './types.flow';

export const fontsRequest = (): t.FontsRequestAction => ({
  type: c.FONTS_REQUEST,
});
export const fontsSuccess = (): t.FontsSuccessAction => ({
  type: c.FONTS_SUCCESS,
});
export const fontsError = (error: any): t.FontsErrorAction => ({
  type: c.FONTS_ERROR,
  payload: { error },
  error: true,
});
