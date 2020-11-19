import { useSelector } from 'react-redux';
import { RootReducer } from '../reducers';
import { StageMembersStore } from '../reducers/stageMembers';

const useStageMembers = (): StageMembersStore =>
  useSelector<RootReducer, StageMembersStore>((state) => state.stageMembers);
export default useStageMembers;
