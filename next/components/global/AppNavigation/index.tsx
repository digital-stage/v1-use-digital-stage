import {styled, withStyleDeep} from "styletron-react";
import React, {useEffect, useRef, useState} from "react";
import {breakpoints, colors} from "../../ui/Theme";
import {disableBodyScroll, enableBodyScroll} from 'body-scroll-lock';
import Button from "../../ui/Button";
import {useCurrentStageId} from "use-digital-stage";
import StyledLink from "../../ui/StyledLink";

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
const A = styled(StyledLink, {
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
        display: 'none'
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
                                    <A href="/stage">
                                        Stage
                                    </A>
                                </ListItem>
                                <ListItem>
                                    <A href="/mixer">
                                        Mixer
                                    </A>
                                </ListItem>
                                <ListItem>
                                    <A href="/room">
                                        3D Audio
                                    </A>
                                </ListItem>
                            </>
                        ) : null}
                        <ListItem>
                            <A href="/stages">
                                All stages
                            </A>
                        </ListItem>
                        <ListItem>
                            <A href="/devices">
                                Settings
                            </A>
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
