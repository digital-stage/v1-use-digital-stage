import {useStageActions, useLocalDevice} from "use-digital-stage";
import ToggleButton from "../../ui/ToggleButton";
import React, {useCallback} from "react";
import {styled} from "styletron-react";
import {breakpoints} from "../../ui/Theme";

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

const ReceiveAudioToggle = () => {
    const stageActions = useStageActions();
    const localDevice = useLocalDevice();

    const toggleReceive = useCallback((active: boolean) => {
        stageActions.updateDevice(localDevice._id, {
            receiveAudio: active
        });
    }, [stageActions])

    if (localDevice) {
        return (
            <StyledToggleButton active={localDevice.receiveAudio} onToggle={toggleReceive}>
                <Icon
                    alt={localDevice.receiveAudio ? "enable audio playback" : "disable audio playback"}
                    src={localDevice.receiveAudio ? "/static/volume_up-18dp.svg" : "/static/volume_off-18dp.svg"}
                />
            </StyledToggleButton>
        )
    }

    return null;
};
export default ReceiveAudioToggle;
