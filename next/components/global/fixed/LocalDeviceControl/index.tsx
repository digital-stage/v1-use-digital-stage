import {styled} from "styletron-react";
import WebcamToggle from "./WebcamToggle";
import MicrophoneToggle from "./MicrophoneToggle";
import ReceiveVideoToggle from "./ReceiveVideoToggle";
import React from "react";
import ReceiveAudioToggle from "./ReceiveAudioToggle";

const Wrapper = styled("div", {
    position: "fixed",
    bottom: '1rem',
    left: "50%",
    transform: "translateX(-50%)",
    display: 'flex',
    flexDirection: 'row'
})


const LocalDeviceControl = () => {
    return (
        <Wrapper>
            <WebcamToggle/>
            <MicrophoneToggle/>
            <ReceiveVideoToggle/>
            <ReceiveAudioToggle/>
        </Wrapper>
    )
}
export default LocalDeviceControl;
