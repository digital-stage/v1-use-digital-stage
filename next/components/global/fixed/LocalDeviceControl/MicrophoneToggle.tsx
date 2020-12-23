import {useStageActions, useLocalDevice} from "use-digital-stage";
import ToggleButton from "../../../ui/ToggleButton";
import React, {useCallback} from "react";
import {styled} from "styletron-react";
import {breakpoints, colors} from "../../../ui/Theme";

const StyledToggleButton = styled(ToggleButton, {
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
    const stageActions = useStageActions();
    const localDevice = useLocalDevice();

    const toggleMicrophone = useCallback((active: boolean) => {
        stageActions.updateDevice(localDevice._id, {
            sendAudio: active
        });
    }, [stageActions])

    if (localDevice) {
        return (
            <StyledToggleButton
                active={localDevice.sendAudio}
                color={colors.background.record}
                onToggle={toggleMicrophone}
            >
                <Icon
                    alt={localDevice.sendAudio ? "enable microphone" : "disable microphone"}
                    src={localDevice.sendAudio ? "/static/mic-18dp.svg" : "/static/mic_off-18dp.svg"}
                />
            </StyledToggleButton>
        )
    }

    return null;
};
export default MicrophoneToggle;
