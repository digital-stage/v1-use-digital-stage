import { useSelector } from 'react-redux';
import { RootReducer } from '../reducers';
import { StageMemberWithUserData } from '../../types';

const useStageMembersByStage = (stageId: string): StageMemberWithUserData[] =>
  useSelector<RootReducer, StageMemberWithUserData[]>(
    (state): StageMemberWithUserData[] => {
      if (state.stageMembers.byStage[stageId]) {
        return state.stageMembers.byStage[stageId].map((id) => {
          const stageMember = state.stageMembers.byId[id];
          const user = state.users.byId[stageMember.userId];
          if (user) {
            return {
              ...stageMember,
              name: user.name,
              avatarUrl: user.avatarUrl,
            };
          }
          return stageMember;
        });
      }
      return [];
    }
  );
export default useStageMembersByStage;
