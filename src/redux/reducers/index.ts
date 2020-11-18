import { combineReducers } from 'redux';
import devices, { DevicesStore } from './devices';
import stages, { StagesStore } from './stages';

export interface RootReducer {
  devices: DevicesStore;
  stages: StagesStore;
}

export default combineReducers<RootReducer>({
  devices,
  stages,
});
