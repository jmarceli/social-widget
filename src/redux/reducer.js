// @flow
import { combineReducers } from 'redux';
import { reducers as profileReducers } from './profile';

const reducer = combineReducers({
  profile: profileReducers, // ui
});

export default reducer;
