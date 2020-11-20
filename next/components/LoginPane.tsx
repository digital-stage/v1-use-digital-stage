import React, { useCallback, useRef, useState } from 'react';
import { styled } from 'styletron-react';
import useDigitalStage from '../..';

const Container = styled('form', {
  display: 'flex',
  flexDirection: 'column',
});

const LoginPane = () => {
  const { auth } = useDigitalStage();
  const emailRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const [error, setError] = useState<string>();

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      if (auth && emailRef && passwordRef) {
        auth
          .signInWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
          )
          .catch((loginError) => setError(loginError.message));
      }
    },
    [auth, emailRef, passwordRef]
  );

  return (
    <Container onSubmit={handleSubmit}>
      Email:
      <input type="text" autoComplete="email" ref={emailRef} />
      Password:
      <input
        type="password"
        autoComplete="current-password"
        ref={passwordRef}
      />
      <button type="submit">Login</button>
      {error ? <div>Fehler: {error}</div> : undefined}
    </Container>
  );
};
export default LoginPane;
