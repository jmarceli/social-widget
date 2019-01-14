// @flow
import { combineEpics, ofType } from 'redux-observable';
import { Observable, from, of, merge } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';

import { loadFonts } from './logic';

import { FONTS_REQUEST } from './constants';
import { fontsSuccess, fontsError } from './actions';

import type { Action } from './types.flow';

const uiEpic = (action$: Observable<Action>): Observable<Action> =>
  action$.pipe(
    ofType(FONTS_REQUEST),
    mergeMap(() =>
      merge(
        // of(a.fontsError({ error: 'Some error' })),
        from(loadFonts()).pipe(
          // takeUntil(action$.pipe(ofType(c.FONTS_ERROR))),
          map(() => fontsSuccess()),
          catchError(error => of(fontsError(error))),
        ),
      ),
    ),
  );

const epics = combineEpics(uiEpic);

export default epics;
