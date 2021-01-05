import {styled, useStyletron, withStyleDeep} from "styletron-react";
import {FaUserAlt} from 'react-icons/fa';
import React, {useState} from "react";
import RoundButton from "../../ui/RoundButton";
import {colors} from "../../ui/Theme";
import {useCurrentUser} from "use-digital-stage";
import useAuth from "../../../lib/useAuth";
import Headline from "../../theme/Headline";
import Paragraph from "../../theme/Paragraph";

const FixedButton = withStyleDeep(RoundButton, {
    position: 'fixed',
    top: '1rem',
    right: '1rem',
});
const Overlay = styled("div", {
    position: 'fixed',
    width: '100vw',
    height: '100vh',
    top: 0,
    left: 0,
})
const MenuWrapper = styled("div", {
    position: 'fixed',
    top: '58px',
    right: '20px',
    padding: '2rem',
    borderRadius: '1.125rem',
    backgroundColor: colors.background.light,
    boxShadow: colors.modal.boxShadow
});

const Menu = () => {
    const {user: authUser} = useAuth();
    const user = useCurrentUser();

    const [css] = useStyletron();

    return (
        <>
            <Headline variant="caption">
                {user.name}
            </Headline>
            <Paragraph>
                {authUser.email}
            </Paragraph>
            <hr/>
        </>
    )
}

const ProfileMenuButton = () => {
    const [open, setOpen] = useState<boolean>(false)

    return (
        <>
            <FixedButton onClick={() => setOpen(prev => !prev)}>
                <FaUserAlt size="1rem"/>
            </FixedButton>
            {open && (
                <Overlay
                    onClick={() => setOpen(false)}
                >
                    <MenuWrapper onClick={(e) => {
                        e.stopPropagation();
                    }}>
                        <Menu/>
                    </MenuWrapper>
                </Overlay>
            )}
        </>
    )
};
export default ProfileMenuButton;
