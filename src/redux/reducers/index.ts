import { combineReducers } from 'redux';
import global, { GlobalStore } from './global';
import devices, { DevicesStore } from './devices';
import stages, { StagesStore } from './stages';
import stageMembers, { StageMembersStore } from './stageMembers';
import customStageMembers, {
  CustomStageMembersStore,
} from './customStageMembers';
import groups, { GroupsStore } from './groups';
import users, { UsersStore } from './users';

export interface RootReducer {
  global: GlobalStore;
  devices: DevicesStore;
  users: UsersStore;
  stages: StagesStore;
  groups: GroupsStore;
  stageMembers: StageMembersStore;
  customStageMembers: CustomStageMembersStore;
}

export default combineReducers<RootReducer>({
  global,
  devices,
  users,
  stages,
  groups,
  stageMembers,
  customStageMembers,
});
