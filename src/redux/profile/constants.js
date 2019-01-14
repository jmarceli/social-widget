// @flow
// we don't use FSA https://github.com/redux-utilities/flux-standard-action
// because of redux-observable and redux dev tools
// (it's just easier to provide relevant info in action type)
// as a context FSA actions will look like those in comments
export const LOAD_REQUEST = 'profile/LOAD_REQUEST'; // REQUEST_PROFILE_LOAD
export const LOAD_SUCCESS = 'profile/LOAD_SUCCESS'; // REQUEST_PROFILE_LOAD (with payload)
export const LOAD_ERROR = 'profile/LOAD_ERROR'; // REQUEST_PROFILE_LOAD (with error as payload)

export const LIKE_REQUEST = 'profile/LIKE_REQUEST';
export const FOLLOW_REQUEST = 'profile/FOLLOW_REQUEST';
