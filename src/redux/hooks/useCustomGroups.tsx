import { useSelector } from 'react-redux';
import { RootReducer } from '../reducers';
import { CustomGroupsStore } from '../reducers/customGroups';

const useCustomGroups = (): CustomGroupsStore =>
  useSelector<RootReducer, CustomGroupsStore>((state) => state.customGroups);
export default useCustomGroups;
