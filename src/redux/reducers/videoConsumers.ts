import omit from 'lodash/omit';
import without from 'lodash/without';
import { VideoConsumer } from '../../types';
import AdditionalReducerTypes from '../actions/AdditionalReducerTypes';

export interface VideoConsumersStore {
  byId: {
    [id: string]: VideoConsumer;
  };
  byStageMember: {
    [stageMemberId: string]: string[];
  };
  byVideoProducer: {
    [audioProducerId: string]: string;
  };
  allIds: string[];
}

function videoConsumers(
  state: VideoConsumersStore = {
    byId: {},
    byStageMember: {},
    byVideoProducer: {},
    allIds: [],
  },
  action: {
    type: string;
    payload: any;
  }
) {
  switch (action.type) {
    case AdditionalReducerTypes.ADD_VIDEO_CONSUMER: {
      const videoConsumer = action.payload as VideoConsumer;
      return {
        ...state,
        byId: {
          ...state.byId,
          [videoConsumer._id]: videoConsumer,
        },
        byStageMember: {
          ...state.byStageMember,
          [videoConsumer.stageMember]: [
            ...state.byStageMember[videoConsumer.stageMember],
            videoConsumer._id,
          ],
        },
        byVideoProducer: {
          ...state.byVideoProducer,
          [videoConsumer.videoProducer]: videoConsumer._id,
        },
        allIds: [...state.allIds, videoConsumer._id],
      };
    }
    case AdditionalReducerTypes.REMOVE_VIDEO_CONSUMER: {
      const id = action.payload as string;
      const { stageMember } = state.byId[id];
      const { videoProducer } = state.byId[id];
      return {
        ...state,
        byId: omit(state.byId, id),
        byStageMember: {
          ...state.byStageMember,
          [stageMember]: without<string>(state.byStageMember[stageMember], id),
        },
        byVideoProducer: omit(state.byVideoProducer, videoProducer),
        allIds: without<string>(state.allIds, id),
      };
    }
    default:
      return state;
  }
}

export default videoConsumers;
