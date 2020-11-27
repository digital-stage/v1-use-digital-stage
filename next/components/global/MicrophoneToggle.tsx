import {useLocalDevice, useStageActions} from "../../../dist";
import ToggleButton from "../ui/ToggleButton";
import React from "react";
import {styled} from "styletron-react";
import {breakpoints} from "../ui/Theme";

const ToggleMicrophoneButton = styled(ToggleButton, {
    position: "fixed",
    left: "50%",
    bottom: "1rem",
    marginLeft: "1rem",
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

const MicrophoneToggle = () => {
    const {updateDevice} = useStageActions();
    const localDevice = useLocalDevice();

    if (localDevice) {
        return (
            <ToggleMicrophoneButton active={localDevice.sendAudio} onToggle={
                (active) => {
                    updateDevice(localDevice._id, {
                        sendAudio: active
                    });
                }
            }>
                <Icon
                    alt={localDevice.sendAudio ? "enable microphone" : "disable microphone"}
                    src={localDevice.sendAudio ? "/static/mic-18dp.svg" : "/static/mic_off-18dp.svg"}
                />
            </ToggleMicrophoneButton>
        )
    }

    return null;
};
export default MicrophoneToggle;
