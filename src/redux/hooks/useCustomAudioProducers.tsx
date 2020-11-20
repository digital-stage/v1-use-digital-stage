import { useSelector } from 'react-redux';
import { RootReducer } from '../reducers';
import { CustomAudioProducersStore } from '../reducers/customAudioProducers';

const useCustomAudioProducers = (): CustomAudioProducersStore =>
  useSelector<RootReducer, CustomAudioProducersStore>(
    (state) => state.customAudioProducers
  );
export default useCustomAudioProducers;
