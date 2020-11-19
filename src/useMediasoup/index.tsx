import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import debug from 'debug';
import { getFastestRouter } from './util';
import { Router } from '../types';
import { useErrors } from '../useErrors';

interface TMediasoupContext {
  router?: Router;
}

const d = debug('useMediasoup');

const MediasoupContext = createContext<TMediasoupContext>({});

export const MediasoupProvider = (props: {
  children: React.ReactNode;
  routerDistUrl: string;
}) => {
  const { children, routerDistUrl } = props;
  const { reportError } = useErrors();
  const [router, setRouter] = useState<Router>();

  const getRouter = useCallback(() => {
    getFastestRouter(routerDistUrl)
      .then((fastestRouter) => {
        d(`Using the fastest available router: ${fastestRouter.url}`);
        setRouter(fastestRouter);
      })
      .catch((error) => reportError(error));
  }, [reportError, routerDistUrl]);

  useEffect(() => {
    if (routerDistUrl) {
      getRouter();
    }
  }, [routerDistUrl]);

  return (
    <MediasoupContext.Provider value={{ router }}>
      {children}
    </MediasoupContext.Provider>
  );
};
const useMediasoup = (): TMediasoupContext =>
  useContext<TMediasoupContext>(MediasoupContext);
export default useMediasoup;
