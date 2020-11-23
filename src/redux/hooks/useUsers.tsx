import { useSelector } from 'react-redux';
import { RootReducer } from '../reducers';
import { UsersStore } from '../reducers/users';

const useUsers = (): UsersStore =>
  useSelector<RootReducer, UsersStore>((state) => state.users);
export default useUsers;
