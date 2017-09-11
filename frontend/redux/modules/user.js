const RETRIEVE = 'redux/user/RETRIEVE';
const RETRIEVE_SUCCESS = 'redux/user/RETRIEVE_SUCCESS';
const RETRIEVE_FAIL = 'redux/user/RETRIEVE_FAIL';

export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case RETRIEVE_SUCCESS:
      return {
        ...state,
        [action.result._id]: action.result,
      };
    default:
      return state;
  }
}

export function retrieve(userId) {
  return {
    type: 'socket',
    types: [RETRIEVE, RETRIEVE_SUCCESS, RETRIEVE_FAIL],
    promise: (socket) => socket.emit('GetUser', { _id: userId }),
  };
}
