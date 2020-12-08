import * as React from 'react';
import * as cookie from 'js-cookie';
import fetch from 'isomorphic-unfetch';
import debug from 'debug';
import useErrors from '../useErrors';
import {AuthUser} from "./AuthUser";
import {AuthError} from "../../../../webclient/lib/useAuth";

export const ErrorCodes = {
    Unauthorized: 401,
    NotActivated: 424,
    NotFound: 404,
    BadRequest: 400,
    EmailAlreadyInUse: 409,
    AlreadyActivated: 416,
    InternalError: 500,
    InvalidToken: 403,
};

const report = debug('digitalstage:auth');

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

    activate(code: string): Promise<any>;

    resendActivationLink(email: string): Promise<any>;

    logout(): Promise<any>;
}

const throwAddProviderError = () => {
    throw new Error('Please wrap the DOM tree with the AuthProvider');
};

const AuthContext = React.createContext<TAuthContext>({
    loading: true,
    createUserWithEmailAndPassword: throwAddProviderError,
    signInWithEmailAndPassword: throwAddProviderError,
    requestPasswordReset: throwAddProviderError,
    resetPassword: throwAddProviderError,
    logout: throwAddProviderError,
    activate: throwAddProviderError,
    resendActivationLink: throwAddProviderError,
});

const getUserByToken = (authUrl: string, token: string): Promise<AuthUser> =>
    fetch(`${authUrl}/profile`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })
        .then((result) => {
            if (result.ok) {
                return result.json();
            } else {
                throw new AuthError(result.status, result.statusText);
            }
        })
        .then((json) => json as AuthUser);

const AuthConsumer = AuthContext.Consumer;

const AuthProvider = (props: {
    children: React.ReactNode;
    authUrl: string;
}) => {
    const {children, authUrl} = props;
    const {reportError} = useErrors();

    const [token, setToken] = React.useState<string>();
    const [user, setUser] = React.useState<AuthUser>();
    const [loading, setLoading] = React.useState<boolean>(true);

    const createUserWithEmailAndPassword = React.useCallback(
        (email: string, password: string, name: string, avatarUrl?: string) => {
            setLoading(true);
            return fetch(`${authUrl}/signup`, {
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
            }).then((res) => {
                if (!res.ok) {
                    throw new AuthError(res.status, res.statusText);
                }
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
                    throw new AuthError(res.status, res.statusText);
                })
                .then((resToken) =>
                    getUserByToken(authUrl, resToken).then((resUser) => {
                        setUser(resUser);
                        setToken(resToken);
                        cookie.set('token', resToken, { expires: staySignedIn ? 7 : 1 });
                    })
                )
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
                .then((res) => {
                    if (!res.ok) throw new AuthError(res.status, res.statusText);
                })
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
            }).then((res) => {
                if (!res.ok) {
                    throw new AuthError(res.status, res.statusText);
                }
            }),
        [authUrl, reportError]
    );

    const activate = React.useCallback((code: string): Promise<void> => {
        return fetch(`${authUrl}/activate`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                code: code,
            }),
        }).then((res) => {
            if (!res.ok) throw new AuthError(res.status, res.statusText);
        });
    }, []);

    const resendActivationLink = React.useCallback((email: string): Promise<void> => {
        return fetch(`${authUrl}/reactivate`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                email: email,
            }),
        }).then((res) => {
            if (!res.ok) throw new AuthError(res.status, res.statusText);
        });
    }, []);

    const logout = React.useCallback(() => {
        setLoading(true);
        return fetch(`${authUrl}/logout`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            method: 'POST',
        })
            .then((res) => {
                if (res.ok) {
                    cookie.remove('token');
                    setToken(undefined);
                    setUser(undefined);
                } else {
                    throw new AuthError(res.status, res.statusText);
                }
            })
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
                    report(resError);
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
                activate,
                resendActivationLink,
                token,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = (): TAuthContext => React.useContext<TAuthContext>(AuthContext);

export {
    AuthProvider,
    AuthConsumer
}
export default useAuth;
