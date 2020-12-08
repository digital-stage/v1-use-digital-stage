import Button from "../ui/Button";
import {styled, withStyleDeep} from "styletron-react";
import {useRouter} from "next/router";
import {useCurrentStageId} from "use-digital-stage";
import Link from "next/link";
import {breakpoints} from "../ui/Theme";
import React from "react";


const FixedButton = withStyleDeep(Button, {
    position: "fixed",
    right: '1rem',
    bottom: '1rem',
    borderRadius: '50%',
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

const StageOrMixerToggle = () => {
    const router = useRouter();
    const stageId = useCurrentStageId();

    if (router) {
        const isMixerVisible = router.pathname === "/mixer";

        if (isMixerVisible || stageId) {
            return (
                <Link href={isMixerVisible ? "/stage" : "/mixer"}>
                    <FixedButton>
                        <Icon
                            src={isMixerVisible ? "/static/view_quilt-white-18dp.svg" : "/static/leaderboard-white-18dp.svg"}
                            alt={isMixerVisible ? "Goto stage" : "Goto mixer"}/>
                    </FixedButton>
                </Link>
            );
        }
    }

    return null;
}

export default StageOrMixerToggle;
