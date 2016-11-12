import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import SocketClient from './helpers/SocketClient';
import ApiClient from './helpers/ApiClient';
import configureStore from './redux/create';

const socketClient = new SocketClient();
const apiClient = new ApiClient();

const initialState = {};
const store = configureStore(initialState, socketClient, apiClient);
const history = syncHistoryWithStore(browserHistory, store);

const mountPoint = document.getElementById('main');

const renderApp = () => {
  // Import global styles. Specific styles can be found inside Components or Containers.
  require('./styles/global.scss');

  const routes = require('./routes').default;

  render((
    <Provider store={store}>
      <Router history={history}>
        {routes}
      </Router>
    </Provider>
  ), mountPoint);
};

// development
if (module.hot) {
  const reRenderApp = () => {
    try {
      renderApp();
    } catch (error) {
      const RedBox = require('redbox-react').default;

      render(<RedBox error={error} />, mountPoint);
    }
  };

  module.hot.accept('./routes', () => {
    setImmediate(() => {
      // Preventing the hot reloading error from react-router
      unmountComponentAtNode(mountPoint);
      reRenderApp();
    });
  });
}

renderApp();