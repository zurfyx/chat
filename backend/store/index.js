/**
 * This is not the database store!
 * It's a volatile storage which makes it possible for Express to communicate
 * with socket.io.
 */
import { createStore, combineReducers } from 'redux';

import room from './room';

const reducer = combineReducers({
  room,
});

export default createStore(reducer);