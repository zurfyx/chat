import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as form } from 'redux-form';

export default combineReducers({
  form,
  routing: routerReducer
});