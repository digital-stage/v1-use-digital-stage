import {useStageActions, useLocalDevice} from "use-digital-stage";
import ToggleButton from "../../../ui/ToggleButton";
import React, {useCallback} from "react";
import {styled} from "styletron-react";
import {breakpoints} from "../../../ui/Theme";

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

const ReceiveVideoToggle = () => {
    const stageActions = useStageActions();
    const localDevice = useLocalDevice();

    const toggleReceive = useCallback((active: boolean) => {
        stageActions.updateDevice(localDevice._id, {
            receiveVideo: active
        });
    }, [stageActions])

    if (localDevice) {
        return (
            <StyledToggleButton active={localDevice.receiveVideo} onToggle={toggleReceive}>
                <Icon
                    alt={localDevice.receiveVideo ? "enable video playback" : "disable video playback"}
                    src={localDevice.receiveVideo ? "/static/live_tv-18dp.svg" : "/static/tv_off-18dp.svg"}
                />
            </StyledToggleButton>
        )
    }

    return null;
};
export default ReceiveVideoToggle;
