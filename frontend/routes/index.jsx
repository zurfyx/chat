import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from 'containers/App';

/** Split route code in a different chunk.
 * https://webpack.js.org/guides/code-splitting-require/#require-ensure-
 *
 * Usage with React Router's getComponents:
 * https://github.com/ReactTraining/react-router/blob/master/docs/API.md#getcomponentsnextstate-callback
 * <Route path="..." getComponents={getComponents({ main: 'components/Home' })} />
 */
function getComponents(components) {
  return (nextState, callback) => {
    const componentNames = Object.keys(components);
    const componentRoutes = componentNames.map(componentName => components[componentName]);

    // Resolve component routes.
    Promise
      .all(componentRoutes.map(route => System.import(`../${route}/index.jsx`))) // Webpack v2 import.
      .then((resolvedRoutes) => {
        const objectResolvedComponents = resolvedRoutes.reduce((result, current, index) => {
          Object.assign(result, { [componentNames[index]]: current.default || current });
          return result;
        }, {});
        callback(null, objectResolvedComponents);
      });
  };
}

const routes = (
  <Route path="/" component={App}>
    <IndexRoute getComponents={getComponents({ main: 'components/Home', header: 'components/TransparentHeader' })} />
    <Route path="/rooms" getComponents={getComponents({ main: 'containers/Rooms', header: 'containers/DefaultHeader' })} />
    <Route path="/rooms/new" getComponents={getComponents({ main: 'containers/CreateRoom', header: 'containers/DefaultHeader' })} />
    <Route path="/room/:slug" getComponents={getComponents({ main: 'containers/RoomBase' })} />
    <Route path="/room/:slug/:chat" getComponents={getComponents({ main: 'containers/RoomBase' })} />
    <Route path="/contact" getComponents={getComponents({ main: 'components/Contact', header: 'containers/DefaultHeader', footer: 'components/DefaultFooter' })} />
  </Route>
);

export default routes;
