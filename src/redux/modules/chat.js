const CREATE = 'redux/chat/CREATE';
const CREATE_SUCCESS = 'redux/chat/CREATE_SUCCESS';
const CREATE_FAIL = 'redux/chat/CREATE_FAIL';

const RETRIEVE = 'redux/chat/RETRIEVE';
const RETRIEVE_SUCCESS = 'redux/chat/RETRIEVE_SUCCESS';
const RETRIEVE_FAIL = 'redux/chat/RETRIEVE_FAIL';

export default function reducer(state = {}, action = {}) {
  switch(action.type) {
    case CREATE:
      return {
        ...state,
        isCreating: true,
      };
    case CREATE_SUCCESS:
      return {
        ...state,
        isCreating: false,
        createError: null,
      };
    case CREATE_FAIL:
      return {
        ...state,
        isCreating: false,
        createError: action.error,
      };
    case RETRIEVE:
      return {
        ...state,
        isRetrieving: true,
      };
    case RETRIEVE_SUCCESS:
      return {
        ...state,
        isRetrieving: false,
        retrieveResult: action.result,
      };
    case RETRIEVE_FAIL:
      return {
        ...state,
        isRetrieving: false,
        retrieveError: action.error,
      };
    default:
      return state;
  }
}

export function create(room, title, description) {
  return {
    types: [CREATE, CREATE_SUCCESS, CREATE_FAIL],
    promise: (client) => client.post(`/api/rooms/${room._id}/chats`, {
      data: {
        title,
        description,
      }
    }),
  };
}

export function retrieve(room) {
  return {
    types: [RETRIEVE, RETRIEVE_SUCCESS, RETRIEVE_FAIL],
    promise: (client) => client.get(`/api/rooms/${room._id}/chats`),
  };
}