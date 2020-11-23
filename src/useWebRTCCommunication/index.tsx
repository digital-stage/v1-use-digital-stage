/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useContext, useEffect, useState } from 'react';
import debug from 'debug';
import { useDispatch } from 'react-redux';
import { Device, Router } from '../types';
import useLocalDevice from '../redux/hooks/useLocalDevice';
import useMediasoup from './useMediasoup';
import { useErrors } from '../useErrors';
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

export const WebRTCCommunicationProvider = (props: {
  children: React.ReactNode;
  routerDistUrl: string;
}) => {
  const { children, routerDistUrl } = props;
  const {
    consumers,
    producers,
    consume,
    produce,
    stopProducing,
    stopConsuming,
  } = useMediasoup(routerDistUrl);

  const { reportError } = useErrors();

  const dispatch = useDispatch();

  // Automated Device handling
  const localDevice = useLocalDevice();
  const remoteVideoProducers = useVideoProducers();
  const remoteAudioProducers = useAudioProducers();
  const [lastDeviceState, setLastDeviceState] = useState<Device>();
  const [
    consumeVideoAutomatically,
    setConsumeVideoAutomatically,
  ] = useState<boolean>(false);
  const [
    consumeAudioAutomatically,
    setConsumeAudioAutomatically,
  ] = useState<boolean>(false);

  /**
   * React to state change of local device by sending or receiving video or audio
   */
  useEffect(() => {
    if (localDevice && reportError) {
      if (
        !lastDeviceState ||
        lastDeviceState.sendVideo !== localDevice.sendVideo
      ) {
        // send video state changed
        if (localDevice.sendVideo) {
          // send video
          d('Send video requested');
          navigator.mediaDevices
            .getUserMedia({
              audio: false,
              video:
                localDevice && localDevice.inputVideoDeviceId
                  ? {
                      deviceId: localDevice.inputVideoDeviceId,
                    }
                  : true,
            })
            .then((stream) => stream.getVideoTracks())
            .then((tracks) =>
              Promise.all(tracks.map((track) => produce(track)))
            )
            .then(() => {
              console.log('TODO: Publish producers globally');
            })
            .catch((error) => reportError(error));
        } else {
          // stop sending video
          d('Stop sending video requested');
          const videoProducerIds = Object.keys(producers).filter(
            (id) => producers[id].kind === 'video'
          );
          videoProducerIds.map((videoProducerId) =>
            stopProducing(videoProducerId).catch((error) => reportError(error))
          );
        }
      }

      if (
        !lastDeviceState ||
        lastDeviceState.sendAudio !== localDevice.sendAudio
      ) {
        // send audio state changed
        if (localDevice.sendAudio) {
          // send audio
          d('Send audio requested');
          navigator.mediaDevices
            .getUserMedia({
              video: false,
              audio: {
                deviceId: localDevice
                  ? localDevice.inputAudioDeviceId
                  : undefined,
                autoGainControl: false,
                echoCancellation: false,
                noiseSuppression: false,
              },
            })
            .then((stream) => stream.getAudioTracks())
            .then((tracks) =>
              Promise.all(tracks.map((track) => produce(track)))
            )
            .then(() => {
              console.log('TODO: Publish producers globally');
            })
            .catch((error) => reportError(error));
        } else {
          // stop sending audio
          d('Stop sending audio requested');
          const audioProducerIds = Object.keys(producers).filter(
            (id) => producers[id].kind === 'audio'
          );
          audioProducerIds.map((audioProducerId) =>
            stopProducing(audioProducerId).catch((error) => reportError(error))
          );
        }
      }

      if (
        !lastDeviceState ||
        lastDeviceState.receiveVideo !== localDevice.receiveVideo
      ) {
        // receive video state changed
        if (localDevice.receiveVideo) {
          // receive video
          d('Receive video requested');
          setConsumeVideoAutomatically(true);
        } else {
          // stop receiving video
          d('Stop receiving video requested');
          setConsumeVideoAutomatically(false);
        }
      }

      if (
        !lastDeviceState ||
        lastDeviceState.receiveAudio !== localDevice.receiveAudio
      ) {
        // receive audio state changed
        if (localDevice.receiveAudio) {
          // receive audio
          d('Receive audio requested');
          setConsumeAudioAutomatically(true);
        } else {
          // stop receiving audio
          d('Stop receiving audio requested');
          setConsumeAudioAutomatically(false);
        }
      }

      // Save local device state for next comparison
      setLastDeviceState(localDevice);
    }
  }, [localDevice, reportError]);

  useEffect(() => {
    if (consumeVideoAutomatically) {
      d('Start consuming video');
      remoteVideoProducers.allIds.forEach((producerId) => {
        if (!consumers[producerId]) {
          const producer = remoteVideoProducers.byId[producerId];
          consume(producer).then((consumer) => {
            d(`Consuming now ${producerId}`);
            dispatch(
              allActions.stageActions.client.addVideoConsumer({
                _id: consumer.id,
                stage: producer.stageId,
                stageMember: producer.stageMemberId,
                videoProducer: producer._id,
                msConsumer: consumer,
              })
            );
          });
        }
      });
    } else {
      d('Stop consuming video');
      remoteVideoProducers.allIds.forEach((producerId) => {
        if (consumers[producerId]) {
          stopConsuming(remoteVideoProducers.byId[producerId]).then(
            (consumer) => {
              d(`Stopped consuming ${producerId}`);
              dispatch(
                allActions.stageActions.client.removeVideoConsumer(consumer.id)
              );
            }
          );
        }
      });
    }
  }, [consumeVideoAutomatically, remoteVideoProducers]);

  useEffect(() => {
    if (consumeAudioAutomatically) {
      d('Start consuming audio');
      remoteAudioProducers.allIds.forEach((producerId) => {
        if (!consumers[producerId]) {
          const producer = remoteAudioProducers.byId[producerId];
          consume(producer).then((consumer) => {
            d(`Consuming now ${producerId}`);
            dispatch(
              allActions.stageActions.client.addVideoConsumer({
                _id: consumer.id,
                stage: producer.stageId,
                stageMember: producer.stageMemberId,
                videoProducer: producer._id,
                msConsumer: consumer,
              })
            );
          });
        }
      });
    } else {
      d('Stop consuming audio');
      remoteAudioProducers.allIds.forEach((producerId) => {
        if (consumers[producerId]) {
          stopConsuming(remoteAudioProducers.byId[producerId]).then(
            (consumer) => {
              d(`Stopped consuming ${producerId}`);
              dispatch(
                allActions.stageActions.client.removeAudioConsumer(consumer.id)
              );
            }
          );
        }
      });
    }
  }, [consumeAudioAutomatically, remoteAudioProducers]);

  return (
    <WebRTCCommunicationContext.Provider value={{}}>
      {children}
    </WebRTCCommunicationContext.Provider>
  );
};
const useWebRTCCommunication = (): TWebRTCCommunicationContext =>
  useContext<TWebRTCCommunicationContext>(WebRTCCommunicationContext);
export default useWebRTCCommunication;
