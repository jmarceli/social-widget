// @flow
import { combineEpics } from 'redux-observable';
import { epics as profileEpics } from './profile';
import { epics as uiEpics } from './ui';

const rootEpic = combineEpics(profileEpics, uiEpics);

export default rootEpic;
