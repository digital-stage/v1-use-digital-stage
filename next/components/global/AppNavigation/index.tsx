import {styled, withStyleDeep} from "styletron-react";
import React, {useEffect, useRef, useState} from "react";
import {breakpoints, colors} from "../../ui/Theme";
import Link from "next/link";
import {disableBodyScroll, enableBodyScroll} from 'body-scroll-lock';
import Button from "../../ui/Button";
import {useCurrentStageId} from "use-digital-stage";

const Overlay = styled("nav", {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    overflowY: 'scroll',
    backgroundColor: colors.background.default
});
const List = styled("ul", {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '80vw',
    maxWidth: '800px'
});
const ListItem = styled("li", {
    display: 'flex',
    width: '100%',
});
const A = styled("a", {
    display: 'flex',
    fontSize: '3rem',
    padding: '3rem',
    width: '100%',
    cursor: 'pointer',
    ":hover": {
        backgroundColor: colors.background.active
    }
});
const BurgerButton = withStyleDeep(Button, {
    position: 'fixed',
    bottom: '1rem',
    right: '1rem',
    padding: ".5rem",
    borderRadius: "50%",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [breakpoints.TABLET]: {
        padding: "1rem",
    }
})
const BurgerIcon = styled("img", {
    width: '2rem',
    [breakpoints.TABLET]: {
        width: "4rem",
    }
});

const AppNavigation = () => {
    const stageId = useCurrentStageId();
    const [open, setOpen] = useState<boolean>(false);
    const menuRef = useRef<HTMLDivElement>();

    useEffect(() => {
        if (menuRef && open) {
            disableBodyScroll(menuRef);
            return () => {
                enableBodyScroll(menuRef);
            }
        }
    }, [open, menuRef])

    return (
        <>
            {open ? (
                <Overlay ref={menuRef} onClick={() => setOpen(false)}>
                    <List>
                        {stageId ? (
                            <>
                                <ListItem>
                                    <Link href="/stage">
                                        <A>
                                            Stage
                                        </A>
                                    </Link>
                                </ListItem>
                                <ListItem>
                                    <Link href="/mixer">
                                        <A>
                                            Mixer
                                        </A>
                                    </Link>
                                </ListItem>
                                <ListItem>
                                    <Link href="/room">
                                        <A>
                                            3D Audio
                                        </A>
                                    </Link>
                                </ListItem>
                            </>
                        ) : null}
                        <ListItem>
                            <Link href="/stages">
                                <A>
                                    All stages
                                </A>
                            </Link>
                        </ListItem>
                        <ListItem>
                            <Link href="/devices">
                                <A>
                                    Settings
                                </A>
                            </Link>
                        </ListItem>
                    </List>
                </Overlay>
            ) : null}
            <BurgerButton
                onClick={() => setOpen(prev => !prev)}
            >
                <BurgerIcon
                    alt="Toggle navigation"
                    src="/static/more_horiz-18dp.svg"
                />
            </BurgerButton>
        </>
    );
}
export default AppNavigation;
