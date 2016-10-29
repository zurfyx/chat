import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from 'containers/App';
import DefaultHeader from 'containers/DefaultHeader';
import TransparentHeader from 'components/TransparentHeader';
import DefaultFooter from 'components/DefaultFooter';
import Home from 'components/Home';
import Room from 'containers/Room';
import CreateRoom from 'containers/CreateRoom';
import Contact from 'components/Contact';

const routes = (
  <Route path="/" component={App}>
    <IndexRoute components={{main: Home, header: TransparentHeader}} />
    <Route path="/rooms" components={{main: Room, header: DefaultHeader}} />
    <Route path="/rooms/new" components={{main: CreateRoom, header: DefaultHeader}} />
    <Route path="/contact" components={{main: Contact, header: DefaultHeader, footer: DefaultFooter}} />
  </Route>
);

export default routes;