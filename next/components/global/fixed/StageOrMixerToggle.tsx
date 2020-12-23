import Button from "../../ui/Button";
import {styled, withStyleDeep} from "styletron-react";
import {useRouter} from "next/router";
import {useCurrentStageId} from "use-digital-stage";
import Link from "next/link";
import {breakpoints} from "../../ui/Theme";
import React from "react";

const FixedButton = withStyleDeep(Button, {
    position: "fixed",
    right: '1rem',
    borderRadius: '50%',
    padding: ".5rem",
    bottom: '4rem',
    [breakpoints.TABLET]: {
        display: 'none'
    }
})
const Icon = styled("img", {
    width: '2rem',
    height: '2rem',
    [breakpoints.TABLET]: {
        width: "4rem",
        height: '4rem',
    }
});

const StageOrMixerToggle = () => {
    const router = useRouter();
    const stageId = useCurrentStageId();

    if (router && stageId) {
        const isStageVisible = router.pathname === "/stage";

        return (
            <Link href={isStageVisible ? "/mixer" : "/stage"}>
                <FixedButton>
                    <Icon
                        src={isStageVisible ? "/static/leaderboard-18dp.svg" : "/static/view_quilt-18dp.svg"}
                        alt={isStageVisible ? "Goto mixer" : "Goto stage"}/>
                </FixedButton>
            </Link>
        );
    }

    return null;
}

export default StageOrMixerToggle;
