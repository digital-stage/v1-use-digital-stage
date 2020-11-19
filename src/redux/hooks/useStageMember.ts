import { useSelector } from 'react-redux';
import { RootReducer } from '../reducers';
import { StageMember } from '../../types/StageMember';

export type StageMemberWithUserData = StageMember & {
  name?: string;
  avatarUrl?: string;
};

const useStageMember = (id: string): StageMemberWithUserData | undefined =>
  useSelector<RootReducer, StageMemberWithUserData | undefined>((state):
    | StageMemberWithUserData
    | undefined => {
    const stageMember = state.stageMembers.byId[id];
    if (stageMember) {
      const user = state.users.byId[stageMember.userId];
      if (user) {
        return {
          ...stageMember,
          name: user.name,
          avatarUrl: user.avatarUrl,
        };
      }
      return stageMember;
    }
    return undefined;
  });
export default useStageMember;
