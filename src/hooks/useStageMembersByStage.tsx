import { useSelector } from 'react-redux';
import { RootReducer, StageMemberWithUserData } from '../types';

const useStageMembersByStage = (stageId: string): StageMemberWithUserData[] =>
  useSelector<RootReducer, StageMemberWithUserData[]>((state) =>
    state.groups.byStage[stageId]
      ? state.groups.byStage[stageId].map((id) => {
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
        })
      : []
  );
export default useStageMembersByStage;
