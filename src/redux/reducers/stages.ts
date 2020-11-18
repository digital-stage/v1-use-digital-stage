import { Stage } from '../../types';
import { ServerStageEvents } from '../../global/SocketEvents';

export interface StagesStore {
  byId: {
    [id: string]: Stage;
  };
  allIds: string[];
}

function stages(
  state: StagesStore = {
    byId: {},
    allIds: [],
  },
  action: {
    type: string;
    payload: any;
  }
) {
  switch (action.type) {
    case ServerStageEvents.STAGE_ADDED:
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

export default stages;
