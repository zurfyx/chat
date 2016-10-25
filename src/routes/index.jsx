import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from 'containers/App';
import DefaultHeader from 'containers/DefaultHeader';
import DefaultFooter from 'components/DefaultFooter';
import Home from 'components/Home';

const routes = (
  <Route path="/" component={App}>
    <IndexRoute components={{main: Home, header: DefaultHeader}} />
  </Route>
);

export default routes;