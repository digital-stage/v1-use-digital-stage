import { useSelector } from 'react-redux';
import { RootReducer } from '../reducers';
import { DevicesStore } from '../reducers/devices';

const useDevices = (): DevicesStore =>
  useSelector<RootReducer, DevicesStore>((state) => state.devices);
export default useDevices;
