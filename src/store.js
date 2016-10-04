import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import reducer from './reducer';

export default function configureStore(initialState) {
  // Create middleware
  const loggerMiddleware = createLogger();
  const middleware = [thunkMiddleware, loggerMiddleware];

  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(
      ...middleware
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducer', () => {
      const nextRootReducer = require('./reducer').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}