import omit from 'lodash/omit';
import without from 'lodash/without';
import { AudioConsumer } from '../../types';
import AdditionalReducerTypes from '../actions/AdditionalReducerTypes';

export interface AudioConsumersStore {
  byId: {
    [id: string]: AudioConsumer;
  };
  byStageMember: {
    [stageMemberId: string]: string[];
  };
  byAudioProducer: {
    [audioProducerId: string]: string;
  };
  allIds: string[];
}

function audioConsumers(
  state: AudioConsumersStore = {
    byId: {},
    byStageMember: {},
    byAudioProducer: {},
    allIds: [],
  },
  action: {
    type: string;
    payload: any;
  }
) {
  switch (action.type) {
    case AdditionalReducerTypes.ADD_AUDIO_CONSUMER: {
      const audioConsumer = action.payload as AudioConsumer;
      return {
        ...state,
        byId: {
          ...state.byId,
          [audioConsumer._id]: audioConsumer,
        },
        byStageMember: {
          ...state.byStageMember,
          [audioConsumer.stageMember]: [
            ...state.byStageMember[audioConsumer.stageMember],
            audioConsumer._id,
          ],
        },
        byAudioProducer: {
          ...state.byAudioProducer,
          [audioConsumer.audioProducer]: audioConsumer._id,
        },
        allIds: [...state.allIds, audioConsumer._id],
      };
    }
    case AdditionalReducerTypes.REMOVE_AUDIO_CONSUMER: {
      const id = action.payload as string;
      const { stageMember } = state.byId[id];
      const { audioProducer } = state.byId[id];
      return {
        ...state,
        byId: omit(state.byId, id),
        byStageMember: {
          ...state.byStageMember,
          [stageMember]: without<string>(state.byStageMember[stageMember], id),
        },
        byAudioProducer: omit(state.byAudioProducer, audioProducer),
        allIds: without<string>(state.allIds, id),
      };
    }
    default:
      return state;
  }
}

export default audioConsumers;
