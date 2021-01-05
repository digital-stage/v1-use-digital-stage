import React, {useEffect} from "react";
import useAuth from "../../lib/useAuth";
import {useRouter} from "next/router";
import Link from "next/link";
import A from "../../components/ui/A";
import AuthPanel from "../../components/auth/AuthPanel";
import AuthLayout from "../../components/theme/AuthLayout";
import SignUpForm from "../../components/auth/SignUpForm";

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
        <AuthLayout>
            <AuthPanel>
                <h1>Sign up</h1>
                <SignUpForm/>
                Already have an account? <Link href="/auth/login"><A>Log in</A></Link>
            </AuthPanel>
        </AuthLayout>
    )
}

export default Login;
