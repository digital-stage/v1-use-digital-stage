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
import customGroups, { CustomGroupsStore } from './customGroups';
import audioProducers, { AudioProducersStore } from './audioProducers';
import videoProducers, { VideoProducersStore } from './videoProducers';
import customAudioProducers, {
  CustomAudioProducersStore,
} from './customAudioProducers';
import videoConsumers, { VideoConsumersStore } from './videoConsumers';
import audioConsumers, { AudioConsumersStore } from './audioConsumers';

export interface RootReducer {
  global: GlobalStore;
  devices: DevicesStore;
  users: UsersStore;
  stages: StagesStore;
  groups: GroupsStore;
  customGroups: CustomGroupsStore;
  stageMembers: StageMembersStore;
  customStageMembers: CustomStageMembersStore;
  videoProducers: VideoProducersStore;
  audioProducers: AudioProducersStore;
  customAudioProducers: CustomAudioProducersStore;
  videoConsumers: VideoConsumersStore;
  audioConsumers: AudioConsumersStore;
}

export default combineReducers<RootReducer>({
  global,
  devices,
  users,
  stages,
  groups,
  customGroups,
  stageMembers,
  customStageMembers,
  videoProducers,
  audioProducers,
  customAudioProducers,
  videoConsumers,
  audioConsumers,
});
