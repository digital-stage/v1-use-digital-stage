import React from "react";
import {styled} from "styletron-react";
import MixingPanelView from "../components/mixer/MixingPanel";
import Layout from "../components/global/Layout";

const Wrapper = styled("div", {
    width: "100vw",
    height: '100vh',
    padding: '1rem',
})

const Mixer = () => {
    return (
        <Layout>
            <Wrapper>
                <MixingPanelView/>
            </Wrapper>
        </Layout>
    )
}
export default Mixer;
