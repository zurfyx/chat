const CREATE = 'redux/chat/CREATE';
const CREATE_SUCCESS = 'redux/chat/CREATE_SUCCESS';
const CREATE_FAIL = 'redux/chat/CREATE_FAIL';

const RETRIEVE = 'redux/chat/RETRIEVE';
const RETRIEVE_SUCCESS = 'redux/chat/RETRIEVE_SUCCESS';
const RETRIEVE_FAIL = 'redux/chat/RETRIEVE_FAIL';

const EDIT = 'redux/chat/EDIT';
const EDIT_SUCCESS = 'redux/chat/EDIT_SUCCESS';
const EDIT_FAIL = 'redux/chat/EDIT_FAIL';

const RECEIVE_CHAT = 'redux/chat/RECEIVE_CHAT';

const ACTIVATE = 'redux/chat/ACTIVATE';
const ACTIVATE_SUCCESS = 'redux/chat/ACTIVATE_SUCCESS';
const ACTIVATE_FAIL = 'redux/chat/ACTIVATE_FAIL';

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
    case EDIT:
      return {
        ...state,
        isEditing: true,
      };
    case EDIT_SUCCESS:
      return {
        ...state,
        isEditing: false,
        editError: null,
        editResult: action.result,
      };
    case EDIT_FAIL:
      return {
        ...state,
        isEditing: false,
        editError: action.error,
        editResult: null,
      };
    case RECEIVE_CHAT:
      if (state.activateResult._id !== action.result._id) {
        return { ...state };
      }

      return {
        ...state,
        activateResult: action.result,
      };
    case ACTIVATE:
      return {
        ...state,
        isActivating: true,
      };
    case ACTIVATE_SUCCESS:
      return {
        ...state,
        isActivating: false,
        activateError: null,
        activateResult: action.result,
      };
    case ACTIVATE_FAIL:
      return {
        ...state,
        isActivating: false,
        activateError: action.error,
        activateResult: null,
      };
    default:
      return state;
  }
}

export function create(roomId, title, description) {
  return {
    types: [CREATE, CREATE_SUCCESS, CREATE_FAIL],
    promise: (client) => client.post(`/api/rooms/${roomId}/chats`, {
      data: {
        title,
        description,
      }
    }),
  };
}

export function retrieve(roomId) {
  return {
    types: [RETRIEVE, RETRIEVE_SUCCESS, RETRIEVE_FAIL],
    promise: (client) => client.get(`/api/rooms/${roomId}/chats`),
  };
}

export function socketEdit(chatId, values) {
  const editValues = Object.assign({ _id: chatId }, values);
  return {
    type: 'socket',
    types: [EDIT, EDIT_SUCCESS, EDIT_FAIL],
    promise: (socket) => socket.emit('EditChat', editValues),
  }
}

// Subscription to receive any chat updates.
export function receive() {
  return (dispatch) => {
    const chatUpdate = (chat) => {
      console.info('update');
      return dispatch({
        type: RECEIVE_CHAT,
        result: chat,
      });
    };

    return dispatch({
      type: 'socket',
      types: [null, null, null],
      promise: (socket) => socket.on('ReceiveChat', chatUpdate),
    });
  }
}

export function activate(chatId) {
  return {
    types: [ACTIVATE, ACTIVATE_SUCCESS, ACTIVATE_FAIL],
    promise: (client) => client.get(`/api/chats/${chatId}`),
  };
}