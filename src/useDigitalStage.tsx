import React, { createContext, useContext, useEffect, useState } from 'react';
import * as Bowser from 'bowser';
import debug from 'debug';
import { ErrorsProvider } from './useErrors';
import useAuth, { AuthContextProvider, TAuthContext } from './useAuth';
import useSocket, { SocketProvider } from './useSocket';
import { Device } from './types';
import enumerateDevices from './utils/enumerateDevices';

const dbg = debug('useDigitalStage:provider');

export interface TDigitalStageContext {
  ready: boolean;
  auth?: TAuthContext;
}

const DigitalStageContext = createContext<TDigitalStageContext>({
  ready: false,
});

const UseDigitalStageProvider = (props: { children: React.ReactNode }) => {
  const { children } = props;
  const authAPI = useAuth();
  const [ready, setReady] = useState<boolean>(!authAPI.loading);
  const socketAPI = useSocket();

  const { token } = authAPI;

  const createInitialDevice = (): Promise<Partial<Device>> =>
    enumerateDevices().then(
      (mediaDevices): Partial<Device> => {
        const bowser = Bowser.getParser(window.navigator.userAgent);
        const os = bowser.getOSName();
        const browser = bowser.getBrowserName();
        let inputAudioDeviceId;
        let outputAudioDeviceId;
        let inputVideoDeviceId = 'default';
        if (mediaDevices.inputAudioDevices.find((d) => d.id === 'label')) {
          inputAudioDeviceId = 'default';
        } else if (mediaDevices.inputAudioDevices.length > 0) {
          inputAudioDeviceId = mediaDevices.inputAudioDevices[0].id;
        }
        if (mediaDevices.outputAudioDevices.find((d) => d.id === 'label')) {
          outputAudioDeviceId = 'default';
        } else if (mediaDevices.outputAudioDevices.length > 0) {
          outputAudioDeviceId = mediaDevices.outputAudioDevices[0].id;
        }
        if (mediaDevices.inputVideoDevices.length === 1) {
          inputVideoDeviceId = mediaDevices.inputVideoDevices[0].id;
        }
        return {
          name: `${browser} (${os})`,
          canAudio: mediaDevices.inputAudioDevices.length > 0,
          canVideo: mediaDevices.inputVideoDevices.length > 0,
          receiveVideo: true,
          receiveAudio: true,
          inputAudioDevices: mediaDevices.inputAudioDevices,
          inputVideoDevices: mediaDevices.inputVideoDevices,
          outputAudioDevices: mediaDevices.outputAudioDevices,
          inputAudioDeviceId,
          inputVideoDeviceId,
          outputAudioDeviceId,
        };
      }
    );

  useEffect(() => {
    if (token) {
      if (socketAPI && !socketAPI.connected) {
        dbg('Connecting to API server with token');
        createInitialDevice()
          .then((initialDevice) => socketAPI.connect(token, initialDevice))
          .then(() => setReady(true));
      } else {
        dbg('Socket is still null');
      }
    } else {
      dbg('token is still null');
    }
  }, [token, socketAPI]);

  return (
    <DigitalStageContext.Provider
      value={{
        ready,
        auth: authAPI,
      }}
    >
      {children}
    </DigitalStageContext.Provider>
  );
};

export const DigitalStageProvider = (props: {
  children: React.ReactNode;
  authUrl: string;
  apiUrl: string;
}) => {
  const { children, authUrl, apiUrl } = props;

  return (
    <ErrorsProvider>
      <AuthContextProvider authUrl={authUrl}>
        <SocketProvider apiUrl={apiUrl}>
          <UseDigitalStageProvider>{children}</UseDigitalStageProvider>
        </SocketProvider>
      </AuthContextProvider>
    </ErrorsProvider>
  );
};

const useDigitalStage = (): TDigitalStageContext => {
  dbg('instance of digital stage');
  return useContext<TDigitalStageContext>(DigitalStageContext);
};

export default useDigitalStage;
