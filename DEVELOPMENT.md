# Development

Project decisions with brief justification.

## Redux actions - No FSA

FSA https://github.com/redux-utilities/flux-standard-action is not used
because of redux-observable and redux dev tools poor FSA support.
It's just easier to provide relevant info in action type if we use
`ofType()` helper for redux-observable.

FSA action names vs convention adapted in this project:

`profile/LOAD_REQUEST` vs `REQUEST_PROFILE_LOAD`
`profile/LOAD_SUCCESS` vs `REQUEST_PROFILE_LOAD` (with payload)
`profile/LOAD_ERROR` vs `REQUEST_PROFILE_LOAD` (with error as payload)

but despite naming deviation the action structure is following FSA guidelines:

- `type`, `payload`, `error` properties (and optional `meta` - if needed)
- error typed actions has `payload` with `error` object

## Code structure

1. Only `components/` dir to ease "upgrade" procedure from component to "connected" component
2. Redux related code is separated by the domain (others options: https://redux.js.org/faq/code-structure#what-should-my-file-structure-look-like-how-should-i-group-my-action-creators-and-reducers-in-my-project-where-should-my-selectors-go)
3. As for Redux "modules" each piece of information is in its own file to ease navigation and ensure future codebase expansion/growth
4. Redux `store` is created in `redux/store.js` (instead of default `configureStore.js`) file from `./reducers.js` and `./epics.js` which gathers all domain specific code

## Asyc actions

They are handled by `redux-observable` as it is the most complete and future-proof solution.
Other considered/possible options are:

- redux-thunk (https://github.com/reduxjs/redux-thunk) - simplest
- redux-saga (https://github.com/redux-saga/redux-saga) - most popular

## Tests

Jest + react-testing-library (https://github.com/kentcdodds/react-testing-library) which encourage good testing practices.
We would like to write simple Jest unit tests for non-react related code and integration tests for React components.

## TODO

- HMR (https://redux.js.org/recipes/configuring-your-store) - it needs configuration
- Immutable.js (https://facebook.github.io/immutable-js) - decide (fairly complex but popular - https://redux.js.org/recipes/using-immutablejs-with-redux)
- action creator helpers to clean/dry code (actually maybe we can use redux-actions package, with custom action names?)
- axios - for external data fetching
- SSR (https://redux.js.org/recipes/server-rendering)
- add e2e testing with Cypress
- derived data memoization with reselect
- normalize state with normalizer? (https://tonyhb.gitbooks.io/redux-without-profanity/content/normalizer.html)
