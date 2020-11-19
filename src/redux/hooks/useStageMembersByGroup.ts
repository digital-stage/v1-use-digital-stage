import { useSelector } from 'react-redux';
import { RootReducer } from '../reducers';
import { StageMember } from '../../types/StageMember';

const useStageMembersByGroup = (groupId: string): StageMember[] =>
  useSelector<RootReducer, StageMember[]>((state) =>
    state.stageMembers.byGroup[groupId]
      ? state.stageMembers.byGroup[groupId].map(
          (id) => state.stageMembers.byId[id]
        )
      : []
  );
export default useStageMembersByGroup;
