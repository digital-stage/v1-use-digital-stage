import {styled} from "styletron-react";
import Link from "next/link";
import React from "react";
import {useIntl} from "react-intl";
import {FaBug, FaCog, FaUserAlt, FaVideo, FaVolumeUp} from 'react-icons/fa';
import {BiCube} from 'react-icons/bi';
import {GoSettings} from 'react-icons/go';
import {useRouter} from "next/router";
import colors from "../../theme/theme/colors";

const Wrapper = styled("div", {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '72px',
    backgroundColor: colors.background.level3
});
const UpperItemsWrapper = styled("div", {});
const CenteredItemsWrapper = styled("div", {});
const LowerItemsWrapper = styled("div", {});
const SideBarItem = styled("a", (props: { $active: boolean }) => ({
    display: 'flex',
    flexDirection: 'column',
    width: '72px',
    height: '72px',
    color: colors.text.regular.default,
    backgroundColor: props.$active ? colors.background.level4 : undefined,
    alignItems: 'center',
    justifyContent: 'center',
    ":active": {
        color: colors.text.regular.default,
        backgroundColor: colors.background.level3
    },
    ":hover": {
        color: colors.primary.link,
    }
}));


const SideBar = (props: {
    className?: string
}) => {
    const {className} = props;
    const {pathname} = useRouter();
    const {formatMessage} = useIntl();
    const f = id => formatMessage({id});

    return (
        <Wrapper className={className}>
            <UpperItemsWrapper>
                <img src="/static/logo.svg" alt={f("projectName")}/>
            </UpperItemsWrapper>
            <CenteredItemsWrapper>
                <Link href="/stage">
                    <a>
                        <SideBarItem $active={pathname === "/stage"}>
                            {f("stage")}
                        </SideBarItem>
                    </a>
                </Link>
                <Link href="/mixer">
                    <a>
                        <SideBarItem $active={pathname === "/mixer"}>
                            <GoSettings size={18}/>
                            {f("mixer")}
                        </SideBarItem>
                    </a>
                </Link>
                <Link href="/room">
                    <a>
                        <SideBarItem $active={pathname === "/room"}>
                            <BiCube size={18}/>
                            {f("room")}
                        </SideBarItem>
                    </a>
                </Link>
                <Link href="/devices">
                    <a>
                        <SideBarItem $active={pathname === "/devices"}>
                            <GoSettings size={18}/>
                            {f("devices")}
                        </SideBarItem>
                    </a>
                </Link>
            </CenteredItemsWrapper>
            <LowerItemsWrapper>
                <Link href="https://forum.digital-stage.org/c/deutsch/ds-web/30">
                    <a target="_blank">
                        <SideBarItem $active={pathname === "/devices"}>
                            <FaBug size={18}/>
                            {f("feedback")}
                        </SideBarItem>
                    </a>
                </Link>
            </LowerItemsWrapper>
        </Wrapper>
    )
}
export default SideBar;
