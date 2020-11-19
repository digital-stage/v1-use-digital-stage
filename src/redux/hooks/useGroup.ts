import { useSelector } from 'react-redux';
import { RootReducer } from '../reducers';
import { Group } from '../../types/Group';

const useGroup = (id: string): Group =>
  useSelector<RootReducer, Group>((state) => state.groups.byId[id]);
export default useGroup;
