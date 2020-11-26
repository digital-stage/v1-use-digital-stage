import React from "react";
import {styled} from "styletron-react";
import MixerPane from "../components/mixer/MixerPane";

const Wrapper = styled("div", {
    display: 'flex',
    flexDirection: "column",
    backgroundColor: '#333',
    width: "100%",
    minHeight: "100vh",
})

const Mixer = () => {
    return (
        <Wrapper>
            <MixerPane/>
        </Wrapper>
    )
}
export default Mixer;
