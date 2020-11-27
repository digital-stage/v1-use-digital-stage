import {useLocalDevice, useStageActions} from "../../../dist";
import ToggleButton from "../ui/ToggleButton";
import React from "react";
import {styled} from "styletron-react";
import {breakpoints} from "../ui/Theme";

const ToggleWebcamButton = styled(ToggleButton, {
    position: "fixed",
    right: "50%",
    bottom: "1rem",
    marginRight: "1rem",
    borderRadius: "50%",
    padding: ".5rem",
    [breakpoints.TABLET]: {
        padding: "1rem",
    }
})

const Icon = styled("img", {
    width: '2rem',
    [breakpoints.TABLET]: {
        width: "4rem",
    }
});

const WebcamToggle = () => {
    const {updateDevice} = useStageActions();
    const localDevice = useLocalDevice();

    if (localDevice) {
        return (
            <ToggleWebcamButton active={localDevice.sendVideo} onToggle={
                (active) => {
                    updateDevice(localDevice._id, {
                        sendVideo: active
                    });
                }
            }>
                <Icon
                    alt={localDevice.sendVideo ? "enable webcam" : "disable webcam"}
                    src={localDevice.sendVideo ? "/static/videocam-18dp.svg" : "/static/videocam_off-18dp.svg"}
                />
            </ToggleWebcamButton>
        )
    }

    return null;
};
export default WebcamToggle;
