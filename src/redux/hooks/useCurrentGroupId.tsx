import { useSelector } from 'react-redux';
import { RootReducer } from '../reducers';

const useCurrentGroupId = (): string | undefined =>
  useSelector<RootReducer, string | undefined>((state) => state.global.groupId);
export default useCurrentGroupId;
