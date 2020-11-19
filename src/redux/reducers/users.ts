import omit from 'lodash/omit';
import without from 'lodash/without';
import { ServerStageEvents, ServerUserEvents } from '../../global/SocketEvents';
import { User } from '../../types';

export interface UsersStore {
  byId: {
    [id: string]: User;
  };
  allIds: string[];
}

function users(
  state: UsersStore = {
    byId: {},
    allIds: [],
  },
  action: {
    type: string;
    payload: any;
  }
) {
  switch (action.type) {
    case ServerStageEvents.USER_ADDED:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload._id]: action.payload,
        },
        allIds: [...state.allIds, action.payload._id],
      };
    case ServerStageEvents.USER_CHANGED:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload._id]: {
            ...state.byId[action.payload._id],
            ...action.payload,
          },
        },
      };
    case ServerStageEvents.USER_REMOVED:
      return {
        ...state,
        byId: omit(state.byId, action.payload),
        allIds: without<string>(state.allIds, action.payload),
      };
    case ServerUserEvents.USER_READY:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload._id]: action.payload,
        },
        allIds: [...state.allIds, action.payload._id],
      };
    default:
      return state;
  }
}

export default users;
