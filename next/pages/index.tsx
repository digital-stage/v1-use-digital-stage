import useDigitalStage from "../..";
import LoginPane from "../components/LoginPane";
import React from "react";

const Index = () => {
    const {ready, auth, router} = useDigitalStage();

    if (auth && !auth.user) {
        return (
            <LoginPane/>
        )
    }

    return (
        <div>
            READY
            <div>
                <h2>Connection information</h2>
                <ul>
                    <li>Status: {ready ? "ready" : "loading"}</li>
                    {router ? <li>Fastest Router: {router.url}</li>: null}
                </ul>
            </div>

        </div>
    )
}
export default Index
