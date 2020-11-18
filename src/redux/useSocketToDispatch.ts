import TeckosClient from 'teckos-client/dist/TeckosClient';
import { useCallback } from 'react';
import {
  ServerDeviceEvents,
  ServerGlobalEvents,
  ServerStageEvents,
  ServerUserEvents,
} from '../global/SocketEvents';
import { Device, Stage, User } from '../types';
import useDispatch from './useDispatch';
import allActions from './actions';
import { InitialStagePackage } from './actions/stageActions';
import { Group } from '../types/Group';
import { CustomGroup } from '../types/CustomGroup';
import { StageMember } from '../types/StageMember';
import { CustomStageMember } from '../types/CustomStageMember';
import { StageMemberVideoProducer } from '../types/StageMemberVideoProducer';
import { StageMemberAudioProducer } from '../types/StageMemberAudioProducer';
import { CustomStageMemberAudioProducer } from '../types/CustomStageMemberAudioProducer';
import { StageMemberOvTrack } from '../types/StageMemberOvTrack';
import { CustomStageMemberOvTrack } from '../types/CustomStageMemberOvTrack';

const useSocketToDispatch = () => {
  const dispatch = useDispatch();
  const attach = useCallback(
    (socket: TeckosClient) => {
      socket.on(ServerGlobalEvents.READY, () => {
        dispatch(allActions.server.setReady());
      });

      socket.on(ServerDeviceEvents.LOCAL_DEVICE_READY, (payload: Device) => {
        console.log(payload);
        dispatch(
          allActions.deviceActions.server.handleLocalDeviceReady(payload)
        );
      });

      socket.on(ServerUserEvents.USER_READY, (payload: User) => {
        dispatch(allActions.server.handleUserReady(payload));
      });

      socket.on(ServerDeviceEvents.DEVICE_ADDED, (payload: Device) => {
        dispatch(allActions.deviceActions.server.addDevice(payload));
      });
      socket.on(ServerDeviceEvents.DEVICE_CHANGED, (payload: Device) => {
        dispatch(allActions.deviceActions.server.changeDevice(payload));
      });
      socket.on(ServerDeviceEvents.DEVICE_REMOVED, (payload: string) => {
        dispatch(allActions.deviceActions.server.removeDevice(payload));
      });

      socket.on(ServerStageEvents.USER_ADDED, (payload: User) => {
        dispatch(allActions.stageActions.server.addUser(payload));
      });
      socket.on(ServerStageEvents.USER_CHANGED, (payload: User) => {
        dispatch(allActions.stageActions.server.changeUser(payload));
      });
      socket.on(ServerStageEvents.USER_REMOVED, (payload: string) => {
        dispatch(allActions.stageActions.server.removeUser(payload));
      });

      socket.on(ServerStageEvents.STAGE_ADDED, (payload: Stage) => {
        dispatch(allActions.stageActions.server.addStage(payload));
      });
      socket.on(
        ServerStageEvents.STAGE_JOINED,
        (payload: InitialStagePackage) => {
          dispatch(allActions.stageActions.server.handleStageJoined(payload));
        }
      );
      socket.on(ServerStageEvents.STAGE_LEFT, () => {
        dispatch(allActions.stageActions.server.handleStageLeft());
      });
      socket.on(ServerStageEvents.STAGE_CHANGED, (payload: Stage) => {
        dispatch(allActions.stageActions.server.changeStage(payload));
      });
      socket.on(ServerStageEvents.STAGE_REMOVED, (payload: string) => {
        dispatch(allActions.stageActions.server.removeStage(payload));
      });

      socket.on(ServerStageEvents.GROUP_ADDED, (payload: Group) => {
        dispatch(allActions.stageActions.server.addGroup(payload));
      });
      socket.on(ServerStageEvents.GROUP_CHANGED, (payload: Group) => {
        dispatch(allActions.stageActions.server.changeGroup(payload));
      });
      socket.on(ServerStageEvents.GROUP_REMOVED, (payload: string) => {
        dispatch(allActions.stageActions.server.removeGroup(payload));
      });

      socket.on(
        ServerStageEvents.CUSTOM_GROUP_ADDED,
        (payload: CustomGroup) => {
          dispatch(allActions.stageActions.server.addCustomGroup(payload));
        }
      );
      socket.on(
        ServerStageEvents.CUSTOM_GROUP_CHANGED,
        (payload: CustomGroup) => {
          dispatch(allActions.stageActions.server.changeCustomGroup(payload));
        }
      );
      socket.on(ServerStageEvents.CUSTOM_GROUP_REMOVED, (payload: string) => {
        dispatch(allActions.stageActions.server.removeCustomGroup(payload));
      });

      socket.on(
        ServerStageEvents.STAGE_MEMBER_ADDED,
        (payload: StageMember) => {
          dispatch(allActions.stageActions.server.addStageMember(payload));
        }
      );
      socket.on(
        ServerStageEvents.STAGE_MEMBER_CHANGED,
        (payload: StageMember) => {
          dispatch(allActions.stageActions.server.changeStageMember(payload));
        }
      );
      socket.on(ServerStageEvents.STAGE_MEMBER_REMOVED, (payload: string) => {
        dispatch(allActions.stageActions.server.removeStageMember(payload));
      });

      socket.on(
        ServerStageEvents.CUSTOM_STAGE_MEMBER_ADDED,
        (payload: CustomStageMember) => {
          dispatch(
            allActions.stageActions.server.addCustomStageMember(payload)
          );
        }
      );
      socket.on(
        ServerStageEvents.CUSTOM_STAGE_MEMBER_CHANGED,
        (payload: CustomStageMember) => {
          dispatch(
            allActions.stageActions.server.changeCustomStageMember(payload)
          );
        }
      );
      socket.on(
        ServerStageEvents.CUSTOM_STAGE_MEMBER_REMOVED,
        (payload: string) => {
          dispatch(
            allActions.stageActions.server.removeCustomStageMember(payload)
          );
        }
      );

      socket.on(
        ServerStageEvents.STAGE_MEMBER_VIDEO_ADDED,
        (payload: StageMemberVideoProducer) => {
          dispatch(allActions.stageActions.server.addVideoProducer(payload));
        }
      );
      socket.on(
        ServerStageEvents.STAGE_MEMBER_VIDEO_CHANGED,
        (payload: StageMemberVideoProducer) => {
          dispatch(allActions.stageActions.server.changeVideoProducer(payload));
        }
      );
      socket.on(
        ServerStageEvents.STAGE_MEMBER_VIDEO_REMOVED,
        (payload: string) => {
          dispatch(allActions.stageActions.server.removeVideoProducer(payload));
        }
      );

      socket.on(
        ServerStageEvents.STAGE_MEMBER_AUDIO_ADDED,
        (payload: StageMemberAudioProducer) => {
          dispatch(allActions.stageActions.server.addAudioProducer(payload));
        }
      );
      socket.on(
        ServerStageEvents.STAGE_MEMBER_AUDIO_CHANGED,
        (payload: StageMemberAudioProducer) => {
          dispatch(allActions.stageActions.server.changeAudioProducer(payload));
        }
      );
      socket.on(
        ServerStageEvents.STAGE_MEMBER_AUDIO_REMOVED,
        (payload: string) => {
          dispatch(allActions.stageActions.server.removeAudioProducer(payload));
        }
      );

      socket.on(
        ServerStageEvents.CUSTOM_STAGE_MEMBER_AUDIO_ADDED,
        (payload: CustomStageMemberAudioProducer) => {
          dispatch(
            allActions.stageActions.server.addCustomAudioProducer(payload)
          );
        }
      );
      socket.on(
        ServerStageEvents.CUSTOM_STAGE_MEMBER_AUDIO_CHANGED,
        (payload: CustomStageMemberAudioProducer) => {
          dispatch(
            allActions.stageActions.server.changeCustomAudioProducer(payload)
          );
        }
      );
      socket.on(
        ServerStageEvents.CUSTOM_STAGE_MEMBER_AUDIO_REMOVED,
        (payload: string) => {
          dispatch(
            allActions.stageActions.server.removeCustomAudioProducer(payload)
          );
        }
      );

      socket.on(
        ServerStageEvents.STAGE_MEMBER_OV_ADDED,
        (payload: StageMemberOvTrack) => {
          dispatch(allActions.stageActions.server.addOvTrack(payload));
        }
      );
      socket.on(
        ServerStageEvents.STAGE_MEMBER_OV_CHANGED,
        (payload: StageMemberOvTrack) => {
          dispatch(allActions.stageActions.server.changeOvTrack(payload));
        }
      );
      socket.on(
        ServerStageEvents.STAGE_MEMBER_OV_REMOVED,
        (payload: string) => {
          dispatch(allActions.stageActions.server.removeOvTrack(payload));
        }
      );

      socket.on(
        ServerStageEvents.CUSTOM_STAGE_MEMBER_OV_ADDED,
        (payload: CustomStageMemberOvTrack) => {
          dispatch(allActions.stageActions.server.addCustomOvTrack(payload));
        }
      );
      socket.on(
        ServerStageEvents.CUSTOM_STAGE_MEMBER_OV_CHANGED,
        (payload: CustomStageMemberOvTrack) => {
          dispatch(allActions.stageActions.server.changeCustomOvTrack(payload));
        }
      );
      socket.on(
        ServerStageEvents.CUSTOM_STAGE_MEMBER_OV_REMOVED,
        (payload: string) => {
          dispatch(allActions.stageActions.server.removeCustomOvTrack(payload));
        }
      );
    },
    [dispatch]
  );
  return attach;
};
export default useSocketToDispatch;