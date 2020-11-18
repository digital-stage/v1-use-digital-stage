import { useSelector } from 'react-redux';
import { RootReducer } from '../reducers';
import { StagesStore } from '../reducers/stages';

export const useStages = () =>
  useSelector<RootReducer, StagesStore>((state) => state.stages);
export default useStages;
