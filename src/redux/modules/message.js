const RETRIEVE = 'redux/message/RETRIEVE';
const RETRIEVE_SUCCESS = 'redux/message/RETRIEVE_SUCCESS';
const RETRIEVE_APPEND_SUCCESS = 'redux/message/RETRIEVE_APPEND_SUCCESS';
const RETRIEVE_FAIL = 'redux/message/RETRIEVE_FAIL';

// TODO
const SEND = 'redux/message/SEND';
const SEND_SUCCESS = 'redux/message/SEND_SUCCESS';
const SEND_FAIL = 'redux/message/SEND_FAIL';

// Receive doesn't get any message. Just prepares the socket to receive messages.
// TODO
const RECEIVE = 'redux/message/RECEIVE';
const RECEIVE_SUCCESS = 'redux/message/RECEIVE_SUCCESS';
const RECEIVE_FAIL = 'redux/message/RECEIVE_FAIL';

const NEW_MESSAGE = 'redux/message/NEW_MESSAGE';

/**
 *
 * @param state
 * @param action
 * @returns {*}
 */
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
        retrieveResult: action.result, // TODO: merge with current results.
      };
    case RETRIEVE_APPEND_SUCCESS:
      return {
        ...state,
        isRetrieving: false,
        retrieveError: null,
        retrieveResult: state.retrieveResult.concat(action.result),
      }
    case RETRIEVE_FAIL:
      return {
        ...state,
        isRetrieving: false,
        retrieveError: action.error,
        retrieveResult: null, // TODO: do not empty the store.
      };
    case NEW_MESSAGE:
      return {
        ...state,
        retrieve,
        retrieveResult: state.retrieveResult.concat(action.result), // TODO: merge with current results.
      };
    // TODO: clear messages.
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

export function retrieveAppend(chatId) {
  // TODO: Temporal function for loading chat forks until we get the message storage done.
  return {
    types: [RETRIEVE, RETRIEVE_APPEND_SUCCESS, RETRIEVE_FAIL],
    promise: (client) => client.get(`/api/chats/${chatId}/messages`),
  }
}

export function send(chatId, content, type, specifics) {
  const message = { chatId, content, type, specifics };
  return {
    type: 'socket',
    types: [SEND, SEND_SUCCESS, SEND_FAIL],
    promise: (socket) => socket.emit('SendMessage', message),
  }
}

// Receive any messages.
export function receive() {
  return (dispatch) => {
    const newMessage = (message) => {
      return dispatch({
        type: NEW_MESSAGE,
        result: message,
      });
    };

    return dispatch({
      type: 'socket',
      types: [RECEIVE, RECEIVE_SUCCESS, RECEIVE_FAIL],
      promise: (socket) => socket.on('ReceiveMessage', newMessage),
    });
  }
}