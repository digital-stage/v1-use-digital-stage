import React from "react";
import {styled} from "styletron-react";
import MixingPanelView from "../components/mixer/MixingPanel";

const Wrapper = styled("div", {
    backgroundColor: '#333',
    width: "100vw",
    height: '100vh',
    padding: '1rem',
})

const Mixer = () => {
    return (
        <Wrapper>
            <MixingPanelView/>
        </Wrapper>
    )
}
export default Mixer;
