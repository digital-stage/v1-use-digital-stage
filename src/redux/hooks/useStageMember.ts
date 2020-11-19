import { useSelector } from 'react-redux';
import { RootReducer } from '../reducers';
import { StageMember } from '../../types/StageMember';

const useStageMember = (id: string): StageMember =>
  useSelector<RootReducer, StageMember>((state) => state.stageMembers.byId[id]);
export default useStageMember;
