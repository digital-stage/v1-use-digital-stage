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
    padding: '4rem',
});
const ListItem = styled("li", {
    display: 'flex',
    fontSize: '3rem',
});
const BurgerButton = withStyleDeep(Button, {
    position: 'fixed',
    top: '1rem',
    left: '1rem',
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
                                        Stage
                                    </Link>
                                </ListItem>
                                <ListItem>
                                    <Link href="/mixer">
                                        Mixer
                                    </Link>
                                </ListItem>
                                <ListItem>
                                    <Link href="/room">
                                        3D Audio
                                    </Link>
                                </ListItem>
                            </>
                        ) : null}
                        <ListItem>
                            <Link href="/stages">
                                All stages
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
                    src="/static/menu-white-18dp.svg"
                />
            </BurgerButton>
        </>
    );
}
export default AppNavigation;
