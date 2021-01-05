import StageOrMixerToggle from "../global/fixed/StageOrMixerToggle";
import ShowRoomButton from "../global/fixed/ShowRoomButton";
import LocalDeviceControl from "../global/fixed/LocalDeviceControl";
import ProfileMenuButton from "../global/ProfileMenuButton";
import React from "react";
import {styled} from "styletron-react";
import {breakpoints} from "../ui/Theme";
import SideBar from "../global/SideBar";


const Wrapper = styled("div", {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    maxHeight: '100vh',
    [breakpoints.TABLET]: {
        display: 'flex',
        flexDirection: 'row'
    }
});
const Content = styled("div", {
    position: 'relative',
    display: 'block',
    minHeight: '100%',
    height: '100%',
    flexGrow: 1,
    overflow: 'auto',
    background: "transparent linear-gradient(218deg, rgba(52, 52, 52, 1) 0%, rgba(20, 20, 20, 1) 100%) 0% 0% no-repeat padding-box",
});
const StyledSideBar = styled(SideBar, {
    position: 'relative',
    display: 'none',
    flexGrow: 0,
    [breakpoints.TABLET]: {
        display: 'flex'
    }
});

const StageLayout = (props: {
    children: React.ReactNode
}) => {
    const {children} = props;
    return (
        <Wrapper>
            <StyledSideBar/>
            <Content>
                {children}
            </Content>
            <StageOrMixerToggle/>
            <ShowRoomButton/>
            <LocalDeviceControl/>
            <ProfileMenuButton/>
        </Wrapper>
    )
}

export default StageLayout;
