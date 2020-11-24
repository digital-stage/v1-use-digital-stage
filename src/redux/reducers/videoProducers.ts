import omit from 'lodash/omit';
import without from 'lodash/without';
import { ServerStageEvents } from '../../global/SocketEvents';
import {
  RemoteVideoProducer,
  RemoteVideoProducersCollection,
} from '../../types';

function videoProducers(
  state: RemoteVideoProducersCollection = {
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
    case ServerStageEvents.STAGE_MEMBER_VIDEO_ADDED: {
      const videoProducer = action.payload as RemoteVideoProducer;
      return {
        ...state,
        byId: {
          ...state.byId,
          [videoProducer._id]: videoProducer,
        },
        byStageMember: {
          ...state.byStageMember,
          [videoProducer.stageMemberId]: videoProducer._id,
        },
        allIds: [...state.allIds, videoProducer._id],
      };
    }
    case ServerStageEvents.STAGE_MEMBER_VIDEO_CHANGED: {
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
    case ServerStageEvents.STAGE_MEMBER_VIDEO_REMOVED: {
      const id = action.payload as string;
      const { stageMemberId } = state.byId[id];
      return {
        ...state,
        byId: omit(state.byId, id),
        byStageMember: omit(state.byStageMember, stageMemberId),
        allIds: without<string>(state.allIds, id),
      };
    }
    default:
      return state;
  }
}

export default videoProducers;
