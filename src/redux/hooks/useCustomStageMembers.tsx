import { useSelector } from 'react-redux';
import { RootReducer } from '../reducers';
import { CustomStageMembersStore } from '../reducers/customStageMembers';

const useCustomStageMembers = (): CustomStageMembersStore =>
  useSelector<RootReducer, CustomStageMembersStore>(
    (state) => state.customStageMembers
  );
export default useCustomStageMembers;
