import React, {useEffect, useState} from "react";

import useAuth from "../../lib/useAuth";
import {useRouter} from "next/router";
import Layout from "../../components/global/Layout";

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
            <Layout>
                Error when logging out:
                {error.message}
            </Layout>
        )
    }

    return (
        <Layout>
            Logging you out...
        </Layout>
    )
};
export default Logout;
