// @flow
import * as c from './constants';
import type { ProfileData } from '../../dataSources';

export type Editable = {
  project: string,
  serial_number: string,
  history_max_size: number,
  history_max_range: number,
  can_speed: number,
};

export type ReadOnly = {
  basset_id: string,
  basset_production_date: Date,
};

export type Profile = ProfileData;

export type State = {
  data: Profile,
  isLoading: boolean,
  error: boolean,
};

export type LoadRequestAction = {|
  type: typeof c.LOAD_REQUEST,
  payload: { url: string },
|};
export type LoadSuccessAction = {|
  type: typeof c.LOAD_SUCCESS,
  data: Profile,
|};
export type LoadErrorAction = {| type: typeof c.LOAD_ERROR, error: any |};
export type LikeRequestAction = {|
  type: typeof c.LIKE_REQUEST,
  payload: { addLike: boolean },
|};
export type FollowRequestAction = {|
  type: typeof c.FOLLOW_REQUEST,
  payload: { addFollow: boolean },
|};

export type Action = LoadRequestAction | LoadSuccessAction | LoadErrorAction;
