import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Home from '../components/Home/Home';

const routes = (
  <Route path="/">
    <IndexRoute component={Home} />
  </Route>
);

export default routes;