// @flow
import { default as profileReducer } from '../Profile/reducer';

const reducer = (state: any = {}, action: any) => {
  const type = action.type;

  // handle actions prefixed by "profile." with Profile reducer
  if (action.type.startsWith('profile.')) {
    return {
      ...state,
      profile: profileReducer(state.profile, {
        ...action,
        // unwrap action type string
        type: action.type.replace('profile.', ''),
      }),
    };
  }

  // handle own actions
  switch (type) {
    case 'fontLoad':
      return {
        ...state,
        fontLoading: true,
      };
    case 'fontLoadSuccess':
      return {
        ...state,
        profile: {
          ...state.profile,
          isLoading: state.dataLoading, // || false
        },
        fontLoading: false,
      };
    case 'dataLoad':
      return {
        ...state,
        dataLoading: true,
      };
    case 'dataLoadSuccess':
      return {
        ...state,
        profile: {
          ...state.profile,
          ...action.payload.profile,
          isLoading: state.fontLoading, // || false
        },
        dataLoading: false,
      };
    default:
      // do nothing
      return state;
  }
};

export default reducer;
