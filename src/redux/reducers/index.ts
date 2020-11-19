import { combineReducers } from 'redux';
import global, { GlobalStore } from './global';
import devices, { DevicesStore } from './devices';
import stages, { StagesStore } from './stages';
import stageMembers, { StageMembersStore } from './stageMembers';
import customStageMembers, {
  CustomStageMembersStore,
} from './customStageMembers';
import groups, { GroupsStore } from './groups';

export interface RootReducer {
  global: GlobalStore;
  devices: DevicesStore;
  stages: StagesStore;
  groups: GroupsStore;
  stageMembers: StageMembersStore;
  customStageMembers: CustomStageMembersStore;
}

export default combineReducers<RootReducer>({
  global,
  devices,
  stages,
  groups,
  stageMembers,
  customStageMembers,
});
