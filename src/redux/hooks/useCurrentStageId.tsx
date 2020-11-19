import { useSelector } from 'react-redux';
import { RootReducer } from '../reducers';

const useCurrentStageId = (): string | undefined =>
  useSelector<RootReducer, string | undefined>((state) => state.global.stageId);
export default useCurrentStageId;
