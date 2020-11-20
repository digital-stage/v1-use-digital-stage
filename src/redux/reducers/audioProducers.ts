import omit from 'lodash/omit';
import without from 'lodash/without';
import { ServerStageEvents } from '../../global/SocketEvents';
import { StageMemberAudioProducer } from '../../types';

export interface AudioProducersStore {
  byId: {
    [id: string]: StageMemberAudioProducer;
  };
  byStageMember: {
    [stageMemberId: string]: string;
  };
  allIds: string[];
}

function audioProducers(
  state: AudioProducersStore = {
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
    case ServerStageEvents.STAGE_MEMBER_AUDIO_ADDED: {
      const audioProducer = action.payload as StageMemberAudioProducer;
      return {
        ...state,
        byId: {
          ...state.byId,
          [audioProducer._id]: audioProducer,
        },
        byStageMember: {
          ...state.byStageMember,
          [audioProducer.stageMemberId]: audioProducer._id,
        },
        allIds: [...state.allIds, audioProducer._id],
      };
    }
    case ServerStageEvents.STAGE_MEMBER_AUDIO_CHANGED: {
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
    case ServerStageEvents.STAGE_MEMBER_AUDIO_REMOVED: {
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

export default audioProducers;
