import { useSelector } from 'react-redux';
import { RootReducer } from '../reducers';
import { Group } from '../../types/Group';

const useGroupsByStage = (stageId: string): Group[] =>
  useSelector<RootReducer, Group[]>((state) =>
    state.groups.byStage[stageId]
      ? state.groups.byStage[stageId].map(
          (groupId) => state.groups.byId[groupId]
        )
      : []
  );
export default useGroupsByStage;
