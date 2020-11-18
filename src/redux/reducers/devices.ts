import { Device } from '../../types';
import { ServerDeviceEvents } from '../../global/SocketEvents';

export interface DevicesStore {
  byId: {
    [id: string]: Device;
  };
  allIds: string[];
}

function devices(
  state: DevicesStore = {
    byId: {},
    allIds: [],
  },
  action: {
    type: string;
    payload: any;
  }
) {
  switch (action.type) {
    case ServerDeviceEvents.DEVICE_ADDED:
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

export default devices;
