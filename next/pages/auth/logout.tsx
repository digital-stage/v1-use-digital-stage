import React, {useEffect, useState} from "react";
import useAuth from "../../lib/useAuth";
import {useRouter} from "next/router";
import AuthLayout from "../../components/theme/AuthLayout";
import Panel from "../../components/theme/Panel";

const Logout = () => {
    const {loading, logout} = useAuth();
    const [error, setError] = useState<Error>();
    const {push} = useRouter();

    useEffect(() => {
        if (!loading && logout && push) {
            logout()
                .then(() => {
                    push("/auth/login");
                })
                .catch(err => setError(err));
        }
    }, [loading, logout, push])

    if (error) {
        return (
            <AuthLayout>
                <Panel variant="white">
                    {error.message}
                </Panel>
            </AuthLayout>
        )
    }

    return (
        <AuthLayout>
            Logging you out...
        </AuthLayout>
    )
};
export default Logout;
