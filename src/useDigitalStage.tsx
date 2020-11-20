import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import * as Bowser from 'bowser';
import debug from 'debug';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import { ErrorsProvider, useErrors } from './useErrors';
import useAuth, { AuthContextProvider, TAuthContext } from './useAuth';
import useSocket, { SocketProvider } from './useSocket';
import { Device, Router } from './types';
import enumerateDevices from './utils/enumerateDevices';
import useMediasoup, { MediasoupProvider } from './useMediasoup';
import reducer from './redux/reducers/index';
import { StageHandlingProvider } from './useStageHandling';
import useStageActions, { TStageActionContext } from './useStageActions';
import Status, { IStatus } from './useSocket/Status';

const dbg = debug('useDigitalStage:provider');

export interface TDigitalStageContext {
  ready: boolean;
  router?: Router;
  auth?: TAuthContext;
  actions?: TStageActionContext;
  status: IStatus[keyof IStatus];
}

const DigitalStageContext = createContext<TDigitalStageContext>({
  ready: false,
  status: Status.disconnected,
});

// TODO: Remove useAuth from this hooks and require JWT token as param
const UseDigitalStageProvider = (props: { children: React.ReactNode }) => {
  const { children } = props;
  const auth = useAuth();
  const [ready, setReady] = useState<boolean>(!auth.loading);
  const socketAPI = useSocket();
  const { router } = useMediasoup();
  const { reportError } = useErrors();
  const actions = useStageActions();

  const { token } = auth;

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

  const startSocketConnection = useCallback(() => {
    if (token && reportError && socketAPI) {
      if (socketAPI.status === Status.disconnected) {
        dbg('Connecting to API server with token');
        createInitialDevice()
          .then((initialDevice) => socketAPI.connect(token, initialDevice))
          .then(() => setReady(true))
          .catch((connError) => reportError(connError));
      }
    }
  }, [token, reportError, socketAPI]);

  useEffect(() => {
    if (token && socketAPI) {
      if (socketAPI.status === Status.disconnected) {
        startSocketConnection();
      }
    }
  }, [token, socketAPI]);

  return (
    <DigitalStageContext.Provider
      value={{
        ready,
        router,
        auth,
        actions,
        status: socketAPI ? socketAPI.status : Status.disconnected,
      }}
    >
      {children}
    </DigitalStageContext.Provider>
  );
};

const store = createStore(reducer, devToolsEnhancer({}));

const DigitalStageProvider = (props: {
  children: React.ReactNode;
  authUrl: string;
  apiUrl: string;
  routerDistUrl: string;
}) => {
  const { children, authUrl, apiUrl, routerDistUrl } = props;

  return (
    <ErrorsProvider>
      <AuthContextProvider authUrl={authUrl}>
        <Provider store={store}>
          <SocketProvider apiUrl={apiUrl}>
            <StageHandlingProvider>
              <MediasoupProvider routerDistUrl={routerDistUrl}>
                <UseDigitalStageProvider>{children}</UseDigitalStageProvider>
              </MediasoupProvider>
            </StageHandlingProvider>
          </SocketProvider>
        </Provider>
      </AuthContextProvider>
    </ErrorsProvider>
  );
};

export { DigitalStageProvider };

const useDigitalStage = (): TDigitalStageContext =>
  useContext<TDigitalStageContext>(DigitalStageContext);

export default useDigitalStage;
