
import {useStageActions, useLocalDevice} from "use-digital-stage";
import ToggleButton from "../../ui/ToggleButton";
import React, {useCallback} from "react";
import {styled} from "styletron-react";
import {breakpoints, colors} from "../../ui/Theme";

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

const WebcamToggle = () => {
    const stageActions = useStageActions();
    const localDevice = useLocalDevice();

    const toggleWebcam = useCallback((active: boolean) => {
        stageActions.updateDevice(localDevice._id, {
            sendVideo: active
        });
    }, [stageActions])

    if (localDevice) {
        return (
            <StyledToggleButton
                color={colors.background.record}
                active={localDevice.sendVideo}
                onToggle={toggleWebcam}
            >
                <Icon
                    alt={localDevice.sendVideo ? "enable webcam" : "disable webcam"}
                    src={localDevice.sendVideo ? "/static/videocam-18dp.svg" : "/static/videocam_off-18dp.svg"}
                />
            </StyledToggleButton>
        )
    }

    return null;
};
export default WebcamToggle;
