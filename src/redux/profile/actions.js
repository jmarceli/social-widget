// @flow
import * as c from './constants';
import * as t from './types.flow';

export const loadRequest = (url: string): t.LoadRequestAction => ({
  type: c.LOAD_REQUEST,
  payload: { url },
});
export const loadSuccess = (data: t.Profile): t.LoadSuccessAction => ({
  data,
  type: c.LOAD_SUCCESS,
});
export const loadError = (error: any): t.LoadErrorAction => ({
  error,
  type: c.LOAD_ERROR,
});
export const likeRequest = (addLike: boolean): t.LikeRequestAction => ({
  type: c.LIKE_REQUEST,
  payload: { addLike },
});
export const followRequest = (addFollow: boolean): t.FollowRequestAction => ({
  type: c.FOLLOW_REQUEST,
  payload: { addFollow },
});

// export const save = (deviceId: string, editableData: t.Editable): t.SaveAction => ({
//   deviceId,
//   editableData,
//   type: c.SAVE,
// });
// export const saveSuccess = (): t.SaveSuccessAction => ({
//   type: c.SAVE_SUCCESS,
// });
// export const saveError = (error: any): t.SaveErrorAction => ({
//   error,
//   type: c.SAVE_ERROR,
// });
