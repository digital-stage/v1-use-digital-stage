import { useSelector } from 'react-redux';
import { Device } from '../../types';
import { RootReducer } from '../reducers';

const useDevice = (id: string): Device | undefined =>
  useSelector<RootReducer, Device | undefined>(
    (state) => state.devices.byId[id]
  );
export default useDevice;
