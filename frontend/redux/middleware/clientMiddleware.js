/**
 * Copyright (c) 2015 Erik Rasmussen
 * https://github.com/erikras/react-redux-universal-hot-example/blob/master/src/redux/middleware/clientMiddleware.js
 */
export default function clientMiddleware(client) {
  return ({dispatch, getState}) => {
    return next => action => {
      if (typeof action === 'function') {
        return action(dispatch, getState);
      }

      const { promise, types, ...rest } = action; // eslint-disable-line no-redeclare
      if (!promise) {
        return next(action);
      }

      const [REQUEST, SUCCESS, FAILURE] = types;
      next({...rest, type: REQUEST});

      /**
       * Fetch url and return the resulting action.
       * promise: (client) => client.get('url')
       * client: obj that contains the definition for get, post...
       */
      return promise(client)
        .then(data => data.json())
        .then(json => (json.error
            ? next({...rest, error: json.error, type: FAILURE })
            : next({...rest, result: json, type: SUCCESS })
          )
        )
        .catch((error) => {
          console.error('MIDDLEWARE ERROR:', error);
          return next({...rest, error, type: FAILURE});
        });
    };
  };
}