import { useSelector } from 'react-redux';
import { RootReducer } from '../reducers';
import { VideoConsumersStore } from '../reducers/videoConsumers';

const useVideoConsumers = (): VideoConsumersStore =>
  useSelector<RootReducer, VideoConsumersStore>(
    (state) => state.videoConsumers
  );
export default useVideoConsumers;
