// test('ok', () => {
// expect(1).toBe(1);
// });
// import 'rxjs';
// import { TestScheduler } from 'rxjs/testing';
// import { ActionsObservable } from 'redux-observable';

// import epics from './epics';
// import * as actions from './actions';

// const deepEquals = (actual, expected) => expect(actual).toEqual(expected);

// const createTestScheduler = () => new TestScheduler(deepEquals);

// test('it should return success', () => {
//   const marbles1 = '-a';
//   const marbles2 = '-b';
//   const values = {
//     a: actions.loadRequest('http://test.test'),
//     b: actions.loadSuccess(),
//   };

//   const ts = createTestScheduler();
//   const source = ActionsObservable.from(
//     ts.createColdObservable(marbles1, values),
//   );
//   const actual = epics(source);
//   ts.expectObservable(actual).toBe(marbles2, values);
//   ts.flush();
// });

import { marbles } from 'rxjs-marbles/jest';
import { filter } from 'rxjs/operators';

import { of } from 'rxjs';
import epics from './epics';
import { LOAD_REQUEST } from './constants';

import { load } from './logic';
import { loadSuccess } from './actions';
jest.mock('./logic');
// jest.mock('./actions');
load.mockImplementation(() => of({ content: 'test content' }));
//   () =>
//     new Promise(resolve => ({
//       response: { content: 'test' },
//     })),
// );

// load.mockImplementation(url => {
//   return new Promise((resolve, reject) => {
//     reject('err');
//     // resolve({ response: { content: 'test' } });
//   });
// });
// loadSuccess.mockImplementation(jest.fn);
// loadError.mockImplementation(jest.fn);

test(
  'profile epic',
  marbles(m => {
    const values = {
      a: { type: LOAD_REQUEST, payload: { url: 'any' } },
      b: { type: 'Unknown' },
      r: loadSuccess('test content'),
    };
    // const state$ = m.cold('  s--------------------|', values);
    const action$ = m.cold('  -a-b-a-aaa 500ms |', values);
    // const expected$ = m.cold('-r---r-rrr----------|', values);
    const expected$ = m.cold('--------- 500ms r|', values);

    const actual$ = epics(action$);

    // expect(loadSuccess).toBeCalledTimes(5);
    m.expect(actual$).toBeObservable(expected$);
  }),
);

// test(
//   'filter operator',
//   marbles(m => {
//     const values = {
//       a: 2,
//       b: 30,
//       c: 22,
//       d: 5,
//       e: 60,
//       f: 1,
//     };
//     const source = m.cold('  -a-b-c-d-e-f---|', values);
//     const expected = m.cold('---b-c---e-----|', values);
//     const actual = source.pipe(filter(x => x > 10));
//     m.expect(actual).toBeObservable(expected);
//   }),
// );
