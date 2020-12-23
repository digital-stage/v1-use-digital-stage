import React, {useEffect} from "react";
import Container from "../components/ui/Container";
import useAuth from "../lib/useAuth";
import {useRouter} from "next/router";
import StageList from "../components/stages/StageList";
import Layout from "../components/global/Layout";

const Stages = () => {
    const auth = useAuth();
    const {push} = useRouter();

    useEffect(() => {
        if (!auth.loading && !auth.user) {
            push("/auth/login")
        }
    }, [push, auth]);

    return (
        <Layout>
            <Container>
                <h1>My stages</h1>
                <StageList/>
            </Container>
        </Layout>
    )
}
export default Stages;
