// @flow
import { combineReducers } from 'redux';
import { reducers as profileReducers } from './profile';
import { reducers as uiReducers } from './ui';

const reducer = combineReducers({
  profile: profileReducers, // ui
  ui: uiReducers, // ui
});

export default reducer;
