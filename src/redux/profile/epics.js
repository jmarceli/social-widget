// @flow
import { combineEpics, ofType } from 'redux-observable';
import { Observable, from, of, merge } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';

import { load } from './logic';

import * as c from './constants';
import * as a from './actions';

import * as t from './types.flow';

const loadEpic = (action$: Observable<t.Action>): Observable<t.Action> =>
  action$.pipe(
    // thanks to non-FSA compilant naming we can do this (without looking into payload or error)
    ofType(c.LOAD_REQUEST),
    mergeMap(action =>
      merge(
        // of(a.loadError({ error: 'Some error' })),
        from(load(action.payload.url)).pipe(
          // takeUntil(action$.pipe(ofType(c.LOAD_ERROR))),
          map(response => a.loadSuccess(response)),
          catchError(error => of(a.loadError({ error }))),
        ),
      ),
    ),
  );

const epics = combineEpics(
  // saveEpic,
  loadEpic,
);

export default epics;
