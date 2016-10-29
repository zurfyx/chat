const CREATE = 'redux/room/CREATE';
const CREATE_SUCCESS = 'redux/room/CREATE_SUCCESS';
const CREATE_FAIL = 'redux/room/CREATE_FAIL';

const RETRIEVE = 'redux/room/retrieve';
const RETRIEVE_SUCCESS = 'redux/room/RETRIEVE_SUCCESS';
const RETRIEVE_FAIL = 'redux/room/RETRIEVE_FAIL';

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

export function create(title, slug, description) {
  return {
    types: [CREATE, CREATE_SUCCESS, CREATE_FAIL],
    promise: (client) => client.post('/api/rooms', {
      data: {
        title,
        slug,
        description,
      }
    }),
  };
}

export function retrieve() {
  return {
    types: [RETRIEVE, RETRIEVE_SUCCESS, RETRIEVE_FAIL],
    promise: (client) => client.get('/api/rooms'),
  };
}
