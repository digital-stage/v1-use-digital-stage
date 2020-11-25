import mediasoupClient from 'mediasoup-client';
import { ITeckosClient } from 'teckos-client';
import {
  closeConsumer,
  createConsumer,
  createProducer,
  resumeConsumer,
  resumeProducer,
  stopProducer,
} from './useMediasoup/util';
import {
  GlobalProducer,
  LocalConsumer,
  LocalProducer,
  RemoteAudioProducer,
  RemoteVideoProducer,
  Router,
} from '../types';
import { ClientDeviceEvents } from '../global/SocketEvents';
import { AddAudioProducerPayload } from '../global/SocketPayloads';

const TIMEOUT_MS = 5000;

const getVideoTracks = (
  inputVideoDeviceId?: string
): Promise<MediaStreamTrack[]> =>
  navigator.mediaDevices
    .getUserMedia({
      audio: false,
      video: inputVideoDeviceId
        ? {
            deviceId: inputVideoDeviceId,
          }
        : true,
    })
    .then((stream) => stream.getVideoTracks());

const getAudioTracks = (
  inputAudioDeviceId?: string
): Promise<MediaStreamTrack[]> =>
  navigator.mediaDevices
    .getUserMedia({
      video: false,
      audio: {
        deviceId: inputAudioDeviceId || undefined,
        autoGainControl: false,
        echoCancellation: false,
        noiseSuppression: false,
      },
    })
    .then((stream) => stream.getAudioTracks());

const produce = (
  routerConnection: ITeckosClient,
  apiConnection: ITeckosClient,
  router: Router,
  sendTransport: mediasoupClient.types.Transport,
  track: MediaStreamTrack
): Promise<LocalProducer> =>
  createProducer(sendTransport, track)
    .then((producer) => {
      if (producer.paused) {
        return resumeProducer(routerConnection, producer);
      }
      producer.resume();

      return producer;
    })
    .then(
      (producer) =>
        new Promise<LocalProducer>((resolve, reject) => {
          const timeout = setTimeout(() => {
            // TODO: Stop producing track first?
            reject(
              new Error(
                `Timed out when publishing mediasoup producer ${producer.id}`
              )
            );
          }, TIMEOUT_MS);
          apiConnection.emit(
            track.kind === 'video'
              ? ClientDeviceEvents.ADD_VIDEO_PRODUCER
              : ClientDeviceEvents.ADD_AUDIO_PRODUCER,
            {
              routerId: router._id,
              routerProducerId: producer.id,
            } as AddAudioProducerPayload,
            (error: string | null, globalProducer: GlobalProducer) => {
              clearTimeout(timeout);
              if (error) {
                // TODO: Stop producing track first?
                reject(new Error(error));
              }
              resolve({
                global: globalProducer,
                local: producer,
              });
            }
          );
        })
    );

const stopProducing = (
  routerConnection: ITeckosClient,
  apiConnection: ITeckosClient,
  localProducer: LocalProducer
): Promise<LocalProducer> =>
  stopProducer(routerConnection, localProducer.local).then(
    () =>
      new Promise<LocalProducer>((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(
            new Error(
              `Timed out when unpublishing global producer ${localProducer.global._id}`
            )
          );
        }, TIMEOUT_MS);
        apiConnection.emit(
          localProducer.local.kind === 'video'
            ? ClientDeviceEvents.REMOVE_VIDEO_PRODUCER
            : ClientDeviceEvents.REMOVE_AUDIO_PRODUCER,
          localProducer.global._id,
          (error?: string) => {
            clearTimeout(timeout);
            if (error) {
              reject(new Error(error));
            }
            resolve(localProducer);
          }
        );
      })
  );

const consume = (
  routerConnection: ITeckosClient,
  rtpCapabilities: mediasoupClient.types.RtpCapabilities,
  receiveTransport: mediasoupClient.types.Transport,
  remoteProducer: RemoteAudioProducer | RemoteVideoProducer
): Promise<LocalConsumer> => {
  return createConsumer(
    routerConnection,
    rtpCapabilities,
    receiveTransport,
    remoteProducer.globalProducerId
  )
    .then((consumer) => {
      const localConsumer: LocalConsumer = {
        _id: consumer.id,
        consumer,
        stageId: remoteProducer.stageId,
        stageMemberId: remoteProducer.stageMemberId,
        producerId: remoteProducer._id,
      };
      return localConsumer;
    })
    .then(async (localConsumer) => {
      if (localConsumer.consumer.paused) {
        await resumeConsumer(routerConnection, localConsumer.consumer);
      }
      return localConsumer;
    });
};

const stopConsuming = (
  routerConnection: ITeckosClient,
  localConsumer: LocalConsumer
): Promise<LocalConsumer> =>
  closeConsumer(routerConnection, localConsumer.consumer).then(
    () => localConsumer
  );

export {
  produce,
  stopProducing,
  consume,
  stopConsuming,
  getVideoTracks,
  getAudioTracks,
};
