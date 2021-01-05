import {styled} from "styletron-react";
import React from "react";
import Logo from "./Logo";

const Wrapper = styled("div", {
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    paddingTop: '12px',
    paddingBottomt: '12px',
    paddingLeft: '8px',
    paddingRight: '8px',
    background: 'transparent linear-gradient(221deg,#F20544 0%,#F00544 2%,#F20544 2%,#F20544 10%,#721542 50%,#012340 100%) 0% 0% no-repeat padding-box;',
})
const StyledLogo = styled(Logo, {
    width: '180px',
    marginBottom: '24px',
});

const AuthLayout = (props: {
    children: React.ReactNode
}) => {
    const {children} = props;

    return (
        <Wrapper>
            <StyledLogo/>
            {children}
        </Wrapper>
    )
};

export default AuthLayout;
