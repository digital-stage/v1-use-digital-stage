import React, {useEffect} from "react";
import useAuth from "../../lib/useAuth";
import {useRouter} from "next/router";
import SignUpPane from "../../components/auth/SignUpPane";
import Link from "next/link";
import A from "../../components/ui/A";
import OutsideStageLayout from "../../components/global/OutsideStageLayout";
import Layout from "../../components/global/Layout";

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
        <Layout>
            <h1>Sign up</h1>
            <SignUpPane/>
            Already have an account? <Link href="/auth/login"><A>Log in</A></Link>
        </Layout>
    )
}

export default Login;
