import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import debug from 'debug';
import { useDispatch } from 'react-redux';
import {
  Router,
  StageMemberAudioProducer,
  StageMemberVideoProducer,
} from '../types';
import useLocalDevice from '../redux/hooks/useLocalDevice';
import useMediasoup from './useMediasoup';
import useAudioProducers from '../redux/hooks/useAudioProducers';
import useVideoProducers from '../redux/hooks/useVideoProducers';
import allActions from '../redux/actions';

interface TWebRTCCommunicationContext {
  router?: Router;
}

const d = debug('useWebRTCCommunication');

const WebRTCCommunicationContext = createContext<TWebRTCCommunicationContext>(
  {}
);

function isAudioProducer(
  producer: StageMemberVideoProducer | StageMemberAudioProducer
): producer is StageMemberAudioProducer {
  return (producer as StageMemberAudioProducer).volume !== undefined;
}

export const WebRTCCommunicationProvider = (props: {
  children: React.ReactNode;
  routerDistUrl: string;
}) => {
  const { children, routerDistUrl } = props;
  const { connected, consumers, consume, stopConsuming } = useMediasoup(
    routerDistUrl
  );

  const dispatch = useDispatch();

  // Automated Device handling
  const localDevice = useLocalDevice();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  const [working, setWorking] = useState<boolean>(false);
  const remoteVideoProducers = useVideoProducers();
  const remoteAudioProducers = useAudioProducers();
  const [sendAudio, setSendAudio] = useState<boolean>(false);
  const [sendVideo, setSendVideo] = useState<boolean>(false);
  const [receiveVideo, setReceiveVideo] = useState<boolean>(false);
  const [receiveAudio, setReceiveAudio] = useState<boolean>(false);

  const consumeRemoteProducer = useCallback(
    (remoteProducer: StageMemberVideoProducer | StageMemberAudioProducer) => {
      consume(remoteProducer).then((consumer) => {
        d(`Consuming now remote producer ${remoteProducer._id}`);
        const action = isAudioProducer(remoteProducer)
          ? allActions.stageActions.client.addAudioConsumer({
              _id: consumer.id,
              stage: remoteProducer.stageId,
              stageMember: remoteProducer.stageMemberId,
              audioProducer: remoteProducer._id,
              msConsumer: consumer,
            })
          : allActions.stageActions.client.addVideoConsumer({
              _id: consumer.id,
              stage: remoteProducer.stageId,
              stageMember: remoteProducer.stageMemberId,
              videoProducer: remoteProducer._id,
              msConsumer: consumer,
            });
        dispatch(action);
      });
    },
    [consume, dispatch]
  );

  const stopConsumingRemoteProducer = useCallback(
    (remoteProducer: StageMemberVideoProducer | StageMemberAudioProducer) => {
      if (stopConsuming) {
        stopConsuming(remoteProducer).then((consumer) => {
          d(`Stopped consuming remote producer ${remoteProducer._id}`);
          const action = isAudioProducer(remoteProducer)
            ? allActions.stageActions.client.removeAudioConsumer(consumer.id)
            : allActions.stageActions.client.removeVideoConsumer(consumer.id);
          dispatch(action);
        });
      }
    },
    [stopConsuming, dispatch]
  );

  useEffect(() => {
    if (receiveAudio) {
      // Clean up all video consumers
      remoteAudioProducers.allIds.forEach((producerId) => {
        if (!consumers[producerId]) {
          d(`Consuming audio producer ${producerId}`);
          const producer = remoteAudioProducers.byId[producerId];
          consumeRemoteProducer(producer);
        }
      });
    } else {
      remoteAudioProducers.allIds.forEach((producerId) => {
        if (consumers[producerId]) {
          d(`Stop consuming audio producer ${producerId}`);
          const producer = remoteAudioProducers.byId[producerId];
          stopConsumingRemoteProducer(producer);
        }
      });
    }
    if (receiveVideo) {
      // Clean up all video consumers
      remoteVideoProducers.allIds.forEach((producerId) => {
        if (!consumers[producerId]) {
          d(`Consuming video producer ${producerId}`);
          const producer = remoteVideoProducers.byId[producerId];
          consumeRemoteProducer(producer);
        }
      });
    } else {
      remoteVideoProducers.allIds.forEach((producerId) => {
        if (consumers[producerId]) {
          d(`Stop consuming video producer ${producerId}`);
          const producer = remoteVideoProducers.byId[producerId];
          stopConsumingRemoteProducer(producer);
        }
      });
    }
  }, [
    connected,
    receiveAudio,
    receiveVideo,
    remoteVideoProducers,
    remoteAudioProducers,
    consumers,
    dispatch,
  ]);

  const doSomething = useCallback(() => {
    setWorking(true);
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setWorking(false);
        resolve();
      }, 2000);
    });
  }, []);

  useEffect(() => {
    d('Check for and removing consumers of obsolete producers');
    // Clean up deprecated consumers
    const deprecatedProducers = Object.keys(consumers)
      .map(
        (producerId) =>
          remoteVideoProducers.byId[producerId] ||
          remoteAudioProducers.byId[producerId]
      )
      .filter((deprecatedProducer) => deprecatedProducer !== undefined);

    deprecatedProducers.forEach((deprecatedProducer) =>
      stopConsumingRemoteProducer(deprecatedProducer)
    );
  }, [
    stopConsumingRemoteProducer,
    consumers,
    remoteVideoProducers,
    remoteAudioProducers,
  ]);

  const sync = useCallback(() => {
    if (localDevice) {
      if (localDevice.sendVideo !== sendVideo) {
        if (localDevice.sendVideo) {
          d('Send video on');
          doSomething();
        } else {
          d('Send video off');
          doSomething();
        }
        setSendVideo(localDevice.sendVideo);
      }
      if (localDevice.sendAudio !== sendAudio) {
        if (localDevice.sendAudio) {
          d('Send audio on');
          doSomething();
        } else {
          d('Send audio off');
          doSomething();
        }
        setSendAudio(localDevice.sendAudio);
      }
      if (localDevice.receiveVideo !== receiveVideo) {
        if (localDevice.receiveVideo) {
          d('Receive video on');
        } else {
          d('Receive video off');
        }
        setReceiveAudio(localDevice.receiveVideo);
      }
      if (localDevice.receiveAudio !== receiveAudio) {
        if (localDevice.receiveAudio) {
          d('Receive audio on');
        } else {
          d('Receive audio off');
        }
        setReceiveAudio(localDevice.receiveAudio);
      }
    } else {
      setSendVideo(false);
      setSendAudio(false);
      setReceiveVideo(false);
      setReceiveAudio(false);
    }
  }, [localDevice, sendVideo, sendAudio, receiveVideo, receiveAudio]);

  useEffect(() => {
    if (connected && !working) {
      sync();
    }
  }, [connected, working, localDevice, sync]);

  return (
    <WebRTCCommunicationContext.Provider value={{}}>
      {children}
    </WebRTCCommunicationContext.Provider>
  );
};
const useWebRTCCommunication = (): TWebRTCCommunicationContext =>
  useContext<TWebRTCCommunicationContext>(WebRTCCommunicationContext);
export default useWebRTCCommunication;
