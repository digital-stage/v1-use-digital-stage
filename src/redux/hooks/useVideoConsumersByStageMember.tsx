import { useSelector } from 'react-redux';
import { RootReducer } from '../reducers';
import { VideoConsumer } from '../../types';

const useVideoConsumersByStageMember = (
  stageMemberId: string
): VideoConsumer[] =>
  useSelector<RootReducer, VideoConsumer[]>((state) =>
    state.videoConsumers.byStageMember[stageMemberId]
      ? state.videoConsumers.byStageMember[stageMemberId].map(
          (id) => state.videoConsumers.byId[id]
        )
      : []
  );
export default useVideoConsumersByStageMember;
