import { useSelector } from 'react-redux';
import { Device } from '../../types';
import { RootReducer } from '../reducers';

const useLocalDevice = (): Device | undefined =>
  useSelector<RootReducer, Device | undefined>((state) =>
    state.global.localDeviceId
      ? state.devices.byId[state.global.localDeviceId]
      : undefined
  );
export default useLocalDevice;
