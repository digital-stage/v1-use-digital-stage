import * as React from 'react';
import * as cookie from 'js-cookie';
import fetch from 'isomorphic-unfetch';
import debug from 'debug';
import { useErrors } from '../useErrors';
import { AuthUser } from '../../../src/types';

const d = debug('digitalstage:auth');

export interface TAuthContext {
  user?: AuthUser;
  loading: boolean;
  token?: string;

  createUserWithEmailAndPassword(
    email: string,
    password: string,
    name: string,
    avatarUrl?: string
  ): Promise<any>;

  signInWithEmailAndPassword(
    email: string,
    password: string,
    staySignedIn?: boolean
  ): Promise<any>;

  requestPasswordReset(email: string): Promise<any>;

  resetPassword(resetToken: string, password: string): Promise<any>;

  logout(): Promise<any>;
}

const AuthContext = React.createContext<TAuthContext>({
  loading: true,
  createUserWithEmailAndPassword: () => Promise.reject(new Error('Not ready')),
  signInWithEmailAndPassword: () => Promise.reject(new Error('Not ready')),
  requestPasswordReset: () => Promise.reject(new Error('Not ready')),
  resetPassword: () => Promise.reject(new Error('Not ready')),
  logout: () => Promise.reject(new Error('Not ready')),
});

const getUserByToken = (authUrl: string, token: string): Promise<AuthUser> =>
  fetch(`${authUrl}/profile`, {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
})
  .then((result) => result.json())
  .then((json) => json as AuthUser);

export const AuthContextProvider = (props: {
  children: React.ReactNode;
  authUrl: string;
}) => {
  const { children, authUrl } = props;
  const { reportError } = useErrors();

  const [token, setToken] = React.useState<string>();
  const [user, setUser] = React.useState<AuthUser>();
  const [loading, setLoading] = React.useState<boolean>(true);

  const createUserWithEmailAndPassword = React.useCallback(
    (email: string, password: string, name: string, avatarUrl?: string) => {
      setLoading(true);
      return fetch(`${authUrl}/signup2`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
          name,
          avatarUrl: avatarUrl || '',
        }),
      })
        .then(
          (res) => {
            if (res.ok) {
              return res.json();
            }
            return res.status;
          },
          (err) => {
            throw err;
          }
        )
        .then((resToken) =>
          getUserByToken(authUrl, resToken).then((resUser) => {
          setUser(resUser);
          setToken(resToken);
          cookie.set('token', resToken, { expires: 1 });
        })
        )
        .catch((err) => {
          throw err;
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [authUrl]
  );

  const signInWithEmailAndPassword = React.useCallback(
    (email: string, password: string, staySignedIn?: boolean) => {
      setLoading(true);
      return fetch(`${authUrl}/login`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
        }),
      })
        .then((res) => {
          if (res.ok) return res.json();
          throw new Error(res.statusText);
        })
        .then((resToken) =>
          getUserByToken(authUrl, resToken).then((resUser) => {
          setUser(resUser);
          setToken(resToken);
          cookie.set('token', resToken, { expires: staySignedIn ? 7 : 1 });
        })
        )
        .catch((err) => {
          throw err;
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [authUrl]
  );

  const requestPasswordReset = React.useCallback(
    (email: string) =>
      fetch(`${authUrl}/forgot`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        email,
      }),
    })
      .then((res) => res.status)
      .catch((err) => {
        throw err;
      }),
    [authUrl]
  );

  const resetPassword = React.useCallback(
    (resetToken: string, password: string) =>
      fetch(`${authUrl}/reset`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        token: resetToken,
        password,
      }),
    })
      .then((result) => {
        if (!result.ok) {
          throw new Error('Abgelaufener Link');
        }
      })
      .catch((error) => reportError(error.message)),
    [authUrl, reportError]
  );

  const logout = React.useCallback(() => {
    setLoading(true);
    return fetch(`${authUrl}/logout`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'POST',
    })
      .then((result) => {
        if (result.ok) {
          cookie.remove('token');
          setToken(undefined);
          setUser(undefined);
        }
      })
      .catch((error) => reportError(error.message))
      .finally(() => {
        setLoading(false);
      });
  }, [token, authUrl, reportError]);

  React.useEffect(() => {
    // First get cookie
    const resToken = cookie.get('token');
    if (resToken) {
      // Try to use the token to login
      getUserByToken(authUrl, resToken)
        .then((resUser) => {
          setUser(resUser);
          setToken(resToken);
        })
        .catch((resError) => {
          d(resError);
          setUser(undefined);
          setToken(undefined);
          cookie.remove('token');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setUser(undefined);
      setLoading(false);
    }
    return () => {
      setToken(undefined);
      setUser(undefined);
    };
  }, [authUrl]);

  return (
    <AuthContext.Provider
      value={{
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        requestPasswordReset,
        resetPassword,
        logout,
        user,
        loading,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): TAuthContext => React.useContext<TAuthContext>(AuthContext);

export default useAuth;
