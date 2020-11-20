import { useSelector } from 'react-redux';
import { RootReducer } from '../reducers';
import { AudioConsumersStore } from '../reducers/audioConsumers';

const useAudioConsumers = (): AudioConsumersStore =>
  useSelector<RootReducer, AudioConsumersStore>(
    (state) => state.audioConsumers
  );
export default useAudioConsumers;
