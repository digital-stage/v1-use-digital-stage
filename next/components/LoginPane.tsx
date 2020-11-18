import React, {useCallback, useRef} from "react";
import {useDigitalStage} from "../../";
import {styled} from 'styletron-react'


const Container = styled("div", {
    display: 'flex',
    flexDirection: 'column'
})

const LoginPane = () => {
    const {auth} = useDigitalStage();
    const emailRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();

    const login = useCallback(() => {
        if (auth && emailRef && passwordRef)
            auth.signInWithEmailAndPassword(emailRef.current.value, passwordRef.current.value)
    }, [auth, emailRef, passwordRef])

    return (
        <Container>
            Email:
            <input type="text" ref={emailRef}/>
            Password:
            <input type="password" ref={passwordRef}/>
            <button onClick={login}>Login
            </button>
        </Container>
    )
}
export default LoginPane;
