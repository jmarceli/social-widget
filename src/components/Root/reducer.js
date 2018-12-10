// @flow
import { combineReducers } from 'redux';
import { default as appReducer } from '../App/reducer';

const reducer = combineReducers({
  app: (state = {}, action) => {
    // handle actions prefixed by "app." with App reducer
    if (action.type.startsWith('app.')) {
      return appReducer(state, {
        ...action,
        // unwrap action type string
        type: action.type.replace('app.', ''),
      });
    }
    return state;
  },
});

export default reducer;
