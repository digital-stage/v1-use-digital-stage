import { useSelector } from 'react-redux';
import { RootReducer } from '../reducers';
import { AudioProducersStore } from '../reducers/audioProducers';

const useAudioProducers = (): AudioProducersStore =>
  useSelector<RootReducer, AudioProducersStore>(
    (state) => state.audioProducers
  );
export default useAudioProducers;
