import {styled, withStyleDeep} from "styletron-react";
import {FaUserAlt} from 'react-icons/fa';
import React, {useState} from "react";
import RoundButton from "../../ui/RoundButton";
import {colors} from "../../ui/Theme";

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
const Menu = styled("div", {
    position: 'fixed',
    top: '58px',
    right: '20px',
    padding: '2rem',
    borderRadius: '1.125rem',
    backgroundColor: colors.background.light
});

const ProfileMenuButton = () => {
    const [open, setOpen] = useState<boolean>(false)

    return (
        <>
            <FixedButton onClick={() => setOpen(prev => !prev)}>
                <FaUserAlt size={24}/>
            </FixedButton>
            {open && (
                <Overlay
                    onClick={() => setOpen(false)}
                >
                    <Menu onClick={(e) => {
                        e.stopPropagation();
                    }}>
                        MENU
                    </Menu>
                </Overlay>
            )}
        </>
    )
};
export default ProfileMenuButton;
