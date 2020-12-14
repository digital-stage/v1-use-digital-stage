import Button from "../ui/Button";
import {styled, withStyleDeep} from "styletron-react";
import {useRouter} from "next/router";
import {useCurrentStageId} from "use-digital-stage";
import Link from "next/link";
import {breakpoints} from "../ui/Theme";
import React from "react";


const FixedButton = withStyleDeep(Button, {
    position: "fixed",
    left: '1rem',
    bottom: '1rem',
    borderRadius: '50%',
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

const ShowRoomButton = () => {
    const router = useRouter();
    const stageId = useCurrentStageId();

    if (stageId && router && router.pathname !== "/room") {
        return (
            <Link href="/room">
                <FixedButton>
                    <Icon
                        src="/static/room-18dp.svg"
                        alt="Show positions"
                    />
                </FixedButton>
            </Link>
        );
    }

    return null;
}

export default ShowRoomButton;
