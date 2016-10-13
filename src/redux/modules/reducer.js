import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as form } from 'redux-form';

import auth from './auth';

export default combineReducers({
  routing: routerReducer,
  auth,
  form
});