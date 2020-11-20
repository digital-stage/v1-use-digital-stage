import { useSelector } from 'react-redux';
import { RootReducer } from '../reducers';
import { VideoProducersStore } from '../reducers/videoProducers';

const useVideoProducers = (): VideoProducersStore =>
  useSelector<RootReducer, VideoProducersStore>(
    (state) => state.videoProducers
  );
export default useVideoProducers;
