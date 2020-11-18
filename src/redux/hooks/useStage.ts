import { useSelector } from 'react-redux';
import { Stage } from '../../types';
import { RootReducer } from '../reducers';

const useStage = (id: string): Stage =>
  useSelector<RootReducer, Stage>((state) => state.stages.byId[id]);
export default useStage;
