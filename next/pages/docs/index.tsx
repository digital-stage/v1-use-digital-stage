import React, {useEffect} from 'react';
import useDigitalStage, {useCurrentUser} from 'use-digital-stage';
import useAuth from "../../lib/useAuth";
import {useRouter} from "next/router";
import DocsWrapper from "../../components/docs/DocsWrapper";

const Index = () => {
    const auth = useAuth();
    const {ready, router} = useDigitalStage();
    const currentUser = useCurrentUser();
    const {push} = useRouter();

    useEffect(() => {
        if( !auth.loading && !auth.user)
            push("/auth/signup")
    }, [auth, push])

    return (
        <DocsWrapper>
            READY
            <div>
                <h2>Connection information</h2>
                <ul>
                    <li>
                        Status:
                        {ready ? 'ready' : 'loading'}
                    </li>
                    {router ? <li>Fastest Router:{router.url}</li> : null}
                    {currentUser ? <li>
                        Your user ID:{currentUser._id}</li> : null}
                </ul>
            </div>
        </DocsWrapper>
    );
};
export default Index;
