const RETRIEVE = 'redux/webhook/RETRIEVE';
const RETRIEVE_SUCCESS = 'redux/webhook/RETRIEVE_SUCCESS';
const RETRIEVE_FAIL = 'redux/webhook/RETRIEVE_FAIL';

export default function reducer(state = {}, action) {
  switch(action.type) {
    case RETRIEVE: {
      return {
        ...state,
        isRetrieving: true,
      }
    }
    case RETRIEVE_SUCCESS: {
      return {
        ...state,
        isRetrieving: false,
        retrieveError: null,
        retrieveResult: action.result,
      }
    }
    case RETRIEVE_FAIL: {
      return {
        ...state,
        isRetrieving: false,
        retrieveError: action.error,
        retrieveResult: null,
      }
    }
    default: {
      return state;
    }
  }
}

export function retrieveGithub(repository) {
  return {
    type: 'socket',
    types: [RETRIEVE, RETRIEVE_SUCCESS, RETRIEVE_FAIL],
    promise: (socket) => socket.emit('GetWebhook', { repository }),
  }
}