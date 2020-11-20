import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import debug from 'debug';
import { TeckosClient } from 'teckos-client';
import mediasoupClient from 'mediasoup-client';
import { Device as MediasoupDevice } from 'mediasoup-client/lib/Device';
import { useDispatch } from 'react-redux';
import {
  closeConsumer,
  createConsumer,
  createProducer,
  createWebRTCTransport,
  getFastestRouter,
  resumeConsumer,
  RouterRequests,
  stopProducer,
} from './util';
import { Router } from '../types';
import { useErrors } from '../useErrors';
import useVideoProducers from '../redux/hooks/useVideoProducers';
import useLocalDevice from '../redux/hooks/useLocalDevice';
import useAudioConsumers from '../redux/hooks/useAudioConsumers';
import useVideoConsumers from '../redux/hooks/useVideoConsumers';
import useAudioProducers from '../redux/hooks/useAudioProducers';
import allActions from '../redux/actions';
import { ClientDeviceEvents } from '../global/SocketEvents';
import {
  AddAudioProducerPayload,
  AddVideoProducerPayload,
} from '../global/SocketPayloads';
import { GlobalVideoProducer } from '../types/GlobalVideoProducer';
import { GlobalAudioProducer } from '../types/GlobalAudioProducer';
import useSocket from '../useSocket';

interface TMediasoupContext {
  router?: Router;
}

const TIMEOUT_MS = 4000;

const d = debug('useMediasoup');

const MediasoupContext = createContext<TMediasoupContext>({});

export const MediasoupProvider = (props: {
  children: React.ReactNode;
  routerDistUrl: string;
}) => {
  const { children, routerDistUrl } = props;
  const { reportError, reportWarning } = useErrors();
  const dispatch = useDispatch();
  const [router, setRouter] = useState<Router>();
  const localDevice = useLocalDevice();
  const audioProducers = useAudioProducers();
  const audioConsumers = useAudioConsumers();
  const videoProducers = useVideoProducers();
  const videoConsumers = useVideoConsumers();
  const { socket } = useSocket();

  const [working, setWorking] = useState<boolean>(false);
  const [connection, setConnection] = useState<TeckosClient>();
  const [device, setDevice] = useState<mediasoupClient.types.Device>();
  const [
    sendTransport,
    setSendTransport,
  ] = useState<mediasoupClient.types.Transport>();
  const [
    receiveTransport,
    setReceiveTransport,
  ] = useState<mediasoupClient.types.Transport>();
  const [sendVideo, setSendVideo] = useState<boolean>(false);
  const [sendAudio, setSendAudio] = useState<boolean>(false);
  const [receiveVideo, setReceiveVideo] = useState<boolean>(false);
  const [receiveAudio, setReceiveAudio] = useState<boolean>(false);
  const [inputAudioDeviceId, setInputAudioDeviceId] = useState<string>();
  const [inputVideoDeviceId, setInputVideoDeviceId] = useState<string>();
  const [outputAudioDeviceId, setOutputAudioDeviceId] = useState<string>();

  const [localAudioProducers, setLocalAudioProducers] = useState<
    {
      audioProducerId: string;
      msProducer: mediasoupClient.types.Producer;
    }[]
  >([]);
  const [localVideoProducers, setLocalVideoProducers] = useState<
    {
      videoProducerId: string;
      msProducer: mediasoupClient.types.Producer;
    }[]
  >([]);

  useEffect(() => {
    if (connection) {
      return () => connection.removeAllListeners();
    }
    return () => {};
  }, [connection]);

  useEffect(() => {
    if (receiveTransport) {
      return () => {
        receiveTransport.close();
      };
    }
    return () => {};
  }, [receiveTransport]);

  useEffect(() => {
    if (sendTransport) {
      return () => {
        sendTransport.close();
      };
    }
    return () => {};
  }, [sendTransport]);

  useEffect(() => {
    if (router && reportError) {
      const url = `${router.wsPrefix}://${router.url}:${router.port}${
        router.path ? `/${router.path}` : ''
      }`;

      const createdConnection = new TeckosClient(url);

      createdConnection.on('connect_error', (error) => {
        reportError(error);
      });

      createdConnection.on('connect_timeout', (error) => {
        reportError(error);
      });

      createdConnection.connect();

      createdConnection.on('connect', () => {
        createdConnection.emit(
          RouterRequests.GetRTPCapabilities,
          {},
          (
            error: string,
            rtpCapabilities: mediasoupClient.types.RtpCapabilities
          ) => {
            if (error) {
              return reportError(new Error(error));
            }
            // Create device
            const createdDevice = new MediasoupDevice();
            return createdDevice
              .load({ routerRtpCapabilities: rtpCapabilities })
              .then(() =>
                Promise.all([
                  createWebRTCTransport(
                    createdConnection,
                    createdDevice,
                    'send'
                  ).then((transport) => setSendTransport(transport)),
                  createWebRTCTransport(
                    createdConnection,
                    createdDevice,
                    'receive'
                  ).then((transport) => setReceiveTransport(transport)),
                ])
              )
              .then(() => setDevice(createdDevice));
          }
        );
      });

      setConnection(createdConnection);
      return () => {
        createdConnection.close();
      };
    }
    return () => {};
  }, [router, reportError]);

  const consumeVideoProducer = useCallback(
    (producerId: string) => {
      if (connection && device && receiveTransport) {
        const producer = videoProducers.byId[producerId];
        if (producer) {
          return createConsumer(connection, device, receiveTransport, producer)
            .then((consumer) => {
              if (consumer.paused) return resumeConsumer(connection, consumer);
              return consumer;
            })
            .then((consumer) =>
              dispatch(
                allActions.stageActions.client.addVideoConsumer({
                  _id: consumer.id,
                  stage: producer.stageId,
                  stageMember: producer.stageMemberId,
                  videoProducer: producer._id,
                  msConsumer: consumer,
                })
              )
            );
        }
        return reportError(new Error(`Could not find producer=${producerId}`));
      }
      return null;
    },
    [
      connection,
      device,
      receiveTransport,
      videoProducers,
      dispatch,
      reportError,
    ]
  );

  const stopConsumingVideoProducer = useCallback(
    (producerId: string) => {
      if (connection) {
        const consumerId = videoConsumers.byVideoProducer[producerId];
        if (consumerId && videoConsumers.byId[consumerId]) {
          return closeConsumer(
            connection,
            videoConsumers.byId[consumerId].msConsumer
          ).then(() =>
            dispatch(
              allActions.stageActions.client.removeVideoConsumer(consumerId)
            )
          );
        }
        return reportError(
          new Error(`Could not find consumer for producer ${producerId}`)
        );
      }
      return null;
    },
    [connection, videoConsumers, dispatch, reportError]
  );

  const consumeAudioProducer = useCallback(
    (producerId: string) => {
      if (connection && device && receiveTransport) {
        const producer = audioProducers.byId[producerId];
        if (producer) {
          return createConsumer(connection, device, receiveTransport, producer)
            .then((consumer) => {
              if (consumer.paused) return resumeConsumer(connection, consumer);
              return consumer;
            })
            .then((consumer) =>
              dispatch(
                allActions.stageActions.client.addAudioConsumer({
                  _id: consumer.id,
                  stage: producer.stageId,
                  stageMember: producer.stageMemberId,
                  audioProducer: producer._id,
                  msConsumer: consumer,
                })
              )
            );
        }
        return reportError(new Error(`Could not find producer=${producerId}`));
      }
      return null;
    },
    [
      connection,
      device,
      receiveTransport,
      audioProducers,
      dispatch,
      reportError,
    ]
  );

  const stopConsumingAudioProducer = useCallback(
    (producerId: string) => {
      if (connection) {
        const consumerId = audioConsumers.byAudioProducer[producerId];
        if (consumerId && audioConsumers.byId[consumerId]) {
          return closeConsumer(
            connection,
            audioConsumers.byId[consumerId].msConsumer
          ).then(() =>
            dispatch(
              allActions.stageActions.client.removeAudioConsumer(consumerId)
            )
          );
        }
        return reportError(
          new Error(`Could not find consumer for producer ${producerId}`)
        );
      }
      return null;
    },
    [connection, audioConsumers, dispatch, reportError]
  );

  const startStreamAudio = useCallback(() => {
    if (connection && sendTransport && router && socket) {
      setWorking(true);
      return navigator.mediaDevices
        .getUserMedia({
          video: false,
          audio: {
            deviceId: localDevice ? localDevice.inputAudioDeviceId : undefined,
            autoGainControl: false,
            echoCancellation: false,
            noiseSuppression: false,
          },
        })
        .then((stream) => stream.getAudioTracks())
        .then((tracks) =>
          Promise.all(
            tracks.map((track) =>
              createProducer(sendTransport, track).then(
                (producer) =>
                  new Promise<void>((resolve, reject) => {
                    socket.emit(
                      ClientDeviceEvents.ADD_AUDIO_PRODUCER,
                      {
                        routerId: router._id,
                        routerProducerId: producer.id,
                      } as AddAudioProducerPayload,
                      (
                        error: string | null,
                        globalProducer: GlobalAudioProducer
                      ) => {
                        if (error) {
                          reportWarning(new Error(error));
                          return stopProducer(connection, producer).then(() =>
                            reject(new Error(error))
                          );
                        }
                        setLocalAudioProducers((prevState) => [
                          ...prevState,
                          {
                            audioProducerId: globalProducer._id,
                            msProducer: producer,
                          },
                        ]);
                        return resolve();
                      }
                    );
                    setTimeout(() => {
                      reject(
                        new Error(
                          `Timed out: ${ClientDeviceEvents.ADD_AUDIO_PRODUCER}`
                        )
                      );
                    }, TIMEOUT_MS);
                  })
              )
            )
          )
        )
        .finally(() => setWorking(false));
    }
    reportError(new Error('FIXME: Send transport is still undefined ...'));
    return null;
  }, [
    sendTransport,
    localDevice,
    socket,
    connection,
    reportError,
    reportWarning,
    router,
  ]);

  const stopStreamingAudio = useCallback(() => {
    if (connection && socket) {
      setWorking(true);
      // Assure, that we stop streaming all local audio producers
      return Promise.all(
        localAudioProducers.map((localAudioProducer) =>
          stopProducer(connection, localAudioProducer.msProducer)
            .then(
              () =>
                new Promise<void>((resolve, reject) => {
                  socket.emit(
                    ClientDeviceEvents.REMOVE_AUDIO_PRODUCER,
                    localAudioProducer.audioProducerId,
                    (error?: string) => {
                      if (error) {
                        reject(new Error(error));
                      }
                      resolve();
                    }
                  );
                  setTimeout(() => {
                    reject(
                      new Error(
                        `Timed out: ${ClientDeviceEvents.REMOVE_AUDIO_PRODUCER}`
                      )
                    );
                  }, TIMEOUT_MS);
                })
            )
            .finally(() =>
              setLocalAudioProducers((prevState) =>
                prevState.filter(
                  (p) =>
                    p.audioProducerId !== localAudioProducer.audioProducerId
                )
              )
            )
        )
      )
        .catch((error) => reportError(error.message))
        .finally(() => setWorking(false));
    }
    return Promise.reject(new Error('Connection not ready'));
  }, [localAudioProducers, socket, connection, reportError]);

  const startStreamVideo = useCallback(() => {
    if (connection && sendTransport && router && socket) {
      setWorking(true);
      return navigator.mediaDevices
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
          Promise.all(
            tracks.map((track) =>
              createProducer(sendTransport, track).then(
                (producer) =>
                  new Promise<void>((resolve, reject) => {
                    socket.emit(
                      ClientDeviceEvents.ADD_VIDEO_PRODUCER,
                      {
                        routerId: router._id,
                        routerProducerId: producer.id,
                      } as AddVideoProducerPayload,
                      (
                        error: string | null,
                        globalProducer: GlobalVideoProducer
                      ) => {
                        if (error) {
                          reportWarning(new Error(error));
                          return stopProducer(connection, producer).then(() =>
                            reject(new Error(error))
                          );
                        }
                        setLocalVideoProducers((prevState) => [
                          ...prevState,
                          {
                            videoProducerId: globalProducer._id,
                            msProducer: producer,
                          },
                        ]);
                        return resolve();
                      }
                    );
                    setTimeout(() => {
                      reject(
                        new Error(
                          `Timed out: ${ClientDeviceEvents.ADD_VIDEO_PRODUCER}`
                        )
                      );
                    }, TIMEOUT_MS);
                  })
              )
            )
          )
        )
        .catch((error) => reportError(error.message))
        .finally(() => {
          setWorking(false);
        });
    }
    reportWarning(new Error('FIXME: Send transport is still undefined ...'));
    return null;
  }, [
    sendTransport,
    localDevice,
    router,
    socket,
    connection,
    reportError,
    reportWarning,
  ]);

  const stopStreamingVideo = useCallback(() => {
    if (connection && socket) {
      setWorking(true);
      // Assure, that we stop streaming all local audio producers
      return Promise.all(
        localVideoProducers.map((localVideoProducer) =>
          stopProducer(connection, localVideoProducer.msProducer).then(() =>
            new Promise<void>((resolve, reject) => {
              socket.emit(
                ClientDeviceEvents.REMOVE_VIDEO_PRODUCER,
                localVideoProducer.videoProducerId,
                (error?: string) => {
                  if (error) {
                    reject(new Error(error));
                  }
                  resolve();
                }
              );
              setTimeout(() => {
                reject(
                  new Error(
                    `Timed out: ${ClientDeviceEvents.REMOVE_VIDEO_PRODUCER}`
                  )
                );
              }, TIMEOUT_MS);
            }).finally(() =>
              setLocalVideoProducers((prevState) =>
                prevState.filter(
                  (p) =>
                    p.videoProducerId !== localVideoProducer.videoProducerId
                )
              )
            )
          )
        )
      )
        .catch((error) => reportError(error.message))
        .finally(() => {
          setWorking(false);
        });
    }
    return Promise.reject(new Error('Connection not ready'));
  }, [connection, localVideoProducers, reportError, socket]);

  useEffect(() => {
    if (!working && localDevice) {
      if (sendVideo !== localDevice.sendVideo) {
        if (localDevice.sendVideo) {
          startStreamVideo();
        } else {
          stopStreamingVideo();
        }
        setSendVideo(localDevice.sendVideo);
      }
      if (sendAudio !== localDevice.sendAudio) {
        if (localDevice.sendAudio) {
          startStreamAudio();
        } else {
          stopStreamingAudio();
        }
        setSendAudio(localDevice.sendAudio);
      }
      if (receiveVideo !== localDevice.receiveVideo) {
        setReceiveVideo(localDevice.receiveVideo);
      }
      if (receiveAudio !== localDevice.receiveAudio) {
        setReceiveAudio(localDevice.receiveAudio);
      }

      if (inputAudioDeviceId !== localDevice.inputAudioDeviceId) {
        setInputAudioDeviceId(localDevice.inputAudioDeviceId);
        if (localDevice.sendAudio) {
          stopStreamingAudio().then(() => startStreamAudio());
        }
      }
      if (inputVideoDeviceId !== localDevice.inputVideoDeviceId) {
        setInputVideoDeviceId(localDevice.inputVideoDeviceId);
        if (localDevice.sendVideo) {
          stopStreamingVideo().then(() => startStreamVideo());
        }
      }
      if (outputAudioDeviceId !== localDevice.outputAudioDeviceId) {
        setOutputAudioDeviceId(localDevice.outputAudioDeviceId);
      }
    }
  }, [working, localDevice]);

  const [handledVideoProducerIds, setHandledVideoProducerIds] = useState<
    string[]
  >([]);
  const [, setConsumingVideoProducerIds] = useState<string[]>([]);
  const [handledAudioProducerIds, setHandledAudioProducerIds] = useState<
    string[]
  >([]);
  const [, setConsumingAudioProducerIds] = useState<string[]>([]);

  const syncVideoProducers = useCallback(() => {
    setConsumingVideoProducerIds((prev) => {
      const addedVideoProducerIds = handledVideoProducerIds.filter(
        (id) => prev.indexOf(id) === -1
      );
      const existingVideoProducerIds = handledVideoProducerIds.filter(
        (id) => prev.indexOf(id) !== -1
      );
      const removedVideoProducerIds = prev.filter(
        (id) => handledVideoProducerIds.indexOf(id) === -1
      );

      addedVideoProducerIds.map((producerId) =>
        consumeVideoProducer(producerId)
      );
      removedVideoProducerIds.map((producerId) =>
        stopConsumingVideoProducer(producerId)
      );

      return [...existingVideoProducerIds, ...addedVideoProducerIds];
    });
  }, [
    handledVideoProducerIds,
    consumeVideoProducer,
    stopConsumingVideoProducer,
  ]);

  const syncAudioProducers = useCallback(() => {
    setConsumingAudioProducerIds((prev) => {
      const addedAudioProducerIds = handledAudioProducerIds.filter(
        (id) => prev.indexOf(id) === -1
      );
      const existingAudioProducerIds = handledAudioProducerIds.filter(
        (id) => prev.indexOf(id) !== -1
      );
      const removedAudioProducerIds = prev.filter(
        (id) => handledAudioProducerIds.indexOf(id) === -1
      );

      addedAudioProducerIds.map((producerId) =>
        consumeAudioProducer(producerId)
      );
      removedAudioProducerIds.map((producerId) =>
        stopConsumingAudioProducer(producerId)
      );

      return [...existingAudioProducerIds, ...addedAudioProducerIds];
    });
  }, [
    handledAudioProducerIds,
    consumeAudioProducer,
    stopConsumingAudioProducer,
  ]);

  useEffect(() => {
    if (syncVideoProducers) syncVideoProducers();
  }, [handledVideoProducerIds, syncVideoProducers]);

  useEffect(() => {
    if (syncAudioProducers) syncAudioProducers();
  }, [handledAudioProducerIds, syncAudioProducers]);

  useEffect(() => {
    if (receiveVideo) {
      setHandledVideoProducerIds(videoProducers.allIds);
    } else {
      setHandledVideoProducerIds([]);
    }
  }, [receiveVideo, videoProducers]);

  useEffect(() => {
    if (receiveAudio) {
      setHandledAudioProducerIds(audioProducers.allIds);
    } else {
      setHandledAudioProducerIds([]);
    }
  }, [receiveAudio, audioProducers]);

  const getRouter = useCallback(() => {
    getFastestRouter(routerDistUrl)
      .then((fastestRouter) => {
        d(`Using the fastest available router: ${fastestRouter.url}`);
        setRouter(fastestRouter);
      })
      .catch((error) => reportError(error));
  }, [reportError, routerDistUrl]);

  useEffect(() => {
    if (routerDistUrl && getRouter) {
      getRouter();
    }
  }, [routerDistUrl, getRouter]);

  return (
    <MediasoupContext.Provider value={{ router }}>
      {children}
    </MediasoupContext.Provider>
  );
};
const useMediasoup = (): TMediasoupContext =>
  useContext<TMediasoupContext>(MediasoupContext);
export default useMediasoup;
