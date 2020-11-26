import Button from "../ui/Button";
import {withStyleDeep} from "styletron-react";
import {useRouter} from "next/router";
import {useCurrentStageId} from "../../..";
import Link from "next/link";


const FixedButton = withStyleDeep(Button, {
    position: "fixed",
    right: '1rem',
    bottom: '1rem',
    borderRadius: '50%'
})

const StageOrMixerToggle = () => {
    const router = useRouter();
    const stageId = useCurrentStageId();

    if (router) {
        const isMixerVisible = router.pathname === "/mixer";

        if (isMixerVisible || stageId) {
            return (
                <Link href={isMixerVisible ? "/stage" : "/mixer"}>
                    <FixedButton>
                        {isMixerVisible ? <img src="/static/view_quilt-white-18dp.svg" alt="Goto stage"/> :
                            <img src="/static/leaderboard-white-18dp.svg" alt="Goto mixer"/>}
                    </FixedButton>
                </Link>
            );
        }
    }

    return null;
}

export default StageOrMixerToggle;
