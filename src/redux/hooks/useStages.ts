import { useSelector } from 'react-redux';
import { RootReducer } from '../reducers';
import { StagesStore } from '../reducers/stages';

const useStages = (): StagesStore =>
  useSelector<RootReducer, StagesStore>((state) => state.stages);
export default useStages;
