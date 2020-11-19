import { useSelector } from 'react-redux';
import { RootReducer } from '../reducers';
import { StageMember } from '../../types/StageMember';

export type StageMemberWithUserData = StageMember & {
  name?: string;
  avatarUrl?: string;
};

const useStageMembersByGroup = (groupId: string): StageMemberWithUserData[] =>
  useSelector<RootReducer, StageMemberWithUserData[]>((state) => {
    if (state.stageMembers.byGroup[groupId]) {
      return state.stageMembers.byGroup[groupId].map((id) => {
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
  });
export default useStageMembersByGroup;
