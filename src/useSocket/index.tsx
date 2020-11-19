import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { TeckosClient, TeckosClientWithJWT } from 'teckos-client';
import debug from 'debug';
import { Device } from '../types';
import useSocketToDispatch from '../redux/useSocketToDispatch';

const d = debug('useSocket');

export interface TSocketContext {
  error?: Error;

  connect(token: string, initialDevice: Partial<Device>): Promise<TeckosClient>;

  disconnect(): Promise<any>;

  status: Status;
}

export enum Status {
  DISCONNECTED = 'disconnected',
  CONNECTING = 'connecting',
  CONNECTED = 'connected',
}

const SocketContext = React.createContext<TSocketContext>({
  connect: () => Promise.reject(new Error('Not ready')),
  disconnect: () => Promise.reject(new Error('Not ready')),
  status: Status.DISCONNECTED,
});

export type SocketHandlerHook = (socket: TeckosClient) => any;

const useSocket = (): TSocketContext =>
  React.useContext<TSocketContext>(SocketContext);

const SocketProvider = (props: {
  children: React.ReactNode;
  apiUrl: string;
  autoReconnect?: boolean;
}) => {
  const { children, apiUrl, autoReconnect } = props;
  const [socket, setSocket] = useState<TeckosClient>();
  const [status, setStatus] = useState<Status>(Status.DISCONNECTED);
  const handler = useSocketToDispatch();

  const connect = useCallback(
    (token: string, initialDevice: Partial<Device>): Promise<TeckosClient> => {
      if (!socket) {
        d('Connecting');
        setStatus(Status.CONNECTING);
        return new Promise<TeckosClient>((resolve, reject) => {
          const timer = setTimeout(() => {
            reject(new Error('Timeout'));
          }, 5000);
          const nSocket = new TeckosClientWithJWT(
            apiUrl,
            {
              reconnection: autoReconnect,
            },
            token,
            {
              device: initialDevice,
            }
          );
          if (handler) {
            d('Attaching handler to socket');
            handler(nSocket);
          }
          nSocket.connect();
          nSocket.on('disconnect', () => {
            setStatus(Status.DISCONNECTED);
          });
          nSocket.once('connect', () => {
            clearTimeout(timer);
            d('Connected');
            setSocket(nSocket);
            setStatus(Status.CONNECTED);
            resolve(nSocket);
          });
          return nSocket;
        });
      }
      throw new Error('Already connected');
    },
    [apiUrl, socket, autoReconnect, handler]
  );

  const disconnect = useCallback(() => {
    if (socket) {
      d('Disconnecting');
      return new Promise<TeckosClient>((resolve, reject) => {
        const timer = setTimeout(() => {
          reject(new Error('Timeout'));
        }, 5000);
        socket.once('disconnect', () => {
          clearTimeout(timer);
          resolve();
        });
        socket.close();
      });
    }
    throw new Error('Not connected');
  }, [socket]);

  useEffect(() => {
    if (socket) {
      return () => {
        // Clean up
        d('Cleaning up socket by disconnecting');
        socket.close();
      };
    }
    return () => {};
  }, [socket]);

  return (
    <SocketContext.Provider
      value={{
        connect,
        disconnect,
        status,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
SocketProvider.defaultProps = {
  autoReconnect: false,
};
export { SocketProvider };

export default useSocket;
