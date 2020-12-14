import {styled} from "styletron-react";
import {breakpoints} from "../ui/Theme";
import React, {useCallback} from "react";
import Button from "../ui/Button";
import {useCurrentStageId, useStageActions} from "use-digital-stage";
import {useRouter} from "next/router";

const StyledButton = styled(Button, {
    position: "fixed",
    left: "1rem",
    bottom: "1rem",
    borderRadius: "50%",
    padding: ".5rem",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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

const LeaveStageButton = () => {
    const stageId = useCurrentStageId();
    const stageActions = useStageActions();
    const router = useRouter();

    const leave = useCallback(() => {
        stageActions.leaveStage();
        router.push("/stages");
    }, [router, stageActions]);

    if (stageId) {
        return (
            <StyledButton onClick={leave}>
                <Icon src="/static/exit_to_app-white-18dp.svg" alt="Leave stage"/>
            </StyledButton>
        )
    }
    return null;
};
export default LeaveStageButton;
