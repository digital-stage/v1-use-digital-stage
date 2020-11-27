import React, {useEffect} from "react";
import LoginPane from "../../components/auth/LoginPane";
import useAuth from "../../lib/useAuth";
import {useRouter} from "next/router";
import Link from "next/link";
import Container from "../../components/ui/Container";
import A from "../../components/ui/A";

const Login = () => {
    const auth = useAuth();
    const {push, prefetch} = useRouter();

    useEffect(() => {
        if (prefetch) {
            prefetch('/auth/signup');
        }
    }, [prefetch]);

    useEffect(() => {
        if (push && !auth.loading && auth.user) {
            push("/")
        }
    }, [auth, push])

    return (
        <Container>
            <h1>Log In</h1>
            <LoginPane/>
            Don't have an account yet? <Link href="/auth/signup"><A>Create a new account</A></Link>
        </Container>
    )
}

export default Login;
