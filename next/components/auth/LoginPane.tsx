import React, {useCallback, useRef, useState} from 'react';
import {styled} from 'styletron-react';
import useAuth from "../../lib/useAuth";
import Button from "./../ui/Button";
import {useRouter} from "next/router";
import Input from "../ui/Input";
import Notification from "../ui/Notification";

const Form = styled('form', {
  display: 'flex',
  flexDirection: 'column',
});

const LoginPane = () => {
  const  auth  = useAuth();
  const emailRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const [error, setError] = useState<string>();
    const {push} = useRouter();

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      if (auth && emailRef && passwordRef) {
        auth
          .signInWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
          )
            .then(() => push("/"))
          .catch((loginError) => setError(loginError.message));
      }
    },
    [auth, emailRef, passwordRef]
  );

  return (
    <Form onSubmit={handleSubmit} autoComplete="on">
      Email:
      <Input type="text" autoComplete="email" ref={emailRef} />
      Password:
      <Input
        type="password"
        autoComplete="current-password"
        ref={passwordRef}
      />
      <Button type="submit">Login</Button>
      {error ? <Notification>{error}</Notification> : undefined}
    </Form>
  );
};
export default LoginPane;
