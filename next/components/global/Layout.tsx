import React from "react";
import {styled} from "styletron-react";
import {useSelector} from "use-digital-stage";
import {breakpoints} from "../ui/Theme";
import Container from "../ui/Container";
import StageOrMixerToggle from "./fixed/StageOrMixerToggle";
import ShowRoomButton from "./fixed/ShowRoomButton";
import LocalDeviceControl from "./fixed/LocalDeviceControl";
import ProfileMenuButton from "./ProfileMenuButton";
import SideBar from "./SideBar";

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

const GradientWrapper = styled("div", {})

const Layout = (props: {
    children: React.ReactNode
}) => {
    const {children} = props;
    const insideStage = useSelector<boolean>(state => state.global.stageId !== undefined);

    if (insideStage) {
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

    return (
        <GradientWrapper>
            <Container>
                {children}
            </Container>
        </GradientWrapper>
    )
}
export default Layout;
