import React, {useEffect, useState} from "react";
import Container from "../../components/ui/Container";
import useAuth from "../../lib/useAuth";
import {useRouter} from "next/router";

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
            <Container>
                Error when logging out:
                {error.message}
            </Container>
        )
    }

    return (
        <Container>
            Logging you out...
        </Container>
    )
};
export default Logout;
