import omit from 'lodash/omit';
import without from 'lodash/without';
import { ServerStageEvents } from '../../global/SocketEvents';
import upsert from '../utils/upsert';
import { CustomStageMember } from '../../types/CustomStageMember';

export interface CustomStageMembersStore {
  byId: {
    [id: string]: CustomStageMember;
  };
  byStageMember: {
    [stageMemberId: string]: string[];
  };
  allIds: string[];
}

function customStageMembers(
  state: CustomStageMembersStore = {
    byId: {},
    byStageMember: {},
    allIds: [],
  },
  action: {
    type: string;
    payload: any;
  }
) {
  switch (action.type) {
    case ServerStageEvents.CUSTOM_STAGE_MEMBER_ADDED: {
      const customStageMember = action.payload as CustomStageMember;
      return {
        ...state,
        groups: {
          ...state,
          byId: {
            ...state.byId,
            [action.payload._id]: customStageMember,
          },
          byStageMember: {
            ...state.byStageMember,
            [action.payload.stageMemberId]: upsert<string>(
              state.byStageMember[customStageMember.stageMemberId],
              action.payload._id
            ),
          },
          allIds: [...state.allIds, customStageMember._id],
        },
      };
    }
    case ServerStageEvents.CUSTOM_STAGE_MEMBER_CHANGED: {
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
    }
    case ServerStageEvents.CUSTOM_STAGE_MEMBER_REMOVED: {
      const id = action.payload as string;
      const { stageMemberId } = state.byId[id];
      return {
        ...state,
        byId: omit(state.byId, id),
        byStageMember: {
          ...state.byStageMember,
          [stageMemberId]: without<string>(
            state.byStageMember[stageMemberId],
            id
          ),
        },
        allIds: without<string>(state.allIds, id),
      };
    }
    default:
      return state;
  }
}

export default customStageMembers;
