import React, {useEffect} from "react";
import useAuth from "../../lib/useAuth";
import {useRouter} from "next/router";
import Link from "next/link";
import A from "../../components/ui/A";
import {useIntl} from "react-intl";
import AuthLayout from "../../components/theme/AuthLayout";
import AuthPanel from "../../components/auth/AuthPanel";
import LoginForm from "../../components/auth/LoginForm";

const Login = () => {
    const auth = useAuth();
    const {push, prefetch} = useRouter();
    const {formatMessage} = useIntl();
    const f = id => formatMessage({id});

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
                <LoginForm/>
                <Link href="/auth/forgot">{f("forgotPassword")}</Link>
                Don't have an account yet? <Link href="/auth/signup"><A>Create a new account</A></Link>
            </AuthPanel>
        </AuthLayout>
    )
}

export default Login;
