import omit from 'lodash/omit';
import without from 'lodash/without';
import { ServerStageEvents } from '../../global/SocketEvents';
import { Group } from '../../types/Group';
import upsert from '../utils/upsert';

export interface GroupsStore {
  byId: {
    [id: string]: Group;
  };
  byStage: {
    [stageId: string]: string[];
  };
  allIds: string[];
}

function groups(
  state: GroupsStore = {
    byId: {},
    byStage: {},
    allIds: [],
  },
  action: {
    type: string;
    payload: any;
  }
) {
  switch (action.type) {
    case ServerStageEvents.GROUP_ADDED:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload._id]: action.payload,
        },
        byStage: {
          ...state.byStage,
          [action.payload.stageId]: upsert<string>(
            state.byStage[action.payload.stageId],
            action.payload._id
          ),
        },
        allIds: [...state.allIds, action.payload._id],
      };
    case ServerStageEvents.GROUP_CHANGED:
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
    case ServerStageEvents.GROUP_REMOVED: {
      const id = action.payload as string;
      const { stageId } = state.byId[id];
      return {
        ...state,
        byId: omit(state.byId, action.payload),
        byStage: {
          ...state.byStage,
          [stageId]: without<string>(state.byStage[stageId], id),
        },
        allIds: without<string>(state.allIds, action.payload),
      };
    }
    default:
      return state;
  }
}

export default groups;
