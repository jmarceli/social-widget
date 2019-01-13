// @flow
import { combineEpics } from 'redux-observable';
import { epics as profileEpics } from './profile';

const rootEpic = combineEpics(profileEpics);

export default rootEpic;
