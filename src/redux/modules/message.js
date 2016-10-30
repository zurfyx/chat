const RETRIEVE = 'redux/message/RETRIEVE';
const RETRIEVE_SUCCESS = 'redux/message/RETRIEVE_SUCCESS';
const RETRIEVE_FAIL = 'redux/message/RETRIEVE_FAIL';

export default function reducer(state = {}, action = {}) {
  switch(action.type) {
    case RETRIEVE:
      return {
        ...state,
        isRetrieving: true,
      };
    case RETRIEVE_SUCCESS:
      return {
        ...state,
        isRetrieving: false,
        retrieveError: null,
        retrieveResult: action.result,
      };
    case RETRIEVE_FAIL:
      return {
        ...state,
        isRetrieving: false,
        retrieveError: action.error,
        retrieveResult: null,
      };
    default:
      return state;
  }
}

export function retrieve(chatId) {
  return {
    types: [RETRIEVE, RETRIEVE_SUCCESS, RETRIEVE_FAIL],
    promise: (client) => client.get(`/api/chats/${chatId}/messages`),
  }
}