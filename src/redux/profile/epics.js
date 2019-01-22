// @flow
import { combineEpics, ofType } from 'redux-observable';
import { Observable, from, of, merge } from 'rxjs';
import { mergeMap, map, catchError, debounceTime } from 'rxjs/operators';

import { load } from './logic';

import { LOAD_REQUEST } from './constants';
import { loadSuccess, loadError } from './actions';

import type { Action } from './types.flow';

const loadEpic = (action$: Observable<Action>): Observable<Action> =>
  action$.pipe(
    // thanks to non-FSA compilant naming we can do this (without looking into payload or error)
    ofType(LOAD_REQUEST),
    debounceTime(500),
    mergeMap(action =>
      // () =>
      //   of({ content: 'test123' }).pipe(map(response => loadSuccess(response))),

      // of(a.loadError({ error: 'Some error' })),
      from(load(action.payload.url)).pipe(
        // from(Promise.resolve({ content: 'test123' })).pipe(
        // takeUntil(action$.pipe(ofType(c.LOAD_ERROR))),
        map(response => loadSuccess(response.content)),
        catchError(error => of(loadError({ error }))),
      ),
    ),
  );

const epics = combineEpics(
  // saveEpic,
  loadEpic,
);

export default epics;
