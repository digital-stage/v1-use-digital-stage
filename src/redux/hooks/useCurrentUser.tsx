import { useSelector } from 'react-redux';
import { RootReducer } from '../reducers';
import { User } from '../../types';

const useCurrentUser = (): User | undefined =>
  useSelector<RootReducer, User | undefined>((state) => {
    if (state.global.userId) {
      return state.users.byId[state.global.userId];
    }
    return undefined;
  });
export default useCurrentUser;
