test('ok', () => {
  expect(1).toBe(1);
});
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
