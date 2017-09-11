import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as form } from 'redux-form';

import socket from './socket';
import auth from './auth';
import room from './room';
import chat from './chat';
import message from './message';
import user from './user';
import webhook from './webhook';

export default combineReducers({
  routing: routerReducer,
  socket,
  auth,
  room,
  chat,
  message,
  user,
  webhook,
  form,
});
