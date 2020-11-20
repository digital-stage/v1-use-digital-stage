import { DigitalStageProvider } from './useDigitalStage';
import * as types from './types';
import useStages from './redux/hooks/useStages';
import useStage from './redux/hooks/useStage';
import useSelector from './redux/hooks/useSelector';
import useGroup from './redux/hooks/useGroup';
import useGroups from './redux/hooks/useGroups';
import useGroupsByStage from './redux/hooks/useGroupsByStage';
import useStageMembersByStage from './redux/hooks/useStageMembersByStage';
import useStageMembersByGroup from './redux/hooks/useStageMembersByGroup';
import useStageMembers from './redux/hooks/useStageMembers';
import useStageMember from './redux/hooks/useStageMember';
import useDevices from './redux/hooks/useDevices';
import useDevice from './redux/hooks/useDevice';
import useCurrentUser from './redux/hooks/useCurrentUser';
import useCurrentGroupId from './redux/hooks/useCurrentGroupId';
import useCurrentStageId from './redux/hooks/useCurrentStageId';
import Status from './useSocket/Status';
import useCustomStageMembers from './redux/hooks/useCustomStageMembers';
import useCustomGroups from './redux/hooks/useCustomGroups';
import useVideoProducers from './redux/hooks/useVideoProducers';
import useAudioProducers from './redux/hooks/useAudioProducers';
import useCustomAudioProducers from './redux/hooks/useCustomAudioProducers';
import useVideoConsumers from './redux/hooks/useVideoConsumers';
import useAudioConsumers from './redux/hooks/useAudioConsumers';
import useLocalDevice from './redux/hooks/useLocalDevice';

export {
  types,
  Status,
  DigitalStageProvider,
  useCurrentStageId,
  useCurrentGroupId,
  useCurrentUser,
  useLocalDevice,
  useDevices,
  useDevice,
  useStage,
  useStages,
  useSelector,
  useGroups,
  useGroupsByStage,
  useGroup,
  useCustomGroups,
  useStageMembers,
  useStageMember,
  useStageMembersByStage,
  useStageMembersByGroup,
  useCustomStageMembers,
  useVideoProducers,
  useAudioProducers,
  useCustomAudioProducers,
  useVideoConsumers,
  useAudioConsumers,
};

export { default } from './useDigitalStage';
