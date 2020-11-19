import { useSelector } from 'react-redux';
import { RootReducer } from '../reducers';
import { StageMember } from '../../types/StageMember';

const useStageMembersByStage = (stageId: string): StageMember[] =>
  useSelector<RootReducer, StageMember[]>((state) =>
    state.stageMembers.byStage[stageId]
      ? state.stageMembers.byStage[stageId].map(
          (id) => state.stageMembers.byId[id]
        )
      : []
  );
export default useStageMembersByStage;
