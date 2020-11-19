import { useSelector } from 'react-redux';
import { RootReducer } from '../reducers';
import { GroupsStore } from '../reducers/groups';

const useGroups = (): GroupsStore =>
  useSelector<RootReducer, GroupsStore>((state) => state.groups);
export default useGroups;
