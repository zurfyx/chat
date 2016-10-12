import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import clientMiddleware from './middleware/clientMiddleware';
import reducer from './modules/reducer';

export default function configureStore(initialState, apiClient) {
  // Create middleware
  const loggerMiddleware = createLogger();
  const middleware = [thunkMiddleware, clientMiddleware(apiClient), loggerMiddleware];

  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(
      ...middleware
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./modules/reducer', () => {
      const nextRootReducer = require('./modules/reducer').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}